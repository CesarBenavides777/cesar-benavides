import { cn } from "@/lib/utils";
import type { PageContentBlocksHeroLayout } from "@/types/wp";
import Image from "next/image";

type HeroProps = PageContentBlocksHeroLayout & {
  className?: string;
  tags?: string[];
};

const Hero: React.FC<HeroProps> = ({
  title,
  subCaption,
  variant,
  body,
  className,
  uniqueId,
  media,
  tags
}) => {
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
              className={"font-sans text-3xl md:text-4xl xl:text-5xl font-bold"}
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
              className={
                "font-sans text-sm md:text-md xl:text-xl text-foreground/70"
              }
            >
              {subCaption}
            </p>
          )}
          {body && (
            <div
              className={
                "font-sans text-sm md:text-base lg:text-lg content-wrapper w-full"
              }
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}
        </div>
        {media && (
          <div className={"flex flex-col"}>
            <Image
              src={media?.node?.sourceUrl || ""}
              alt={media?.node?.altText || ""}
              width={media?.node?.mediaDetails?.width || 0}
              height={media?.node?.mediaDetails?.height || 0}
              placeholder="blur"
              blurDataURL={media?.node?.dataUrl || ""}
              loading="eager"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
