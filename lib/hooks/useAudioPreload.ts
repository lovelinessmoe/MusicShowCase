import { useEffect, useState } from 'react';

/**
 * 音频预加载状态
 */
export interface AudioPreloadState {
  /** 是否已预加载 */
  isPreloaded: boolean;
  /** 预加载进度 (0-100) */
  progress: number;
  /** 预加载错误 */
  error: string | null;
}

/**
 * 音频预加载 Hook
 * 在后台预加载音频文件以提升播放体验
 * 
 * @param audioUrl - 音频文件 URL
 * @param enabled - 是否启用预加载（默认 true）
 * @returns 预加载状态
 */
export function useAudioPreload(
  audioUrl: string,
  enabled: boolean = true
): AudioPreloadState {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !audioUrl) {
      return;
    }

    // 创建临时 audio 元素用于预加载
    const audio = new Audio();
    audio.preload = 'auto';

    // 监听加载进度
    const handleProgress = () => {
      if (audio.buffered.length > 0) {
        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        const duration = audio.duration;
        if (duration > 0) {
          const loadedPercent = (bufferedEnd / duration) * 100;
          setProgress(Math.min(100, Math.round(loadedPercent)));
        }
      }
    };

    // 监听元数据加载完成
    const handleLoadedMetadata = () => {
      setProgress(25); // 元数据加载完成算 25%
    };

    // 监听可以播放（部分数据已加载）
    const handleCanPlay = () => {
      setProgress(50); // 可以播放算 50%
    };

    // 监听完全加载
    const handleCanPlayThrough = () => {
      setProgress(100);
      setIsPreloaded(true);
    };

    // 监听错误
    const handleError = () => {
      setError('音频预加载失败');
      setProgress(0);
    };

    // 添加事件监听器
    audio.addEventListener('progress', handleProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);

    // 开始加载
    audio.src = audioUrl;
    audio.load();

    // 清理函数
    return () => {
      audio.removeEventListener('progress', handleProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('error', handleError);
      audio.src = '';
    };
  }, [audioUrl, enabled]);

  return { isPreloaded, progress, error };
}
