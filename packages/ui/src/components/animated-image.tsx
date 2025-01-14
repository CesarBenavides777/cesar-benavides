"use client";

import { MediaItem } from "@workspace/ui/types/wp";
import { motion } from "motion/react";
import Image from "next/image";
import { ReactNode } from "react";

type AnimatedImageProps = {
  media?: MediaItem;
  className?: string;
  postId?: string;
  loading?: "eager" | "lazy";
  main?: boolean;
  children?: ReactNode;
};

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  media,
  className,
  postId,
  loading,
  main = false,
  children,
}) => {
  if (!media) {
    return null;
  }

  const { altText, sourceUrl, mediaDetails, dataUrl } = media;
  const width = mediaDetails?.width || 0;
  const height = mediaDetails?.height || 0;

  const variants = {
    initial: !main ? { opacity: 0 } : null,
    animate: !main
      ? { opacity: 1, transition: { delay: 0.2 } }
      : { opacity: 1 },
    exit: !main ? { opacity: 0 } : null,
  };

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      layoutId={`animated-image-${postId}`}
    >
      <Image
        src={sourceUrl}
        alt={altText || ""}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={dataUrl}
        loading={loading}
      />
      {children}
    </motion.div>
  );
};

export default AnimatedImage;
