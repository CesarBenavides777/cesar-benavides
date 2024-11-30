"use client";

import { cn } from "@/lib/utils";
import type { GfForm, PageContentBlocksFormblockLayout } from "@/types/wp";
import { GravityForm } from "@repo/cb-headless-gravity-forms";
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
        "border-[2px] border-gray-200/40",
        "rounded-xl",
        wrapperClassNames
      )}
    >
      <GravityForm 
        form={form} 
        showTitle={showTitle} 
        submitForm={submitForm}
        useToast
        styled
        toastProps={{
          richColors: true,
          position: "bottom-center",
        }}
      />
    </section>
  );
};

export default FormBlock;
