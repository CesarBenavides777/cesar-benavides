import { cn } from "@/lib/utils";
import type { PageContentBlocksHeroLayout } from "@/types/wp";

type HeroProps = PageContentBlocksHeroLayout & {
  className?: string;
};

const Hero: React.FC<HeroProps> = ({
  title,
  subCaption,
  variant,
  body,
  className,
  uniqueId,
}) => {
  return (
    <section
      className={cn(
        "px-2 md:px-4 py-6 md:py-12",
        className
      )}
      id={uniqueId || undefined}
    >
      <div className={"flex flex-col gap-4"}>
        <div className={"flex flex-col"}>
          {title && (
            <h1 className={"font-sans text-3xl md:text-4xl font-bold"}>
              {title}
            </h1>
          )}
          {subCaption && (
            <p
              className={
                "font-sans text-sm md:text-md text-foreground/70"
              }
            >
              {subCaption}
            </p>
          )}
        </div>
        {body && (
          <div
            className={"font-sans text-sm md:text-base lg:text-lg content-wrapper w-full"}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}
      </div>
    </section>
  );
};

export default Hero;
