import { cn } from "@/lib/utils";
import type { PageContentBlocksProjectsBlockLayout, Project } from "@/types/wp";
import { ProjectCard } from "../ProjectCard";

type ProjectsBlockProps = PageContentBlocksProjectsBlockLayout & {
  className?: string;
  id?: string;
};

const ProjectsBlock: React.FC<ProjectsBlockProps> = ({
    projectItems,
    className,
    id,
}: ProjectsBlockProps) => {
    const hasProjects = projectItems && projectItems.edges.length > 0;

    const projects = projectItems?.edges.map((project) => project.node) as Project[];

    return (
      <section
        className={cn(
          "px-2 md:px-4 py-6 md:py-12",
          className
        )}
        id={id}
      >
        <div className={"flex flex-col gap-4"}>
          <div className={"flex flex-col"}>
            <h2 className={"font-sans text-3xl md:text-4xl font-bold"}>
              Projects
            </h2>
          </div>
          <div
            className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}
          >
            {hasProjects ? (
              projects.map((project) => (
                <ProjectCard
                  className={
                    "border-[2px] border-gray-200/40 rounded-xl px-4 py-2"
                  }
                  key={project.id}
                  {...project}
                />
              ))
            ) : (
              <p className={"font-sans text-base"}>No projects found.</p>
            )}
          </div>
        </div>
      </section>
    );

};

export default ProjectsBlock;
    