import Hero from "@/components/blocks/hero";
import type { PageContentBlocksHeroLayout } from "@/types/wp";

type Block = PageContentBlocksHeroLayout & {
  __typename: string;
};

type BlockReturnerProps = {
  blocks: Block[];
  title?: string;
};

const componentMap = {
  PageContentBlocksHeroLayout: Hero,
};

const BlockReturner: React.FC<BlockReturnerProps> = ({ blocks, title }) => {

  if (!blocks || blocks.length === 0) {
    return <Hero title={title} />;
  }


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
