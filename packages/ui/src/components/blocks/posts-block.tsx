import type { PageContentBlocksPostsBlockLayout } from "@workspace/ui/types/wp";
import PostCard from "@workspace/ui/components/card/post-card";
import { cn } from "@workspace/ui/lib/utils";

type PostsBlockComponentProps = PageContentBlocksPostsBlockLayout & {
    className?: string;
}


const PostsBlock: React.FC<PostsBlockComponentProps> = ({ className, postItems }) => {
    const hasPosts = postItems && postItems.edges.length > 0 ? true : false;

    const posts = hasPosts && postItems && postItems.edges.map((post) => {
        return post?.node;
    });

    if (!hasPosts || !posts) {
        return <p>No posts found.</p>;
    }
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 md:px-4", className)}>
            {posts.map((post: any) => (
                <PostCard key={post.id} {...post} />
            ))}
        </div>
    );
}

export default PostsBlock;
