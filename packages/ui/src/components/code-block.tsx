"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Check, Copy, ExternalLink } from "lucide-react";


type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
  source?: string;
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

  return (
    <div className="relative w-full rounded-lg bg-slate-900 p-4 font-mono text-sm">
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
                className={`px-3 !py-2 text-xs transition-colors font-sans ${
                  activeTab === index
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        <SyntaxHighlighter
          language={activeLanguage}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: 0,
            background: "transparent",
            fontSize: "0.875rem",
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
  );
};
