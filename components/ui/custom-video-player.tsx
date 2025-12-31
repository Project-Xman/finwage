"use client";

import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";
import Image from "next/image";

interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;
  autoPlay?: boolean;
}

const CustomVideoPlayer = forwardRef<
  { play: () => void; pause: () => void; reset: () => void },
  CustomVideoPlayerProps
>(
  (
    {
      src,
      poster = "/assets/video-thumbnail.webp",
      alt = "Video thumbnail",
      className = "",
      autoPlay = false,
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Handle external autoPlay prop changes
    useEffect(() => {
      if (autoPlay && videoRef.current) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((error) => {
              console.log("Autoplay prevented:", error);
              setIsPlaying(false);
            });
        }
      } else if (!autoPlay && videoRef.current) {
         videoRef.current.pause();
         setIsPlaying(false);
      }
    }, [autoPlay]);

    const handlePlay = () => {
      if (videoRef.current) {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(console.error);
      }
    };

    const handlePause = () => {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleReset = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    };

    useImperativeHandle(ref, () => ({
      play: handlePlay,
      pause: handlePause,
      reset: handleReset,
    }));

    const handleTogglePlay = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (isPlaying) {
        handlePause();
      } else {
        handlePlay();
      }
    };

    const handleMute = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    const handleTimeUpdate = () => {
      if (videoRef.current && videoRef.current.duration > 0) {
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;
        setProgress((current / total) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (videoRef.current) {
        const time = (value / 100) * videoRef.current.duration;
        videoRef.current.currentTime = time;
        setProgress(value);
      }
    };

    const handleFullscreen = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!document.fullscreenElement) {
        // Find the closest wrapper div to fullscreen
        videoRef.current?.closest('.group\\/video')?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    };

    const formatTime = (timeInSeconds: number) => {
      if (isNaN(timeInSeconds)) return "0:00";
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const currentTime = videoRef.current ? videoRef.current.currentTime : 0;

    return (
      <div
        className={`group/video relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl ${className}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleTogglePlay}
      >
        {/* Poster / Play Overlay */}
        {!isPlaying && currentTime === 0 && (
          <div className="absolute inset-0 z-10 pointer-events-none">
             {poster && (
                <Image
                    src={poster}
                    alt={alt || "Video poster"}
                    fill
                    className="object-cover"
                    priority
                />
             )}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                aria-label="Play Video"
                className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover/video:scale-110 group-hover/video:bg-white/30 pointer-events-auto shadow-xl"
                onClick={handleTogglePlay}
              >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-x-0.5">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-black fill-black" />
                  </div>
              </button>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          playsInline
          // autoPlay is handled by useEffect for consistency with prop
        />

        {/* Controls Overlay - Fade in on hover or when paused */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/40 to-transparent px-3 sm:px-6 pb-3 sm:pb-6 pt-12 sm:pt-20 transition-opacity duration-300 ${
            isPlaying && !isHovering ? "opacity-0" : "opacity-100"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
            {/* Progress Bar */}
            <div className="relative w-full h-2 sm:h-1.5 bg-white/20 rounded-full mb-3 sm:mb-4 cursor-pointer group/progress touch-none hover:h-2.5 sm:hover:h-2 transition-all">
                 <div 
                    className="absolute top-0 left-0 h-full bg-[#1d44c3] rounded-full" 
                    style={{ width: `${progress}%` }} 
                 />
                 <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                 />
                 <div 
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity pointer-events-none transform scale-0 group-hover/progress:scale-100 duration-200"
                    style={{ left: `${progress}%` }}
                 />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-6">
                    <button onClick={handleTogglePlay} className="text-white hover:text-blue-300 transition-colors focus:outline-none p-1 sm:p-0">
                        {isPlaying ? <Pause className="w-6 h-6 sm:w-8 sm:h-8 fill-current" /> : <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />}
                    </button>
                    
                    <div className="flex items-center gap-2 sm:gap-3 group/volume">
                        <button onClick={handleMute} className="text-white/90 hover:text-white transition-colors focus:outline-none p-1 sm:p-0">
                            {isMuted ? <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" /> : <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />}
                        </button>
                    </div>

                    <div className="text-white/90 text-xs sm:text-sm font-medium tabular-nums tracking-wide">
                        <span className="hidden sm:inline">{formatTime(currentTime)} <span className="text-white/50 mx-1">/</span> {formatTime(duration)}</span>
                        <span className="sm:hidden">{formatTime(currentTime)}/{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button onClick={handleFullscreen} className="text-white/90 hover:text-white transition-colors focus:outline-none p-1 sm:p-0">
                        {isFullscreen ? <Minimize2 className="w-5 h-5 sm:w-6 sm:h-6" /> : <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
  }
);

CustomVideoPlayer.displayName = "CustomVideoPlayer";

export default CustomVideoPlayer;
