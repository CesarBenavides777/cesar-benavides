"use client";

import { cn } from "@/lib/utils";
import type { PageContentBlocksHeroLayout } from "@/types/wp";
import AnimatedImage from "@workspace/ui/components/animated-image";
import Image from "next/image";
import { motion } from "motion/react";

type HeroProps = PageContentBlocksHeroLayout & {
  className?: string;
  tags?: string[];
  postId?: string;
};

const Hero: React.FC<HeroProps> = ({
  title,
  subCaption,
  variant,
  body,
  className,
  uniqueId,
  media,
  tags,
  postId = "",
}) => {

  const isHome = variant && variant[0] === "home";

  return (
    <section
      className={cn("px-2 md:px-4 py-6 md:py-12", className)}
      id={uniqueId || undefined}
    >
      <div
        className={cn("flex gap-4", {
          "flex-col": !media,
          "flex-col md:flex-row": media,
        })}
      >
        <div className={"flex flex-col gap-2"}>
          {title && (
            <h1
              className={cn(
                "font-sans text-3xl md:text-4xl xl:text-5xl font-bold balanced",
                {
                  "text-center": isHome,
                }
              )}
            >
              {title}
            </h1>
          )}
          {tags && tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full bg-background/20 px-2 py-1 text-xs font-semibold backdrop-blur-sm"
                >
                  {/* @ts-ignore */}
                  {tag || ""}
                </span>
              ))}
            </div>
          )}
          {subCaption && (
            <p
              className={cn(
                "font-sans text-sm md:text-md xl:text-xl text-foreground/70",
                {
                  "text-center": isHome,
                }
              )}
            >
              {subCaption}
            </p>
          )}
          {body && (
            <div
              className={cn(
                "font-sans text-sm md:text-base lg:text-lg content-wrapper w-full",
                {
                  "text-center": isHome,
                }
              )}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}
        </div>
        {media && (
          // <motion.div
          //   className={"flex flex-col"}
          //   layoutId={`post-card-${postId}-image`}
          //   initial="initial"
          //   animate="animate"
          //   exit="exit"
          //   variants={variants}
          // >
          //   <Image
          //     src={media?.node?.sourceUrl || ""}
          //     alt={media?.node?.altText || ""}
          //     width={media?.node?.mediaDetails?.width || 0}
          //     height={media?.node?.mediaDetails?.height || 0}
          //     placeholder="blur"
          //     blurDataURL={media?.node?.dataUrl || ""}
          //     loading="eager"
          //   />
          // </motion.div>
          <AnimatedImage
            media={media?.node}
            className="flex flex-col"
            postId={postId}
            loading="eager"
            main={true}
          />
        )}
      </div>
    </section>
  );
};

export default Hero;
