"use client";

import type { PageContentBlocksRichContentLayout } from "@workspace/ui/types/wp";
import { cn } from "@workspace/ui/lib/utils";
import parse, { domToReact, Element } from "html-react-parser";
import { CodeBlock } from "@workspace/ui/components/code-block";
import { Button } from "@workspace/ui/components/button";

type RichContentProps = PageContentBlocksRichContentLayout & {
  className?: string;
};

const RichContent: React.FC<RichContentProps> = ({
  className,
  mainTitle,
  paragraphs,
  lineSeparated,
}) => {
  // A function to parse and render content
  const renderContent = (html: string) => {
    return parse(html, {
      replace: (domNode: any) => {
        if (domNode instanceof Element) {
          // Handle <code> elements explicitly
          if (domNode.tagName === "code") {
            // Determine language from class attribute
            const languageClass = domNode.attribs.class || "";
            let language = "";

            if (languageClass.includes("json")) language = "json";
            else if (languageClass.includes("python")) language = "python";
            else if (languageClass.includes("typescript"))
              language = "typescript";

            // Extract the code content
            const codeContent = domNode.children
              .map((child) => (child.type === "text" ? child.data : ""))
              .join("");
            // Extract Code Filename from data-filename="platform.ts" on <code> element
            const filename = domNode.attribs["data-filename"];

            return (
              <CodeBlock
                language={language || "plaintext"}
                code={codeContent}
                filename={filename || ""}
              />
            );
          }

          // Avoid wrapping <code> inside <p>
          if (
            domNode.tagName === "p" &&
            domNode.children.some(
              (child) =>
                child instanceof Element &&
                (child.tagName === "code" || child.tagName === "pre"),
            )
          ) {
            return <>{domToReact(domNode.children)}</>;
          }
        }
      },
    });
  };

  return (
    <section className={cn("px-2 md:px-4 py-3 md:py-4", className)}>
      {mainTitle && (
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground">
          {mainTitle}
        </h2>
      )}
      <div className="content-wrapper flex flex-col gap-8 py-6">
        {paragraphs &&
          paragraphs.map(({ title, content, cta }, index) => {
            const { title: ctaTitle, url } = cta || {};
            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-4",
                  lineSeparated ? "border-b border-foreground/20 pb-4" : ""
                )}
              >
                {title && (
                  <h3 className="font-sans text-xl md:text-2xl font-semibold">
                    {title}
                  </h3>
                )}
                {content && (
                  <div className="font-sans text-sm md:text-base lg:text-lg content-wrapper w-full text-foreground">
                    {renderContent(content)}
                  </div>
                )}
                {cta && (
                  <Button
                    variant="outline"
                    href={url}
                    target="_blank"
                    className="w-fit"
                    style={{ textDecoration: "none" }}
                  >
                    {ctaTitle}
                  </Button>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default RichContent;
