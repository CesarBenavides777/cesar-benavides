import { Project, ProjectTag } from "@/types/wp";
import { cn } from "@/lib/utils";
import { Badge } from "@workspace/ui/components/badge";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";



type ProjectCardProps = Project & {
    className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  className,
  id,
  projectTags,
  excerpt,
  projectOptions
}) => {
  const tags = projectTags?.nodes.map((tag: ProjectTag) => tag?.name) as
    | string[]
    | undefined;
    const { githubLink, liveLink } = projectOptions || {};

  return (
    <div className={cn("flex flex-col gap-2 bg-background", className)} id={id}>
      <div className="flex flex-row justify-between items-center">
        {title && <h3 className={"font-sans text-xl font-bold"}>{title}</h3>}
        {githubLink && (
          <Link 
            href={githubLink} 
            className="bg-foreground text-background p-1 rounded-full hover:bg-foreground/80"
            >
            <FaGithub />
            <span className="sr-only">View the source code on GitHub</span>
          </Link>
        )}
      </div>
      <div className={"flex flex-row gap-2 overflow-clip relative"}>
        {tags &&
          tags.map((tag: string) => (
            <Badge
              className={"text-[10px] whitespace-nowrap font-light"}
              key={`${id}-${tag}`}
            >
              {tag}
            </Badge>
          ))}
        {tags && tags.length > 4 && (
          <div
            className={`absolute right-0 bg-gradient-to-r from-transparent to-background w-12 h-full`}
          />
        )}
      </div>
      {excerpt && (
        <div
          className={"font-sans text-sm text-foreground/70"}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      )}
    </div>
  );
};

export default ProjectCard;