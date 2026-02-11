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
    <div className={`w-full mx-auto ${hasLyrics ? 'max-w-[1600px]' : 'max-w-2xl'}`}>
      {hasLyrics ? (
        // 有歌词时：左右布局在同一个容器内
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          <div className="w-full lg:w-[500px] flex-shrink-0 p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
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

            {/* 隐藏的 audio 元素 */}
            <audio 
              ref={audioRef} 
              src={track.audioUrl} 
              preload="metadata"
              crossOrigin="anonymous"
            />
          </div>

          {/* 歌词显示区域 - 完全透明 */}
          <div className="w-full lg:flex-1 lg:min-w-[700px] h-[650px] relative">
            {/* 只保留背景光效装饰 */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 animate-pulse-slow pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 animate-pulse-slow pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* 中心聚光效果 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-40 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none blur-sm" />
            
            {/* 歌词内容 */}
            <div className="relative z-10 h-full p-8">
              <Lyrics lrcLyrics={track.lrcLyrics} currentTime={currentTime} />
            </div>
          </div>
        </div>
      ) : (
        // 无歌词时：只显示播放器
        <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
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

          {/* 隐藏的 audio 元素 */}
          <audio 
            ref={audioRef} 
            src={track.audioUrl} 
            preload="metadata"
            crossOrigin="anonymous"
          />
        </div>
      )}
    </div>
  );
}
