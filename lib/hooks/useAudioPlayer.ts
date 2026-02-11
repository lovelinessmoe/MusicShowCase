import { useRef, useState, useEffect, RefObject } from 'react';

/**
 * useAudioPlayer Hook 返回值接口
 */
export interface UseAudioPlayerReturn {
  /** 是否正在播放 */
  isPlaying: boolean;
  /** 当前播放时间（秒） */
  currentTime: number;
  /** 音频总时长（秒） */
  duration: number;
  /** 音量（0-1） */
  volume: number;
  /** 错误信息 */
  error: string | null;
  /** 是否正在加载/缓冲 */
  isLoading: boolean;
  /** 播放音频 */
  play: () => void;
  /** 暂停音频 */
  pause: () => void;
  /** 切换播放/暂停状态 */
  togglePlayPause: () => void;
  /** 跳转到指定时间 */
  seek: (time: number) => void;
  /** 设置音量 */
  setVolume: (volume: number) => void;
  /** Audio 元素引用 */
  audioRef: RefObject<HTMLAudioElement>;
}

/**
 * 自定义音频播放器 Hook
 * 封装所有音频播放逻辑，包括状态管理和事件处理
 * 
 * @param audioUrl - 音频文件 URL
 * @returns 音频播放器状态和控制方法
 */
export function useAudioPlayer(audioUrl: string): UseAudioPlayerReturn {
  // HTMLAudioElement 引用管理
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // 播放/暂停状态管理
  const [isPlaying, setIsPlaying] = useState(false);
  
  // 当前时间和总时长状态
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // 音量控制状态
  const [volume, setVolumeState] = useState(1);
  
  // 错误状态管理
  const [error, setError] = useState<string | null>(null);
  
  // 加载状态管理
  const [isLoading, setIsLoading] = useState(true);

  // 添加音频事件监听器（子任务 3.2）
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 设置加载超时（10秒）
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        setError('加载超时，请检查网络连接或刷新页面');
        setIsLoading(false);
      }
    }, 10000);

    // 监听 timeupdate 事件更新播放进度
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    // 监听 loadedmetadata 事件获取音频时长
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setError(null); // 清除之前的错误
      setIsLoading(false); // 元数据加载完成
      clearTimeout(loadingTimeout);
    };

    // 监听 ended 事件处理播放结束
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    // 监听 error 事件处理加载错误
    const handleError = () => {
      console.error('音频加载失败');
      setError('无法加载音频文件，请检查网络连接');
      setIsPlaying(false);
      setIsLoading(false);
      clearTimeout(loadingTimeout);
    };

    // 监听 waiting 事件处理缓冲
    const handleWaiting = () => {
      // 只在播放时显示缓冲状态
      if (isPlaying) {
        setIsLoading(true);
      }
    };

    // 监听 canplay 事件表示可以播放
    const handleCanPlay = () => {
      setIsLoading(false);
      clearTimeout(loadingTimeout);
    };

    // 监听 canplaythrough 事件表示完全加载（性能优化）
    const handleCanPlayThrough = () => {
      setIsLoading(false);
      clearTimeout(loadingTimeout);
    };

    // 监听 playing 事件
    const handlePlaying = () => {
      setIsLoading(false);
    };

    // 添加事件监听器
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('playing', handlePlaying);

    // 清理函数：移除事件监听器
    return () => {
      clearTimeout(loadingTimeout);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('playing', handlePlaying);
    };
  }, [isPlaying]);

  // 实现播放控制方法（子任务 3.3）
  
  /**
   * 播放音频
   */
  const play = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setError(null);
        })
        .catch((err) => {
          console.error('播放失败:', err);
          setError('播放失败，请重试');
          setIsPlaying(false);
        });
    }
  };

  /**
   * 暂停音频
   */
  const pause = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  /**
   * 切换播放/暂停状态
   */
  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  /**
   * 跳转到指定时间
   * @param time - 目标时间（秒）
   */
  const seek = (time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, Math.min(time, duration));
      setCurrentTime(audio.currentTime);
    }
  };

  /**
   * 设置音量
   * @param newVolume - 音量值（0-1）
   */
  const setVolume = (newVolume: number) => {
    const audio = audioRef.current;
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    
    if (audio) {
      audio.volume = clampedVolume;
    }
    setVolumeState(clampedVolume);
  };

  // 初始化音量
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    error,
    isLoading,
    play,
    pause,
    togglePlayPause,
    seek,
    setVolume,
    audioRef,
  };
}
