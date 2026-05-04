"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashAnimationProps {
  onCompleted: () => void; // Function to call when animation is done
}

const SplashAnimation: React.FC<SplashAnimationProps> = ({ onCompleted }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showGlow, setShowGlow] = useState(false); // State to control glow effect

  // Ensure video plays on mount
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Mute explicitly before playing for better autoplay probability
      videoElement.muted = true;
      videoElement.play().catch(error => {
        console.error("Video autoplay prevented:", error);
        // Fallback: If autoplay fails, skip the animation immediately
        onCompleted();
      });
    }
  }, [onCompleted]);

  const handleVideoEnd = () => {
    console.log("Splash video ended, showing glow");
    setShowGlow(true); // Trigger the glow effect

    // Wait for the glow to animate in before signaling completion
    // Increased timeout slightly to let glow establish
    setTimeout(() => {
      onCompleted();
    }, 400); // Adjust timing (milliseconds)
  };

  return (
    // Keep container fixed and centered
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      <video
        ref={videoRef}
        src="/logo.mp4"
        muted
        playsInline
        onEnded={handleVideoEnd}
        // *** Changed to cover the screen, ensure w/h are full ***
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        preload="auto"
        aria-label="Flic loading animation"
      />
      {/* Glow Overlay */}
      <AnimatePresence>
        {showGlow && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }} // Faster fade-in for the glow itself
            style={{
              // *** Stronger white radial gradient from center ***
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 75%)'
              // Adjust percentages for spread and intensity
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplashAnimation; 