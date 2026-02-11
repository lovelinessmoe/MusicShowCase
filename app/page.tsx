import { MusicPlayer } from '@/components/MusicPlayer';
import { getTrackByDomain } from '@/lib/data/tracks';
import { headers } from 'next/headers';
import type { Metadata } from 'next';

// 动态生成元数据
export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const host = headersList.get('host') || '';
  const track = getTrackByDomain(host);

  return {
    title: `Music Showcase - ${track.title} by ${track.artist}`,
    description: `Listen to ${track.title} by ${track.artist} - A beautiful music showcase website built with Next.js`,
    keywords: ['music', 'showcase', track.title.toLowerCase(), track.artist.toLowerCase(), 'audio player'],
    authors: [{ name: 'Music Showcase' }],
    openGraph: {
      title: `Music Showcase - ${track.title} by ${track.artist}`,
      description: `Listen to ${track.title} by ${track.artist}`,
      type: 'music.song',
      images: [
        {
          url: track.coverUrl,
          width: 1200,
          height: 1200,
          alt: `${track.title} by ${track.artist} Album Cover`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Music Showcase - ${track.title} by ${track.artist}`,
      description: `Listen to ${track.title} by ${track.artist}`,
      images: [track.coverUrl],
    },
  };
}

export default function Home({ searchParams }: { searchParams: { track?: string } }) {
  const headersList = headers();
  const host = headersList.get('host') || '';
  
  // 如果有 track 参数，使用指定的歌曲，否则根据域名判断
  let track;
  if (searchParams.track) {
    const { getTrackById, getAllTracks } = require('@/lib/data/tracks');
    track = getTrackById(searchParams.track) || getAllTracks()[0];
  } else {
    track = getTrackByDomain(host);
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
