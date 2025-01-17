
import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { PageContentBlocksLogosblockLayout } from "@workspace/ui/types/wp";
import { cn } from "@workspace/ui/lib/utils";
import { MorphingText } from "@workspace/ui/components/morphing-text";


type LogosBlockProps = PageContentBlocksLogosblockLayout & {
    className?: string;
}

const LogosBlock: React.FC<LogosBlockProps> = ({
  title,
  content,
  uniqueId,
  variant,
  pauseOnHover,
  columns,
  columnsMobile,
  logos,
  morphingTitles
}) => {

  const renderLogos = () => {
    return logos.map((logo, index) => (
      <div
        key={`${uniqueId}-logo-${index}`}
        className="p-4 grid place-items-center"
      >
        {(logo || !logo.logoDark) && (
          <Image
            src={logo.logo.node.sourceUrl || "/placeholder.svg"}
            alt={logo.logo.node.altText || `Logo ${index + 1}`}
            width={logo.logo.node.mediaDetails.width}
            height={logo.logo.node.mediaDetails.height}
            className={cn("min-w-16 max-w-24 md:max-w-32 h-auto", {
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
            className="min-w-16 max-w-24 md:max-w-32 h-auto hidden dark:block"
            loading="eager"
            priority
          />
        )}
      </div>
    ));
  };

  const gridClasses = `grid gap-4 ${
    variant === "grid"
      ? `grid-cols-${columnsMobile} md:grid-cols-${columns}`
      : "grid-cols-2 md:grid-cols-4"
  }`;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 flex flex-col gap-1">
        <div className="text-center flex flex-col">
          {title && (
            <h2 className="text-2xl font-bold font-sans">
              {title}
            </h2>
          )}
          <MorphingText
            texts={morphingTitles.map((title) => title.morph)}
            className="my-24"
          />
        </div>
        {content && (
          <div
            className="text-md font-sans font-light text-center text-foreground/70"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {variant[0] === "grid" ? (
          <div className={gridClasses}>{renderLogos()}</div>
        ) : (
          <Marquee
            pauseOnHover={pauseOnHover}
            gradient={true}
            className={"flex flex-row items-center justify-center"}
            autoFill
            loop={0}
            gradientWidth={100}
          >
            <div className="flex">{renderLogos()}</div>
          </Marquee>
        )}
      </div>
    </section>
  );
};

export default LogosBlock;
