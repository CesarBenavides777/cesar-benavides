"use client";

import type { GfForm as GravityFormsFormType } from "@workspace/ui/types/wp.js";

import { Toaster } from "sonner";
import type { ToasterProps } from "sonner";

import GravityFormsForm from "./GravityFormsForm.js";
import { GravityFormProvider } from "@workspace/ui/hooks/useGravityForm.js";

interface Props {
  form: GravityFormsFormType;
  formId?: number | string;
  showTitle?: boolean;
  submitForm: (prevData: any, data: FormData) => Promise<any>;
  useToast?: boolean;
  toastProps?: ToasterProps;
  styled?: boolean;
}

const GravityForm = ({ 
  form, 
  formId, 
  showTitle = true, 
  submitForm,
  useToast = true,
  styled = true,
  toastProps = {
    position: "bottom-center",
  },
}: Props) => {
  return (
    <GravityFormProvider>
      <GravityFormsForm
        form={form}
        formId={formId}
        showTitle={showTitle}
        submitForm={submitForm}
        useToast={useToast}
        styled={styled}
      />
      {/* @ts-ignore */}
      {useToast && <Toaster {...toastProps} />}
    </GravityFormProvider>
  );
};

export default GravityForm;