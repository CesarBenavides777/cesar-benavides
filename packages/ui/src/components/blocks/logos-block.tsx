import React from "react";
import Image from "next/image";
import { PageContentBlocksLogosblockLayout } from "@workspace/ui/types/wp";
import { cn } from "@workspace/ui/lib/utils";
import { AlternatingText } from "@workspace/ui/components/alternating-text";
import { Marquee } from "@workspace/ui/components/marquee";

type LogosBlockProps = PageContentBlocksLogosblockLayout & {
  className?: string;
  children?: React.ReactNode;
};

const desktopGrid = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-3",
  "4": "md:grid-cols-4",
  "5": "md:grid-cols-5",
  "6": "md:grid-cols-6",
  "7": "md:grid-cols-7",
  "8": "md:grid-cols-8",
  "9": "md:grid-cols-9",
  "10": "md:grid-cols-10",
  "11": "md:grid-cols-11",
  "12": "md:grid-cols-12",
};

const mobileGrid = {
  "2": "grid-cols-2",
  "3": "grid-cols-3",
  "4": "grid-cols-4",
  "5": "grid-cols-5",
  "6": "grid-cols-6",
  "7": "grid-cols-7",
  "8": "grid-cols-8",
  "9": "grid-cols-9",
  "10": "grid-cols-10",
  "11": "grid-cols-11",
  "12": "grid-cols-12",
};

const LogosBlock: React.FC<LogosBlockProps> = ({
  title,
  content,
  uniqueId,
  variant,
  pauseOnHover,
  columns,
  columnsMobile,
  logos,
  morphingTitles,
  children,
}) => {
  const renderLogos = () => {
    if (!logos || logos.length === 0) {
      return null;
    }

    return logos.map((logo, index) => (
      <figure
        key={`${uniqueId}-logo-${index}`}
        className="p-4 grid place-items-center"
      >
        {(logo || !logo.logoDark) && (
          <Image
            src={logo.logo.node.sourceUrl || "/placeholder.svg"}
            alt={logo.logo.node.altText || `Logo ${index + 1}`}
            width={logo.logo.node.mediaDetails.width}
            height={logo.logo.node.mediaDetails.height}
            className={cn("min-w-24 max-w-24 md:max-w-32 h-auto", {
              "dark:hidden": logo?.logoDark,
            })}
            loading="eager"
            priority
          />
        )}
        {logo?.logoDark && (
          <Image
            src={logo?.logoDark.node.sourceUrl || "/placeholder.svg"}
            alt={logo?.logoDark.node.altText || `Logo ${index + 1}`}
            width={logo?.logoDark.node.mediaDetails.width}
            height={logo?.logoDark.node.mediaDetails.height}
            className="min-w-24 max-w-24 md:max-w-32 h-auto hidden dark:block"
            loading="eager"
            priority
          />
        )}
      </figure>
    ));
  };

  return (
    <section className="py-12">
      <div className="container mx-auto flex flex-col gap-12">
        {/* Title and Content */}
        {(title || content) && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            {title && (
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold flex flex-col gap-2">
                {title}{" "}
                {morphingTitles && (
                  <AlternatingText
                    texts={morphingTitles.map((title) => title.morph)}
                  />
                )}
              </h2>
            )}
            {content && (
              <div
                className="text-md font-light text-foreground/70 text-center md:text-left"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        )}

        {/* Grid or Marquee */}
        {variant[0] === "grid" ? (
          <div
            className={cn(
              "grid gap-4",
              desktopGrid[columns],
              mobileGrid[columnsMobile]
            )}
          >
            {renderLogos()}
          </div>
        ) : (
          <div className="relative">
            <Marquee pauseOnHover={pauseOnHover} className="[--duration:20s]">
              {renderLogos()}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r dark:from-[#242424] from-[#f9f9f9]"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l dark:from-[#242424] from-[#f9f9f9]"></div>
          </div>
        )}
      </div>
      {children && <div className="container mx-auto">{children}</div>}
    </section>
  );
};

export default LogosBlock;
