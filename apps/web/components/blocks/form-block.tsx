"use client";

import { cn } from "@/lib/utils";
import type { GfForm, PageContentBlocksFormblockLayout } from "@/types/wp";
import GravityForm from "@workspace/ui/components/form/GravityForm";
import { submitForm } from "./form-action/action";

type FormBlockProps = PageContentBlocksFormblockLayout & {
  form?: GfForm;
};


const FormBlock: React.FC<FormBlockProps> = ({
  form,
  wrapperClassNames,
  showTitle,
  showDescription,
}) => {

  return (
    <section
      className={cn(
        "px-2 md:px-4 py-6 md:py-12",
        wrapperClassNames,
      )}
    >
      <div className="max-w-xl mx-auto">
        <GravityForm
          form={form as GfForm}
          formId={form?.databaseId}
          showTitle={showTitle ?? true}
          submitForm={submitForm}
          useToast
          styled
          toastProps={{
            richColors: true,
            position: "bottom-center",
          }}
        />
      </div>
    </section>
  );
};

export default FormBlock;
