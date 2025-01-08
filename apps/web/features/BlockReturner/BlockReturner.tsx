import Hero from "@/components/blocks/hero";
import FormBlock from "@/components/blocks/form-block";
import type {
  PageContentBlocksHeroLayout,
  PageContentBlocksFormblockLayout,
  PageContentBlocksPostsBlockLayout,

  GfForm,
} from "@/types/wp";
import ProjectsBlock from "@/components/blocks/projects-block";
import PostsBlock from "@workspace/ui/components/blocks/posts-block";
import RichContent from "@workspace/ui/components/blocks/rich-content";

type Block = PageContentBlocksHeroLayout & {
  __typename: string;
  form?: GfForm;
};

type BlockReturnerProps = {
  blocks: Block[];
  title?: string;
  tags?: string[];
};

const componentMap = {
  PageContentBlocksHeroLayout: Hero,
  PageContentBlocksFormblockLayout: FormBlock,
  PageContentBlocksProjectsBlockLayout: ProjectsBlock,
  PageContentBlocksPostsBlockLayout: PostsBlock,
  PageContentBlocksRichContentLayout: RichContent
};

const BlockReturner: React.FC<BlockReturnerProps> = ({ blocks, title, tags }) => {
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
            form={block.form}
            tags={tags}
            {...block}
          />
        ) : null;
      })}
    </div>
  );
};

export default BlockReturner;
