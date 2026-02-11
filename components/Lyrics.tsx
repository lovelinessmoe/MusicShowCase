'use client';

import { useEffect, useRef, useState } from 'react';
import { LyricLine } from '@/lib/types/track';
import { parseLRC, getCurrentLyricIndex } from '@/lib/utils/lrc-parser';

interface LyricsProps {
  lrcLyrics?: string;
  currentTime: number;
}

export function Lyrics({ lrcLyrics, currentTime }: LyricsProps) {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lrcLyrics) {
      const parsed = parseLRC(lrcLyrics);
      setLyrics(parsed);
    }
  }, [lrcLyrics]);

  useEffect(() => {
    if (lyrics.length > 0) {
      const index = getCurrentLyricIndex(lyrics, currentTime);
      setCurrentIndex(index);
    }
  }, [currentTime, lyrics]);

  useEffect(() => {
    if (currentLineRef.current && lyricsContainerRef.current) {
      const container = lyricsContainerRef.current;
      const currentLine = currentLineRef.current;
      const containerHeight = container.clientHeight;
      const lineTop = currentLine.offsetTop;
      const lineHeight = currentLine.clientHeight;
      
      container.scrollTo({
        top: lineTop - containerHeight / 2 + lineHeight / 2,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  if (!lrcLyrics || lyrics.length === 0) {
    return null;
  }

  return (
    <div className="relative h-full">
      {/* 顶部渐变遮罩 */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none z-10" />
      
      {/* 中心高亮区域 */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-32 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none z-10 rounded-lg" />
      
      {/* 歌词滚动容器 */}
      <div 
        ref={lyricsContainerRef}
        className="h-full overflow-y-auto px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="py-40">
          {lyrics.map((line, index) => {
            const isCurrent = index === currentIndex;
            const isPast = index < currentIndex;
            const distance = Math.abs(index - currentIndex);
            
            // 计算透明度和缩放
            let opacity = 0.25;
            let scale = 0.9;
            let blur = 'blur(0.5px)';
            
            if (isCurrent) {
              opacity = 1;
              scale = 1.05;
              blur = 'blur(0px)';
            } else if (distance === 1) {
              opacity = 0.6;
              scale = 0.95;
              blur = 'blur(0px)';
            } else if (distance === 2) {
              opacity = 0.4;
              scale = 0.92;
              blur = 'blur(0px)';
            }

            return (
              <div
                key={index}
                ref={isCurrent ? currentLineRef : null}
                className={`text-center py-4 transition-all duration-700 ease-out ${
                  isPast ? 'text-blue-200/30' : 'text-white'
                }`}
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                  filter: blur,
                }}
              >
                {/* 英文歌词 */}
                <div 
                  className={`leading-relaxed font-medium tracking-wide ${
                    isCurrent 
                      ? 'text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-pulse-subtle' 
                      : 'text-base lg:text-lg'
                  }`}
                >
                  {line.text}
                </div>
                
                {/* 中文翻译 */}
                {line.translation && (
                  <div 
                    className={`mt-2 leading-relaxed ${
                      isCurrent 
                        ? 'text-base lg:text-lg text-blue-100/90' 
                        : 'text-sm lg:text-base text-white/70'
                    }`}
                  >
                    {line.translation}
                  </div>
                )}
                
                {/* 当前行装饰 */}
                {isCurrent && (
                  <>
                    <div className="absolute left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mt-4 animate-pulse" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
    </div>
  );
}
