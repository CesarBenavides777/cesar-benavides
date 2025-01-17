
import type { PageContentBlocks_Layout, GfForm } from "@/types/wp";
// Blocks
import Hero from "@/components/blocks/hero";
import PostsBlock from "@workspace/ui/components/blocks/posts-block";
import RichContent from "@workspace/ui/components/blocks/rich-content";
import LogosBlock from "@workspace/ui/components/blocks/logos-block";
import dynamic from "next/dynamic";

const ProjectsBlock = dynamic(() => import("@/components/blocks/projects-block"),);
const FormBlock = dynamic(() => import("@/components/blocks/form-block"));
const CodeBlock = dynamic(() => import("@workspace/ui/components/blocks/code-block"));

type Block = PageContentBlocks_Layout & {
  __typename: string;
  form?: GfForm;
  tags?: string[];
  postId?: string;
};

type BlockReturnerProps = {
  blocks: Block[];
  title?: string;
  tags?: string[];
  postId?: string;
};

const componentMap = {
  PageContentBlocksHeroLayout: Hero,
  PageContentBlocksFormblockLayout: FormBlock,
  PageContentBlocksProjectsBlockLayout: ProjectsBlock,
  PageContentBlocksPostsBlockLayout: PostsBlock,
  PageContentBlocksRichContentLayout: RichContent,
  PageContentBlocksCodeBlockLayout: CodeBlock,
  PageContentBlocksLogosblockLayout: LogosBlock,
};

const BlockReturner: React.FC<BlockReturnerProps> = ({
  blocks,
  title,
  tags,
  postId,
}) => {
  if (!blocks || blocks.length === 0) {
    return <Hero title={title} />;
  }
  return (
    <div className={"flex flex-col gap-4"}>
      {blocks.map((block, index) => {
        const Component = componentMap[block.__typename as keyof typeof componentMap] as React.FC<Block>;
        return Component ? (
          <Component
            key={`${block.__typename}-${index}`}
            form={block.form}
            tags={tags}
            postId={postId}
            {...block}
          />
        ) : null;
      })}
    </div>
  );
};

export default BlockReturner;
