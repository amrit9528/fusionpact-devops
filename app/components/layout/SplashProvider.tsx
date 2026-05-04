"use client";

import React, { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation'; // Import usePathname
import SplashAnimation from './SplashAnimation'; // Import the splash screen component
import { AnimatePresence, motion } from 'framer-motion';

const SplashProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const pathname = usePathname(); // Get the pathname
  // Determine initial loading state based on pathname
  const [isLoading, setIsLoading] = useState(false); // Always start with false

  // Function to handle completion of the splash animation
  const handleAnimationComplete = () => {
    console.log("Animation complete, setting isLoading false");
    setIsLoading(false); // Hide splash screen when animation is complete
  };

  // Prevent scrollbars during splash animation
  useEffect(() => {
    // Only manage overflow if loading (i.e., on the homepage initially)
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      // Add a small delay before restoring scroll to prevent scrollbar flicker during transition
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
      }, 500); // Match this delay roughly with transition overlaps
      return () => clearTimeout(timer); // Cleanup timer
    }
    // Cleanup function for unmount or when isLoading becomes false early
    return () => {
       document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
             key="splash"
             exit={{ opacity: 0 }}
             transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SplashAnimation onCompleted={handleAnimationComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conditionally render children */}
      {/* Use AnimatePresence here too if you want entry animations on route changes within the main app */}
      {/* For just the initial load animation, conditional rendering is fine */}
       {!isLoading && (
         <motion.div
           key="content"
           // Start slightly smaller and fade in simultaneously with splash fading out
           initial={{ opacity: 0, scale: 0.98 }} // Start slightly scaled down
           animate={{ opacity: 1, scale: 1 }} // Animate to full opacity and scale
           // *** Remove delay to start animation as splash fades out ***
           transition={{ duration: 0.8, ease: "easeOut" }} // Slightly longer duration, smoother ease
         >
           {children}
         </motion.div>
       )}
    </>
  );
};

export default SplashProvider; 