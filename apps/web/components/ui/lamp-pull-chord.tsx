"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  useDragControls,
} from "framer-motion";
import useSound from "use-sound";

const LampPullChord: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const y = useMotionValue(0);
  const ySpring = useSpring(y, {
    stiffness: 300,
    damping: 20,
  });
  const yTransform = useTransform(ySpring, [-30, 0, 30], [0, 20, -20]);
  const [playSound] = useSound("/path/to/sound.mp3");

  const controls = useDragControls();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handlePull = () => {
    if (y.get() === 0) {
      y.set(-30);
      setTimeout(() => y.set(0), 500);
      setIsDarkMode(!isDarkMode);
      playSound();
    }
  };

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    controls.start(event, {
      snapToCursor: false,
    });
  };

  return (
    <div className="fixed top-0 left-12 flex justify-center items-center h-fit">
      <motion.div
        className="relative"
        drag="y"
        dragControls={controls}
        dragListener={false}
        style={{
          y: ySpring,
        }}
      >
        <div className="w-1 h-20 bg-gray-600" />
        <motion.div
          className="w-10 h-10 bg-yellow-400 rounded-full shadow-md mb-4"
          style={{
            y: yTransform,
            touchAction: "none",
          }}
          onPointerDown={startDrag}
        />
      </motion.div>
    </div>
  );
};

export default LampPullChord;
