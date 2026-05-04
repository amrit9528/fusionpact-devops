"use client";

import { useState, useEffect } from "react";
import { isBrowser, getScrollPosition } from "@/app/utils/client";

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(() =>
    isBrowser ? getScrollPosition() : 0
  );

  useEffect(() => {
    if (!isBrowser) return;

    const handleScroll = () => {
      // Use requestAnimationFrame for better performance
      window.requestAnimationFrame(() => {
        setScrollPosition(getScrollPosition());
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition;
}
