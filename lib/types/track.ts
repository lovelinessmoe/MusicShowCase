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
}
