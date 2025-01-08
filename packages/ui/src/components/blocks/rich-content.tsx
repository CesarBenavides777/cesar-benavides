"use client";

import type { PageContentBlocksRichContentLayout } from "@workspace/ui/types/wp";
import { cn } from "@workspace/ui/lib/utils";
// @ts-ignore
import SyntaxHighlighter from "react-syntax-highlighter";
// @ts-ignore
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import parse, { domToReact, Element } from "html-react-parser";
import { CopyButton } from "../copy-button.js";

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

          return (
            <div className={"w-full relative max-h-96 overflow-scroll"}>
              <SyntaxHighlighter
                language={language || "plaintext"}
                style={atomOneDark}
                customStyle={{
                  display: "block",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  borderRadius: "4px",
                  background: "#2d2d2d",
                  color: "#f8f8f2",
                  zIndex: 1,
                }}
              >
                {codeContent}
              </SyntaxHighlighter>
              <CopyButton 
                value={codeContent} 
                className="absolute top-4 right-4"
              />
            </div>
          );
        }

        // Avoid wrapping <code> inside <p>
        if (
          domNode.tagName === "p" &&
          domNode.children.some(
            (child) =>
              child instanceof Element &&
              (child.tagName === "code" || child.tagName === "pre")
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
          paragraphs.map(({ title, content }, index) => (
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
            </div>
          ))}
      </div>
    </section>
  );
};

export default RichContent;
