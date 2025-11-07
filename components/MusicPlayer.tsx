'use client';

import { Track } from '@/lib/types/track';
import { useAudioPlayer } from '@/lib/hooks/useAudioPlayer';
import { AlbumCover } from './AlbumCover';
import { TrackInfo } from './TrackInfo';
import { ProgressBar } from './ProgressBar';
import { AudioControls } from './AudioControls';

interface MusicPlayerProps {
  track: Track;
}

/**
 * MusicPlayer 主容器组件
 * 协调所有子组件并管理音频播放状态
 * 
 * 性能优化说明：
 * 1. 音频预加载：使用 preload="metadata" 预加载音频元数据，减少初始带宽使用
 * 2. 图片优化：AlbumCover 使用 Next.js Image 组件的 priority 和 loading="eager"
 * 3. 资源提示：页面级别添加 preload 链接以提前加载关键资源
 * 4. 跨域支持：audio 元素添加 crossOrigin 属性以支持 CORS
 * 
 * @param track - 要播放的音乐曲目数据
 */
export function MusicPlayer({ track }: MusicPlayerProps) {
  // 集成 useAudioPlayer Hook
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    error,
    isLoading,
    togglePlayPause,
    seek,
    setVolume,
    audioRef,
  } = useAudioPlayer(track.audioUrl);

  return (
    <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl max-w-[280px] sm:max-w-[400px] lg:max-w-[500px] border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
      {/* 专辑封面 */}
      <AlbumCover
        src={track.coverUrl}
        alt={`${track.title} by ${track.artist}`}
        isPlaying={isPlaying}
      />

      {/* 歌曲信息 */}
      <TrackInfo title={track.title} artist={track.artist} />

      {/* 播放进度条 */}
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={seek}
      />

      {/* 音频控制按钮 */}
      <AudioControls
        isPlaying={isPlaying}
        volume={volume}
        onPlayPause={togglePlayPause}
        onVolumeChange={setVolume}
      />

      {/* 加载指示器 */}
      {isLoading && !error && (
        <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-200 text-sm text-center flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>加载中...</span>
        </div>
      )}

      {/* 错误提示 */}
      {error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
          {error}
        </div>
      )}

      {/* 隐藏的 audio 元素 - 使用 metadata 预加载以提升性能和减少带宽 */}
      <audio 
        ref={audioRef} 
        src={track.audioUrl} 
        preload="metadata"
        crossOrigin="anonymous"
      />
    </div>
  );
}
