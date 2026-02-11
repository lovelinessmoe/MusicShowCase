import { LyricLine } from '@/lib/types/track';

/**
 * 解析 LRC 格式歌词
 * @param lrc - LRC 格式的歌词字符串
 * @returns 解析后的歌词行数组
 */
export function parseLRC(lrc: string): LyricLine[] {
  const lines = lrc.split('\n');
  const lyrics: LyricLine[] = [];
  const translationMap = new Map<number, string>();

  // 第一遍：收集翻译
  lines.forEach(line => {
    const translationMatch = line.match(/\[(\d{2}):(\d{2}\.\d{3})\]\[tr:zh-Hans\](.*)/);
    if (translationMatch) {
      const minutes = parseInt(translationMatch[1]);
      const seconds = parseFloat(translationMatch[2]);
      const time = minutes * 60 + seconds;
      translationMap.set(time, translationMatch[3]);
    }
  });

  // 第二遍：解析歌词
  lines.forEach(line => {
    // 跳过元数据和翻译行
    if (line.startsWith('[offset:') || 
        line.startsWith('[ar:') || 
        line.startsWith('[ti:') || 
        line.startsWith('[al:') || 
        line.startsWith('[length:') ||
        line.includes('[tr:zh-Hans]')) {
      return;
    }

    const match = line.match(/\[(\d{2}):(\d{2}\.\d{3})\](.*)/);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseFloat(match[2]);
      const time = minutes * 60 + seconds;
      const text = match[3].trim();

      if (text) {
        lyrics.push({
          time,
          text,
          translation: translationMap.get(time),
        });
      }
    }
  });

  return lyrics.sort((a, b) => a.time - b.time);
}

/**
 * 根据当前播放时间获取当前歌词索引
 * @param lyrics - 歌词数组
 * @param currentTime - 当前播放时间（秒）
 * @returns 当前歌词的索引
 */
export function getCurrentLyricIndex(lyrics: LyricLine[], currentTime: number): number {
  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (currentTime >= lyrics[i].time) {
      return i;
    }
  }
  return -1;
}
