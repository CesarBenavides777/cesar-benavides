import Hero from "@/components/blocks/hero";
import type { PageContentBlocksHeroLayout } from "@/types/wp";

type Block = PageContentBlocksHeroLayout & {
  __typename: string;
};

type BlockReturnerProps = {
  blocks: Block[];
};

const componentMap = {
  PageContentBlocksHeroLayout: Hero,
};

const BlockReturner: React.FC<BlockReturnerProps> = ({ blocks }) => {
  return (
    <>
      {blocks.map((block, index) => {
        const Component = componentMap[block.__typename];
        return Component ? (
          <Component
            key={`${block.__typename}-${index}`}
            id={`${block.__typename}-${index}`}
            {...block}
          />
        ) : null;
      })}
    </>
  );
};

export default BlockReturner;
