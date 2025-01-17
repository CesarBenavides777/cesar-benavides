"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@workspace/ui/lib/utils";

interface AlternatingTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function AlternatingText({
  texts,
  interval = 3000,
  className,
}: AlternatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [texts, interval]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex} // Ensure the key changes for animation
        className={cn("block", className)}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        {texts[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );
}
