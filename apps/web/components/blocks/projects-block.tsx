"use client";

import { cn } from "@/lib/utils";
import type { PageContentBlocksProjectsBlockLayout, Project } from "@/types/wp";
import { Sparkles } from "lucide-react";
import DisplayCards from "@workspace/ui/components/display-cards";
import { FaWordpress } from "react-icons/fa";
import {
  SiTurborepo,
  SiHomebridge,
  SiShadcnui,
  SiGatsby,
  SiContentful,
  SiStrapi,
  SiGraphql,
  SiTypescript,
  SiPython
} from "react-icons/si";
import { useState } from "react";
import { Button } from "@workspace/ui/components/button";

type ProjectsBlockProps = PageContentBlocksProjectsBlockLayout & {
  className?: string;
  id?: string;
};


const icons = {
  typescript: <SiTypescript className="size-4 text-blue-300" />,
  graphql: <SiGraphql className="size-4 text-blue-300" />,
  strapi: <SiStrapi className="size-4 text-blue-300" />,
  contentful: <SiContentful className="size-4 text-blue-300" />,
  gatsby: <SiGatsby className="size-4 text-blue-300" />,
  homebridge: <SiHomebridge className="size-4 text-blue-300" />,
  shadcnui: <SiShadcnui className="size-4 text-blue-300" />,
  turborepo: <SiTurborepo className="size-4 text-blue-300" />,
  wordpress: <FaWordpress className="size-4 text-blue-300" />,
  python: <SiPython className="size-4 text-blue-300" />,
};

const calculateOffset = (index: number, totalItems: number) => {
  const map: { [key: number]: { xOffset: string; yOffset: string } } = {
    0: { xOffset: "translate-x-[0rem] z-[0]", yOffset: "translate-y-[0rem]" },
    1: { xOffset: "translate-x-[3rem] z-[1]", yOffset: "translate-y-[2rem]" },
    2: { xOffset: "translate-x-[6rem] z-[2]", yOffset: "translate-y-[4rem]" },
    3: { xOffset: "translate-x-[9rem] z-[3]", yOffset: "translate-y-[6rem]" },
    4: { xOffset: "translate-x-[12rem] z-[4]", yOffset: "translate-y-[8rem]" },
    5: { xOffset: "translate-x-[15rem] z-[5]", yOffset: "translate-y-[10rem]" },
    6: { xOffset: "translate-x-[18rem] z-[6]", yOffset: "translate-y-[12rem]" },
    7: { xOffset: "translate-x-[21rem] z-[7]", yOffset: "translate-y-[14rem]" },
    8: { xOffset: "translate-x-[24rem] z-[8]", yOffset: "translate-y-[16rem]" },
  };
  return {
    xOffset: map[index]?.xOffset || 0,
    yOffset: map[index]?.yOffset || 0,
  };
};

const ProjectsBlock: React.FC<ProjectsBlockProps> = ({
  projectItems,
  className,
  id,
}: ProjectsBlockProps) => {
  const hasProjects = projectItems && projectItems.edges.length > 0;
  const [isActive, setIsActive] = useState(false);

  const projects = projectItems?.edges.map(
    (project) => project.node,
  ) as Project[];

  return (
    <section
      className={cn(
        "flex flex-col py-6 max-w-full relative", //
        className,
        {
          "overflow-auto": isActive,
        }
      )}
      id={id}
    >
      <div className={"flex flex-row gap-4 items-center justify-between py-4"}>
        <h2 className={"font-sans text-3xl md:text-4xl font-bold"}>Projects</h2>
        {isActive && (
          <Button
            className={"text-xs"}
            onClick={() => setIsActive(false)}
            variant={"default"}
          >
            Put Away
          </Button>
        )}
      </div>
      <div
        className={"flex flex-col gap-4 relative"}
        onMouseEnter={() => setIsActive(true)}
      >
        {hasProjects && (
          <DisplayCards
            className={cn(
              // "opacity-100 animate-in fade-in-0 duration-700",
              "transition-all duration-700 py-12",
              {
                "grid [grid-template-areas:'stack'] place-items-start":
                  !isActive,
                "grid grid-cols-1 md:grid-cols-3 gap-2": isActive,
              }
            )}
            active={isActive}
            cards={[
              ...projects.map((project, i) => {
                const { xOffset, yOffset } = calculateOffset(
                  i,
                  projects.length
                );
                const { projectTags } = project as Project;

                return {
                  icon: <Sparkles className="size-4 text-blue-300" />,
                  title: project.title || "",
                  description: project.excerpt || "",
                  date: project.date || "",
                  className: cn(
                    // Core layout and positioning
                    "flex group relative flex-col justify-between px-4 py-3 min-w-[10rem]",
                    "rounded-xl",

                    // Background and border styles
                    "border-2 bg-muted/70 backdrop-blur-sm overflow-clip",
                    "hover:bg-muted hover:border-white/20",

                    // Transition and animation
                    "transition-all duration-700 hover:-translate-y-1 hover:z-10",
                    "hover:mb-auto hover:focus hover:grayscale-0",
                    "max-h-fit",

                    // Grayscale and overlay effects
                    "grayscale-[100%]",
                    "before:absolute before:w-[100%] before:h-[100%] before:content-['']",
                    "before:rounded-xl before:outline-1 before:outline-border before:bg-blend-overlay before:bg-background/20",
                    "before:transition-opacity before:duration-700 hover:before:opacity-0",
                    "before:left-0 before:top-0",

                    // After pseudo-element for gradient effect
                    // "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[10rem]",
                    // "after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']",

                    // Children styles
                    "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
                    // Turn off skew on hover
                    "hover:skew-y-0",
                    // Dynamic offsets
                    isActive ? "" : `${xOffset} ${yOffset}`,
                    {
                      "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[10rem] [grid-area:stack]  after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] select-none -skew-y-[8deg] min-h-32 md:max-w-[22rem]":
                        !isActive,
                      "min-w-[6rem] min-h-52": isActive,
                    }
                  ),
                };
              }),
            ]}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectsBlock;
