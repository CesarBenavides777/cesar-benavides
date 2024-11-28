import { cn } from "@/lib/utils";
import type { PageContentBlocksHeroLayout } from "@/types/wp";

type HeroProps = PageContentBlocksHeroLayout & {
  className?: string;
  id?: string;
};

const Hero: React.FC<HeroProps> = ({
  title,
  subCaption,
  variant,
  body,
  className,
  id,
}) => {
  return (
    <section
      className={cn(
        "px-2 md:px-4 py-6 md:py-12",
        "border-[2px] border-gray-200/40",
        "rounded-xl",
        className,
      )}
      id={id}
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
                "font-sans text-sm md:text-md text-gray-500 dark:text-gray-200/40"
              }
            >
              {subCaption}
            </p>
          )}
        </div>
        {body && (
          <div
            className={"font-sans text-sm md:text-base lg:text-lg"}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}
      </div>
    </section>
  );
};

export default Hero;
