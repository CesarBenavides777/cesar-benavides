

import { Post } from "@workspace/ui/types/wp";
import Link from "next/link";
import AnimatedImage from "@workspace/ui/components/animated-image";

export type PostCardProps = Post & {
  className?: string;
};

const PostCard = ({
  className,
  title,
  content,
  excerpt,
  uri,
  featuredImage,
  tags,
  id,
}: PostCardProps) => {
  if (!title || !uri) {
    return null;
  }

  return (
    <Link href={uri} className="group">
      <article className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
        <AnimatedImage
          media={featuredImage?.node}
          postId={id}
          main={true}
          className="aspect-w-16 aspect-h-9 relative"
        >
          <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent"></div>
        </AnimatedImage>
        <div className="absolute bottom-0 left-0 right-0 p-4 ">
          <h2 className="mb-2 text-2xl font-bold leading-tight text-foreground">
            {title}
          </h2>
          {excerpt && (
            <div
              className="mb-2 text-sm text-foreground/70 truncate text-elipsis"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          )}
          {tags && tags?.nodes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.nodes.map((tag, index) => (
                <span
                  key={`${tag?.id}-${index}`}
                  className="rounded-full bg-background/20 px-2 py-1 text-xs font-semibold backdrop-blur-xs"
                >
                  {/* @ts-ignore */}
                  {tag?.name || ""}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
