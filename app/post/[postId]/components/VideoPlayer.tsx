"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  BsPlayFill,
  BsPauseFill,
  BsFullscreen,
  BsFullscreenExit,
  BsVolumeUp,
  BsVolumeMute,
} from "react-icons/bs";
import { MdRotate90DegreesCcw } from "react-icons/md";

interface Post {
  id: string;
  title: string;
  description?: string;
  video_link?: string;
  thumbnail_url: string;
  username: string;
  first_name: string;
  last_name: string;
  picture_url: string;
}

export default function VideoPlayer({ post }: { post: Post }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedValue = x / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = clickedValue * videoRef.current.duration;
    }
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Update the video initialization effect
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.volume = volume;

      const handleLoadedMetadata = () => {
        setDuration(video.duration);
        setIsLoading(false);
      };

      const handleError = (e: Event) => {
        console.log(e);
        setError("Error loading video");
        setIsLoading(false);
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("error", handleError);

      // Try to load duration immediately if already available
      if (video.readyState >= 1) {
        handleLoadedMetadata();
      }

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("error", handleError);
      };
    }
  }, [volume]);

  // Update video element when volume changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="max-w-4xl mx-auto pt-24 px-4">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* User Profile with improved styling */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-black/30 p-2 rounded-lg backdrop-blur-sm">
          <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-white">
            <Image
              src={post.picture_url || "/default-avatar.png"}
              alt={post.username}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-white font-medium">{post.username}</div>
            <div className="text-gray-300 text-sm">
              {post.first_name} {post.last_name}
            </div>
          </div>
        </div>

        {/* Video with improved handling */}
        <video
          ref={videoRef}
          src={post.video_link}
          className="w-full h-full object-contain"
          style={{
            transform: `rotate(${rotation}deg)`,
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.3s ease-in-out",
          }}
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          preload="metadata"
          playsInline
        />

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-purple-600"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-4">
            <button onClick={togglePlay}>
              {isPlaying ? <BsPauseFill size={24} /> : <BsPlayFill size={24} />}
            </button>

            <div className="text-sm text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setVolume((v) => (v === 0 ? 1 : 0))}>
                {volume === 0 ? (
                  <BsVolumeMute size={20} />
                ) : (
                  <BsVolumeUp size={20} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-20"
              />
            </div>

            <button onClick={handleRotate}>
              <MdRotate90DegreesCcw size={20} />
            </button>

            <button onClick={toggleFullscreen} className="ml-auto">
              {isFullscreen ? (
                <BsFullscreenExit size={20} />
              ) : (
                <BsFullscreen size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        {post.description && (
          <p className="mt-2 text-gray-300">{post.description}</p>
        )}
      </div>
    </div>
  );
}
