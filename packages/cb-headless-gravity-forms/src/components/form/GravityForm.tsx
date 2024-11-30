"use client";

import type { GfForm as GravityFormsFormType, SubmitGfFormInput } from "@/types/wp.js";
import { GravityFormProvider } from "../../hooks/useGravityForm.js";
import "../../styles/globals.css";
import { Toaster } from "sonner";
import type { ToasterProps } from "sonner";

import GravityFormsForm from "./GravityFormsForm.js";

interface Props {
  form: GravityFormsFormType;
  formId?: number | string;
  showTitle?: boolean;
  submitForm: (formData: SubmitGfFormInput) => Promise<any>;
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
      {useToast && <Toaster {...toastProps} />}
    </GravityFormProvider>
  );
};

export default GravityForm;
