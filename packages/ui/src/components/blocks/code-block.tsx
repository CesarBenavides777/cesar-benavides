import { PageContentBlocksCodeBlockLayout } from "@workspace/ui/types/wp";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { cn } from "@workspace/ui/lib/utils";
import { CodeBlock as Coder } from "@workspace/ui/components/code-block";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";

type CodeBlockProps = PageContentBlocksCodeBlockLayout & {
  className?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({
  files,
  className,
  mainTitle,
  accordion,
}: CodeBlockProps) => {
  const hasFiles = files && files.length > 0;

  const codeContent = (
    <Coder
      code={files?.[0]?.code || ""}
      tabs={files?.map((file) => ({
        name: file.filename,
        code: file.code,
        language: file.language[0],
        source: file.source.url,
      }))}
    />
  );

  return (
    <section className={cn("px-2 md:px-4 py-3 md:py-4", className)}>
      {hasFiles && accordion ? (
        <Accordion type="single" collapsible>
          <AccordionItem value="code-section">
            <AccordionTrigger>
                {mainTitle || "View Code"}
            </AccordionTrigger>
            <AccordionContent>{codeContent}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        hasFiles && codeContent
      )}
    </section>
  );
};

export default CodeBlock;
