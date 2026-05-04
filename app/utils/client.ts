"use client";

export const isBrowser = typeof window !== "undefined";

export const getScrollPosition = () => {
  if (!isBrowser) return 0;
  return window.scrollY;
};
