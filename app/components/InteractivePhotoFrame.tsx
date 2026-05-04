import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

interface InteractivePhotoFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const InteractivePhotoFrame: React.FC<InteractivePhotoFrameProps> = ({
  src,
  alt,
  width,
  height,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // माउस पोजिशन को ट्रैक करने के लिए मोशन वैल्यू
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // रोटेशन ट्रांसफॉर्म को माउस मूवमेंट से कनेक्ट करना
  const rotateX = useTransform(y, [-100, 100], [10, -10]); // वर्टिकल मूवमेंट
  const rotateY = useTransform(x, [-100, 100], [-10, 10]); // हॉरिज़ॉन्टल मूवमेंट

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // माउस पोजिशन को कंटेनर के सेंटर से केलकुलेट करना
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // सेंटर से डिस्टेंस
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    // माउस लीव होने पर स्मूथली रीसेट करना
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg shadow-xl perspective-500"
      style={{ width, height, perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default InteractivePhotoFrame;
