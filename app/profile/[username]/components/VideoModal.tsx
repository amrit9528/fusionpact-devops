"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { IoClose } from "react-icons/io5";
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
}

interface VideoModalProps {
  post: Post;
  onClose: () => void;
}

export default function VideoModal({ post, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle play/pause
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

  // Handle time update
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  }, []);

  // Handle seek
  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const clickedValue = x / rect.width;
      videoRef.current.currentTime = clickedValue * videoRef.current.duration;
    }
  }, []);

  // Handle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Handle rotation
  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "Escape":
          onClose();
          break;
        case "KeyR":
          handleRotate();
          break;
        case "KeyF":
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [togglePlay, onClose, handleRotate, toggleFullscreen]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xl">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
        >
          <IoClose size={24} />
        </button>

        {/* Video container */}
        <div className="relative w-full h-full max-w-7xl aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={post.video_link}
            className="w-full h-full object-contain"
            style={{ transform: `rotate(${rotation}deg)` }}
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
          />

          {/* Video controls */}
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

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button onClick={togglePlay}>
                {isPlaying ? (
                  <BsPauseFill size={24} />
                ) : (
                  <BsPlayFill size={24} />
                )}
              </button>

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
      </div>
    </div>
  );
}
