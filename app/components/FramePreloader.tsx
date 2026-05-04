"use client";

import { useEffect } from "react";

interface FramePreloaderProps {
  basePath: string;
  framePrefix: string;
  frameStart: number;
  frameEnd: number;
  frameDigits: number;
  onProgress: (progress: number) => void;
  onComplete: () => void;
}

const FramePreloader: React.FC<FramePreloaderProps> = ({
  basePath,
  framePrefix,
  frameStart,
  frameEnd,
  frameDigits,
  onProgress,
  onComplete,
}) => {
  // const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    // Calculate total frames with batch gap of 6
    const framesArray = [];
    for (let i = frameStart; i <= frameEnd; i += 6) {
      // Take every 6th frame
      framesArray.push(i);
    }
    const totalFrames = framesArray.length;
    const framesToLoad: HTMLImageElement[] = [];

    const getFramePath = (frameNumber: number) => {
      const paddedNumber = frameNumber.toString().padStart(frameDigits, "0");
      return `${basePath}/${framePrefix}${paddedNumber}.png`;
    };

    const handleImageLoad = () => {
      loadedCount++;
      const newProgress = (loadedCount / totalFrames) * 100;
      // setProgress(newProgress);
      onProgress(newProgress);

      if (loadedCount === totalFrames) {
        onComplete();
      }
    };

    // Only load frames with batch gap of 6
    for (let i = frameStart; i <= frameEnd; i += 6) {
      const img = new Image();
      img.onload = handleImageLoad;
      img.src = getFramePath(i);
      framesToLoad.push(img);
    }

    return () => {
      // Cleanup - remove onload handlers
      framesToLoad.forEach((img) => {
        img.onload = null;
      });
    };
  }, [
    frameStart,
    frameEnd,
    frameDigits,
    basePath,
    framePrefix,
    onProgress,
    onComplete,
  ]);

  return null; // Doesn't render anything, only handles preloading
};

export default FramePreloader;
