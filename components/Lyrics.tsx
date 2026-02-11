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
    <div 
      ref={lyricsContainerRef}
      className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent px-4"
    >
      <div className="py-24">
        {lyrics.map((line, index) => (
          <div
            key={index}
            ref={index === currentIndex ? currentLineRef : null}
            className={`text-center py-2 transition-all duration-300 ${
              index === currentIndex
                ? 'text-white text-lg font-medium scale-105'
                : 'text-white/40 text-base'
            }`}
          >
            <div>{line.text}</div>
            {line.translation && (
              <div className="text-sm mt-1">{line.translation}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
