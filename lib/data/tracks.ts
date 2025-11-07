import { Track } from '@/lib/types/track';

/**
 * 音乐曲目数据配置
 */
export const tracks: Track[] = [
  {
    id: 'nightcall-reverie',
    title: 'Reverie',
    artist: 'Nightcall',
    audioUrl: 'https://oss.ashes.vip/Nightcall%20-%20Reverie.mp3',
    coverUrl: 'https://oss.ashes.vip/Nightcall%20-%20Reverie.jpg',
  },
];

/**
 * 根据 ID 获取指定曲目
 * @param id - 曲目 ID
 * @returns 匹配的曲目或 undefined
 */
export function getTrackById(id: string): Track | undefined {
  return tracks.find(track => track.id === id);
}

/**
 * 获取所有曲目
 * @returns 所有曲目的数组
 */
export function getAllTracks(): Track[] {
  return tracks;
}
