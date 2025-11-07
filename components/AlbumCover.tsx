import Image from 'next/image';
import { useState } from 'react';

interface AlbumCoverProps {
  src: string;
  alt: string;
  isPlaying: boolean;
}

export function AlbumCover({ src, alt, isPlaying }: AlbumCoverProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative w-full aspect-square overflow-hidden rounded-lg shadow-2xl transition-all duration-500 ${
      isPlaying ? 'animate-pulse-glow' : ''
    }`}>
      <Image
        src={imageError ? '/placeholder-album.svg' : src}
        alt={alt}
        fill
        className={`object-cover transition-all duration-700 ${
          isPlaying ? 'scale-105 brightness-110' : 'scale-100 brightness-100'
        }`}
        priority
        loading="eager"
        quality={85}
        sizes="(max-width: 640px) 280px, (max-width: 1024px) 400px, 500px"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzFhMWExYSIvPjwvc3ZnPg=="
        onError={() => setImageError(true)}
      />
      {isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none animate-pulse" />
      )}
      <div className="absolute inset-0 ring-1 ring-white/10 rounded-lg pointer-events-none" />
    </div>
  );
}
