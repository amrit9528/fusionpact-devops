"use client";

import { motion, useInView } from "framer-motion";
import { FC, useState, useRef } from "react";
import Image from "next/image";

const BelowHero: FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="md:min-h-screen bg-white rounded-2xl p-8" id="services">
      <div className="max-w-4xl mx-auto mb-16 text-black">
        <h2 className="text-4xl font-bold mb-4">What We Offer</h2>
        <p className="text-lg">
          Discover top video editors/creators, explore their work through
          vertical portfolios, and hire them with just a swipe. Manage projects
          effortlessly
        </p>
      </div>

      <div
        ref={ref}
        className="max-w-4xl h-[300px] sm:h-[350px] md:h-[600px] flex flex-col gap-4 mx-auto justify-between"
      >
        <motion.div
          initial={{ height: "50%" }}
          animate={{
            height:
              hoveredRow === 1 ? "60%" : hoveredRow === null ? "50%" : "40%",
          }}
          onHoverStart={() => setHoveredRow(1)}
          onHoverEnd={() => setHoveredRow(null)}
          transition={{ duration: 0.3 }}
          className="flex gap-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 80 }}
            className="bg-black rounded-2xl overflow-hidden"
            style={{ width: "35%" }}
            whileHover={{
              width:
                hoveredBox === 1 ? "45%" : hoveredBox === 2 ? "35%" : "25%",
            }}
            onHoverStart={() => setHoveredBox(1)}
            onHoverEnd={() => setHoveredBox(null)}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/img/Glide.gif"
              alt="Service 1"
              width={500}
              height={500}
              unoptimized
              className="w-full h-full object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            className="bg-black rounded-2xl overflow-hidden"
            style={{ width: "65%" }}
            whileHover={{
              width:
                hoveredBox === 2 ? "75%" : hoveredBox === 1 ? "55%" : "65%",
            }}
            transition={{ duration: 0.4, delay: 0.5 }}
            onHoverStart={() => setHoveredBox(2)}
            onHoverEnd={() => setHoveredBox(null)}
          >
            <Image
              src="/img/Showreel.gif"
              alt="Service 1"
              width={500}
              height={500}
              unoptimized
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ height: "50%" }}
          animate={{
            height:
              hoveredRow === 2 ? "60%" : hoveredRow === null ? "50%" : "40%",
          }}
          onHoverStart={() => setHoveredRow(2)}
          onHoverEnd={() => setHoveredRow(null)}
          transition={{ duration: 0.3 }}
          className="flex gap-4 items-end"
        >
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 80 }}
            className="bg-black rounded-2xl overflow-hidden h-full"
            style={{ width: "65%" }}
            whileHover={{
              width:
                hoveredBox === 3 ? "75%" : hoveredBox === 4 ? "55%" : "65%",
            }}
            transition={{ duration: 0.4, delay: 1 }}
            onHoverStart={() => setHoveredBox(3)}
            onHoverEnd={() => setHoveredBox(null)}
          >
            <Image
              src="/img/Search-bar.gif"
              alt="Service 1"
              width={500}
              height={500}
              unoptimized
              className="w-full h-full object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            className="bg-gray-100 rounded-2xl overflow-hidden h-full flex justify-center items-center"
            style={{ width: "35%" }}
            whileHover={{
              width:
                hoveredBox === 4 ? "45%" : hoveredBox === 3 ? "35%" : "25%",
            }}
            transition={{ duration: 0.3, delay: 1.5 }}
            onHoverStart={() => setHoveredBox(4)}
            onHoverEnd={() => setHoveredBox(null)}
          >
            <Image
              src="/video/rb_26044.png"
              alt="Service 4"
              width={500}
              height={500}
              className="w-fit h-20 md:h-32"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BelowHero;
