import Hero from "@/components/blocks/hero";
import FormBlock from "@/components/blocks/form-block";
import type {
  PageContentBlocksHeroLayout,
  PageContentBlocksFormblockLayout,
  GfForm,
} from "@/types/wp";

type Block = PageContentBlocksHeroLayout & {
  __typename: string;
  form?: GfForm;
};

type BlockReturnerProps = {
  blocks: Block[];
  title?: string;
};

const componentMap = {
  PageContentBlocksHeroLayout: Hero,
  PageContentBlocksFormblockLayout: FormBlock,
};

const BlockReturner: React.FC<BlockReturnerProps> = ({ blocks, title }) => {
  if (!blocks || blocks.length === 0) {
    return <Hero title={title} />;
  }

  return (
    <div className={"flex flex-col gap-4"}>
      {blocks.map((block, index) => {
        const Component = componentMap[block.__typename];
        return Component ? (
          <Component
            key={`${block.__typename}-${index}`}
            id={`${block.__typename}-${index}`}
            form={block.form}
            {...block}
          />
        ) : null;
      })}
    </div>
  );
};

export default BlockReturner;
