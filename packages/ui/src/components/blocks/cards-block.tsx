import { PageContentBlocksCardsBlockLayout } from "@workspace/ui/types/wp";
import PopupCards from "@workspace/ui/components/card/popup-cards";

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
      <PopupCards cards={cards} />
    </div>
  );
};

export default CardsBlock;
