import { MusicPlayer } from '@/components/MusicPlayer';
import { getAllTracks } from '@/lib/data/tracks';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Music Showcase - Nightcall by Reverie',
  description: 'Listen to Nightcall by Reverie - A beautiful music showcase website built with Next.js',
  keywords: ['music', 'showcase', 'nightcall', 'reverie', 'audio player'],
  authors: [{ name: 'Music Showcase' }],
  openGraph: {
    title: 'Music Showcase - Nightcall by Reverie',
    description: 'Listen to Nightcall by Reverie',
    type: 'music.song',
    images: [
      {
        url: 'https://oss.ashes.vip/Nightcall%20-%20Reverie.jpg',
        width: 1200,
        height: 1200,
        alt: 'Nightcall by Reverie Album Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music Showcase - Nightcall by Reverie',
    description: 'Listen to Nightcall by Reverie',
    images: ['https://oss.ashes.vip/Nightcall%20-%20Reverie.jpg'],
  },
};

export default function Home() {
  const tracks = getAllTracks();
  const track = tracks[0]; // Get the Nightcall - Reverie track

  if (!track) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Music Showcase</h1>
          <p className="text-text-secondary">No tracks available</p>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* 预加载关键资源以提升性能 */}
      <link
        rel="preload"
        href={track.coverUrl}
        as="image"
        type="image/jpeg"
        // @ts-ignore - Next.js supports imageSrcSet
        imageSrcSet={`${track.coverUrl} 1x`}
      />
      <link
        rel="preload"
        href={track.audioUrl}
        as="audio"
        type="audio/mpeg"
      />
      
      <main className="flex min-h-screen items-center justify-center p-4 animate-fade-in">
        <div className="w-full max-w-2xl">
          <MusicPlayer track={track} />
        </div>
      </main>
    </>
  );
}
