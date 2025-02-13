"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Check, Copy, ExternalLink } from "lucide-react";
import "@workspace/ui/styles/synthwave.css";


type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
  source?: string;
  title?: string;
  description?: string;
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
        source?: string;
        title?: string;
        description?: string;
      }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  source,
  code,
  highlightLines = [],
  tabs = [],
  title,
  description
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const tabsExist = tabs.length > 0;

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;
  const activeSource = tabsExist ? tabs[activeTab].source || source : source;
  const isBash = activeLanguage === "bash";

  return (
    <div className={"relative flex flex-col gap-2 w-full"}>
      {title && (
        <h3 className="font-sans text-xl md:text-2xl font-semibold">{title}</h3>
      )}
      {description && (
        <div
          className="font-sans text-sm md:text-base lg:text-lg content-wrapper w-full text-foreground relative max-w-full overflow-clip pb-4"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      <div className="relative w-full rounded-lg bg-[rgba(40,33,55)] p-4 font-mono text-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end gap-2 md:absolute right-6 top-6">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy code
                </>
              )}
            </button>
            {activeSource && (
              <a
                href={activeSource}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                See source
              </a>
            )}
          </div>
          {tabsExist && (
            <div className="flex overflow-x-auto">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 text-xs transition-colors font-sans flex items-center ${
                    activeTab === index
                      ? "text-white bg-[#1e1e1e] rounded-t-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {/* <File className="w-3 h-3 mr-2" /> */}
                  {tab.name}
                </button>
              ))}
            </div>
          )}
          <SyntaxHighlighter
            language={activeLanguage}
            style={"@workspace/ui/styles/synthwave.css"}
            customStyle={{
              margin: 0,
              padding: 0,
              fontSize: "0.875rem",
              background: "rgba(40,33,55)",
              overflowX: "auto",
            }}
            wrapLines={true}
            showLineNumbers={true}
            lineProps={(lineNumber) => ({
              style: {
                backgroundColor: activeHighlightLines.includes(lineNumber)
                  ? "rgba(255,255,255,0.1)"
                  : "transparent",
                display: "block",
                width: "100%",
              },
            })}
            PreTag="div"
          >
            {String(activeCode)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};
