"use client";

import type { PageContentBlocksCardsBlockLayout } from "@workspace/ui/types/wp";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, m, useInView } from "motion/react";
import { Button } from "@workspace/ui/components/button";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@workspace/ui/lib/utils";
const loadFeatures = () =>
  import("@/src/utils/expandedFeatures").then((res) => res.default);

type PopupCardProps = {
  card: PageContentBlocksCardsBlockLayout["cards"][number];
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
};

// expanded & not expanded variants
const variants = {
  expanded: {
    scale: 1.2,
    margin: "auto",
    origin: "center",
  },
  collapsed: {
    scale: 1,
    margin: "0",
    origin: "center",
  },
};

const PopupCard = ({
  card,
  isExpanded,
  onExpand,
  onCollapse,
}: PopupCardProps) => {
  const [playVideo, setPlayVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null); // Reference for the video element
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });
  const { title, content, image, imageDark, video } = card || {};

  // Effect to play or pause the video programmatically
  useEffect(() => {
    if (videoRef.current) {
      if (isExpanded || playVideo) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isExpanded, playVideo]);

  return (
    <m.div
      ref={cardRef}
      className={cn(
        "rounded-2xl bg-background/70 hover:bg-background/50 backdrop-blur-lg flex flex-col cursor-pointer min-h-60",
        "overflow-hidden",
        {
          "fixed inset-0 z-50 overflow-auto px-4 md:px-0 max-w-[85vw] mx-auto md:max-w-[50vw] max-h-fit":
            isExpanded,
          "justify-between min-h-[350px]": !isExpanded,
        }
      )}
      layout
      layoutId={`card-${title}`}
      variants={variants}
      initial={false}
      animate={isExpanded ? "expanded" : "collapsed"}
      transition={{
        type: "spring",
        visualDuration: 0.5,
        bounce: 0.1,
      }}
      onClick={() => (isExpanded ? onCollapse() : onExpand())}
      onMouseEnter={() => setPlayVideo(true)}
      onMouseLeave={() => setPlayVideo(false)}
    >
      <m.div className="relative w-full " layoutId={`image-${title}`}>
        <div className="h-64 overflow-clip">
          {(image || !imageDark) && (
            <Image
              src={image.node.sourceUrl || "/placeholder.svg"}
              alt={image.node.altText || "Card Image"}
              width={image.node.mediaDetails.width}
              height={image.node.mediaDetails.height}
              className={cn(
                "w-full object-cover rounded-t-2xl",
                "transition-all duration-300 ease-in-out",
                {
                  hidden: imageDark || playVideo || isExpanded,
                }
              )}
              placeholder="blur"
              blurDataURL={image.node.dataUrl}
            />
          )}
          {imageDark && (
            <Image
              src={imageDark.node.sourceUrl || "/placeholder.svg"}
              alt={imageDark.node.altText || "Card Image"}
              width={imageDark.node.mediaDetails.width}
              height={imageDark.node.mediaDetails.height}
              className={cn(
                "w-full object-cover rounded-t-2xl hidden dark:block",
                "transition-all duration-300 ease-in-out",
                {
                  hidden: playVideo || isExpanded,
                }
              )}
              placeholder="blur"
              blurDataURL={image.node.dataUrl}
            />
          )}
          {video && (
            <video
              ref={videoRef} // Attach the ref to the video element
              src={video.node.mediaItemUrl}
              loop
              playsInline
              controls={false}
              muted
              className={cn(
                "w-full h-64 object-cover rounded-t-2xl",
                "transition-all duration-300 ease-in-out",
                {
                  hidden: !playVideo && !isExpanded,
                }
              )}
              preload="none"
            />
          )}
        </div>

        {isExpanded && (
          <Button
            variant="outline"
            className="absolute top-4 right-4 rounded-full w-10 h-10 p-3 z-50 bg-background/60"
            onClick={() => onCollapse()}
          >
            <X />
          </Button>
        )}
      </m.div>
      <m.div
        className={cn("flex gap-4 justify-between py-4 px-5 overflow-hidden", {
          "flex-row items-end": !isExpanded,
          "flex-col items-start": isExpanded,
        })}
        layoutId={`content-${title}`}
      >
        {title && (
          <h3 className="text-lg font-semibold cursor-pointer balanced">
            {title}
          </h3>
        )}
        {!isExpanded && (
          <Button variant="outline" className="rounded-full w-10 h-10 p-3">
            <Plus />
            <span className="sr-only">Expand</span>
          </Button>
        )}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <m.div
              key={`content-${title}`}
              className={cn(
                "text-sm text-foreground content-wrapper overflow-hidden"
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={
                isExpanded ? { duration: 0 } : { duration: 0.3, delay: 0.5 }
              }
              dangerouslySetInnerHTML={{ __html: content }}
              layoutId={`content-${title}-content-section`}
            />
          )}
        </AnimatePresence>
      </m.div>
    </m.div>
  );
};

type PopupCardsProps = {
  cards?: PageContentBlocksCardsBlockLayout["cards"];
};

const PopupCards = ({ cards }: PopupCardsProps) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <LazyMotion
      features={loadFeatures}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-2 items-start relative">
        {cards.map((card, index) => (
          <div key={`popup-card-${index}`} className="relative">
            <PopupCard
              card={card}
              isExpanded={expandedCard === `card-${card.title}`}
              onExpand={() => setExpandedCard(`card-${card.title}`)}
              onCollapse={() => setExpandedCard(null)}
            />
          </div>
        ))}
        <AnimatePresence>
          {expandedCard && (
            <m.div
              key="overlay"
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedCard(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
};

export default PopupCards;
