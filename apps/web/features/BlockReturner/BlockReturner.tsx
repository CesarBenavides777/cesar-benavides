import Hero from "@/components/blocks/hero";
// import FormBlock from "@/components/blocks/form-block";
import type {
  PageContentBlocksHeroLayout,
  GfForm,
} from "@/types/wp";
// import ProjectsBlock from "@/components/blocks/projects-block";
import PostsBlock from "@workspace/ui/components/blocks/posts-block";
import RichContent from "@workspace/ui/components/blocks/rich-content";

import dynamic from "next/dynamic";

const ProjectsBlock = dynamic(() => import("@/components/blocks/projects-block"));
const FormBlock = dynamic(() => import("@/components/blocks/form-block"));

type Block = PageContentBlocksHeroLayout & {
  __typename: string;
  form?: GfForm;
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
  PageContentBlocksRichContentLayout: RichContent
};

const BlockReturner: React.FC<BlockReturnerProps> = ({ blocks, title, tags, postId }) => {
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
            postId={postId}
            {...block}
          />
        ) : null;
      })}
    </div>
  );
};

export default BlockReturner;
