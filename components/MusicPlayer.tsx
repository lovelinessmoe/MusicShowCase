'use client';

import { Track } from '@/lib/types/track';
import { useAudioPlayer } from '@/lib/hooks/useAudioPlayer';
import { AlbumCover } from './AlbumCover';
import { TrackInfo } from './TrackInfo';
import { ProgressBar } from './ProgressBar';
import { AudioControls } from './AudioControls';
import { Lyrics } from './Lyrics';

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

  const hasLyrics = !!track.lrcLyrics;

  return (
    <div className={`w-full mx-auto ${hasLyrics ? 'max-w-7xl' : 'max-w-2xl'}`}>
      <div className={`flex ${hasLyrics ? 'flex-col lg:flex-row' : 'justify-center'} gap-6 items-start`}>
        {/* 播放器主体 */}
        <div className={`${hasLyrics ? 'w-full lg:w-auto lg:flex-shrink-0' : 'w-full max-w-2xl'} mx-auto lg:mx-0`}>
          <div className="w-full p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl max-w-[280px] sm:max-w-[400px] lg:max-w-[500px] border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 mx-auto">
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
        </div>

        {/* 歌词显示区域 - 在右侧 */}
        {hasLyrics && (
          <div className="w-full lg:flex-1 min-h-[500px] lg:min-h-[600px] p-6 bg-gradient-to-br from-white/5 via-blue-500/5 to-purple-500/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-50" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            {/* 歌词内容 */}
            <div className="relative z-10 h-full">
              <Lyrics lrcLyrics={track.lrcLyrics} currentTime={currentTime} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
