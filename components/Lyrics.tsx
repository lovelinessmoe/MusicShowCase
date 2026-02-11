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
  const currentLineRefs = useRef<Map<number, HTMLDivElement>>(new Map());

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
    const container = lyricsContainerRef.current;
    const currentLine = currentLineRefs.current.get(currentIndex);
    
    if (container && currentLine && currentIndex >= 0) {
      // 使用 requestAnimationFrame 确保在下一帧执行
      const rafId = requestAnimationFrame(() => {
        try {
          // 获取容器和当前行的尺寸信息
          const containerHeight = container.clientHeight;
          const lineOffsetTop = currentLine.offsetTop;
          const lineHeight = currentLine.clientHeight;
          
          // 计算目标滚动位置（让当前行居中）
          const targetScroll = lineOffsetTop - (containerHeight / 2) + (lineHeight / 2);
          
          // 执行滚动
          container.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
          });
        } catch (error) {
          console.error('Scroll error:', error);
        }
      });
      
      return () => cancelAnimationFrame(rafId);
    }
  }, [currentIndex]);

  const setLineRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      currentLineRefs.current.set(index, el);
    } else {
      currentLineRefs.current.delete(index);
    }
  };

  if (!lrcLyrics || lyrics.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      {/* 歌词滚动容器 */}
      <div 
        ref={lyricsContainerRef}
        className="w-full h-full overflow-y-auto px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
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
                ref={setLineRef(index)}
                className={`text-center py-4 transition-all duration-500 ease-out ${
                  isPast ? 'text-blue-200/30' : 'text-white'
                }`}
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                  filter: blur,
                  willChange: isCurrent ? 'transform, opacity' : 'auto',
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
    </div>
  );
}
