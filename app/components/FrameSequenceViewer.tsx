/* eslint-disable */
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

interface FrameSequenceViewerProps {
  basePath: string;
  framePrefix: string;
  frameStart: number;
  frameEnd: number;
  frameDigits: number;
  width: number;
  height: number;
}

const FrameSequenceViewer: React.FC<FrameSequenceViewerProps> = ({
  basePath,
  framePrefix,
  frameStart,
  frameEnd,
  frameDigits,
  width,
  height,
}) => {
  // Create an array of frames with a batch gap of 6
  const sampledFrames = useMemo(() => {
    const frames = [];
    for (let i = frameStart; i <= frameEnd; i += 6) {
      // Take every 6th frame
      frames.push(i);
    }
    return frames;
  }, [frameStart, frameEnd]);

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const previousTouchX = useRef(0);
  const totalFrames = sampledFrames.length;

  // Track whether user is hovering over the container
  const isHovering = useRef(false);

  // Generate the full path for the frame
  const getFramePath = (frameNumber: number) => {
    // Pad the frame number with zeros
    const paddedNumber = frameNumber.toString().padStart(frameDigits, "0");
    return `${basePath}/${framePrefix}${paddedNumber}.png`;
  };

  useEffect(() => {
    // Handle mouse wheel scroll event
    const handleWheel = (e: WheelEvent) => {
      if (!isHovering.current) return;

      e.preventDefault();

      // Determine direction and adjust frame index
      // Negative deltaY means scrolling up, positive means scrolling down
      const scrollSensitivity = 0.9; // Adjust sensitivity of scroll
      const frameChange = Math.sign(e.deltaY) * scrollSensitivity;

      // Calculate new frame index, rounding to handle fractional changes
      let newIndex = currentFrameIndex;

      // Accumulate fractional changes and only change index when significant
      if (Math.abs(frameChange) >= 1) {
        newIndex = Math.round(currentFrameIndex + frameChange);
      } else {
        newIndex = currentFrameIndex + frameChange;
      }

      // Ensure index stays within bounds
      const clampedIndex = Math.max(0, Math.min(totalFrames - 1, newIndex));

      setCurrentFrameIndex(clampedIndex);
    };

    // Mouse enter/leave handlers for the container
    const handleMouseEnter = () => {
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
    };

    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousTouchX.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches.length === 1) {
        const touchX = e.touches[0].clientX;
        const deltaX = touchX - previousTouchX.current;

        // Change frames based on drag direction - adjusted for 6-frame gap
        const indexChange = Math.floor(deltaX / 12); // 1 frame per 12px for smoother control

        if (indexChange !== 0) {
          const newIndex = currentFrameIndex + indexChange;
          const clampedIndex = Math.max(0, Math.min(totalFrames - 1, newIndex));
          setCurrentFrameIndex(clampedIndex);

          previousTouchX.current = touchX;
        }
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    // Add wheel event listener to window, but only process when hovering over container
    window.addEventListener("wheel", handleWheel, { passive: false });

    if (containerRef.current) {
      containerRef.current.addEventListener("mouseenter", handleMouseEnter);
      containerRef.current.addEventListener("mouseleave", handleMouseLeave);
      containerRef.current.addEventListener("touchstart", handleTouchStart);
      containerRef.current.addEventListener("touchmove", handleTouchMove);
      containerRef.current.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);

      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );
        containerRef.current.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
        containerRef.current.removeEventListener(
          "touchstart",
          handleTouchStart
        );
        containerRef.current.removeEventListener("touchmove", handleTouchMove);
        containerRef.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [totalFrames, currentFrameIndex]);

  // Preload frames for better performance
  useEffect(() => {
    const preloadImages = () => {
      // Preload all frames since the count is still reasonable with 6-frame gap
      for (let i = 0; i < sampledFrames.length; i++) {
        const img = new (window.Image as any)();
        img.src = getFramePath(sampledFrames[i]);
      }
    };

    preloadImages();
  }, [sampledFrames]);

  // Get the current frame number from our sampled frames array
  const currentFrame = sampledFrames[Math.round(currentFrameIndex)];

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg shadow-xl cursor-ns-resize"
      style={{ width, height }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <Image
          src={getFramePath(currentFrame)}
          alt={`Frame ${currentFrame}`}
          width={width}
          height={height}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm bg-black/50 py-1">
        Scroll up/down to rotate the model
      </div>
    </div>
  );
};

export default FrameSequenceViewer;
