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
    domain: 'default', // 默认域名显示的歌曲
  },
  {
    id: 'superficial-love',
    title: 'Superficial Love',
    artist: 'Karim Mika、Gabs',
    audioUrl: 'https://oss.ashes.vip/Karim%20Mika%E3%80%81Gabs%20-%20Superficial%20Love.mp3',
    coverUrl: 'https://oss.ashes.vip/Superficial%20Love.jpg',
    domain: 'superficial.love',
  },
];

/**
 * 根据域名获取对应的曲目
 * @param hostname - 当前域名
 * @returns 匹配的曲目，如果没有匹配则返回默认曲目
 */
export function getTrackByDomain(hostname: string): Track {
  // 查找匹配域名的曲目
  const domainTrack = tracks.find(track => track.domain === hostname);
  
  if (domainTrack) {
    return domainTrack;
  }
  
  // 如果没有匹配的域名，返回默认曲目
  const defaultTrack = tracks.find(track => track.domain === 'default');
  return defaultTrack || tracks[0];
}

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
