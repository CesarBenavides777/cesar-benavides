import { PageContentBlocksCardsBlockLayout } from "@workspace/ui/types/wp";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PopupCards = dynamic(
  () => import("@workspace/ui/components/card/popup-cards"),
  {
    loading: () => (
      <div className="h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
    ),
  }
);

type CardsBlockProps = PageContentBlocksCardsBlockLayout & {
  className?: string;
};

export const CardsBlock = ({
  title,
  content,
  cards,
  className,
}: CardsBlockProps) => {
  return (
    <div
      className={`cards-block ${className} py-4 md:py-16 flex flex-col gap-[48px]`}
    >
      <div className="flex gap-2 md:gap-6 flex-col md:flex-row justify-between items-start md:items-end">
        {title && (
          <h2 className="text-2xl md:text-5xl font-bold md:min-w-[50%] balanced">
            {title}
          </h2>
        )}
        {content && (
          <div
            className="text-sm text-foreground/60"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
      <Suspense
        fallback={
          <div className="h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
        }
      >
        <PopupCards cards={cards} />
      </Suspense>
    </div>
  );
};

export default CardsBlock;
