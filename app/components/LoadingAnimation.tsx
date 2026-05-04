"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import loadingAnimation from "@/public/animations/Adm7QI2TbI.json";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

interface LoadingAnimationProps {
  width?: number;
  height?: number;
}

const LoadingAnimation = ({
  width = 200,
  height = 200,
}: LoadingAnimationProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (!isClient) return null;

  return (
    <div className="flex justify-center items-center">
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};

export default LoadingAnimation;
