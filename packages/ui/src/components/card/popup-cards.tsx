"use client";

import type { PageContentBlocksCardsBlockLayout } from "@workspace/ui/types/wp";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@workspace/ui/components/button";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@workspace/ui/lib/utils";

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
  const { title, content, image, imageDark, video } = card || {};

  return (
    <motion.div
      className={cn(
        "rounded-2xl bg-background/70 hover:bg-background/50 backdrop-blur-lg flex flex-col cursor-pointer min-h-60",
        "overflow-hidden",
        {
          "fixed inset-0 z-50 overflow-auto px-4 md:px-0 max-w-[85vw] mx-auto md:max-w-[50vw] max-h-fit-content":
            isExpanded,
          "justify-between min-h-[350px]": !isExpanded,
        }
      )}
      layout
      layoutId={`card-${title}`}
      variants={variants}
      initial="collapsed"
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
      <motion.div className="relative w-full" layoutId={`image-${title}`}>
        {(image || !imageDark) && (
          <Image
            src={image.node.sourceUrl}
            alt={image.node.altText || "Card Image"}
            width={image.node.mediaDetails.width}
            height={image.node.mediaDetails.height}
            className={cn("w-full h-64 object-cover rounded-t-2xl", {
              hidden: imageDark || playVideo || isExpanded,
            })}
            placeholder="blur"
            blurDataURL={image.node.dataUrl}
          />
        )}
        {imageDark && (
          <Image
            src={imageDark.node.sourceUrl}
            alt={imageDark.node.altText || "Card Image"}
            width={imageDark.node.mediaDetails.width}
            height={imageDark.node.mediaDetails.height}
            className={cn(
              "w-full h-64 object-cover rounded-t-2xl hidden dark:block",
              {
                hidden: playVideo || isExpanded,
              }
            )}
            placeholder="blur"
            blurDataURL={image.node.dataUrl}
          />
        )}
        {video && (playVideo || isExpanded) && (
          <video
            src={video.node.mediaItemUrl}
            autoPlay
            loop
            playsInline
            controls={false}
            muted
            className="w-full h-64 object-cover rounded-t-2xl"
          />
        )}
        {/* Add lose button when open */}
        {isExpanded && (
          <Button
            variant="outline"
            className="absolute top-4 right-4 rounded-full w-10 h-10 p-3 z-50 bg-background/60"
            onClick={() => onCollapse()}
          >
            <X />
          </Button>
        )}
      </motion.div>
      <motion.div
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
          </Button>
        )}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
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
      </motion.div>
    </motion.div>
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
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedCard(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};



export default PopupCards;
