/**
 * 歌词行接口
 */
export interface LyricLine {
  /** 时间戳（秒） */
  time: number;
  /** 歌词文本 */
  text: string;
  /** 翻译文本（可选） */
  translation?: string;
}

/**
 * Track 接口定义音乐曲目的数据结构
 */
export interface Track {
  /** 曲目唯一标识符 */
  id: string;
  /** 歌曲标题 */
  title: string;
  /** 艺术家名称 */
  artist: string;
  /** 音频文件 URL */
  audioUrl: string;
  /** 专辑封面图片 URL */
  coverUrl: string;
  /** 音频时长（秒），可选 */
  duration?: number;
  /** 关联的域名，用于域名特定展示 */
  domain?: string;
  /** LRC 格式歌词（可选） */
  lrcLyrics?: string;
}
