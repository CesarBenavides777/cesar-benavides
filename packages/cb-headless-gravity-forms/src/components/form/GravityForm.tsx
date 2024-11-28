"use client";

import type { GfForm as GravityFormsFormType, SubmitGfFormInput } from "@/types/wp.js";
import { GravityFormProvider } from "../../hooks/useGravityForm.js";
import "../../styles/globals.css";

import GravityFormsForm from "./GravityFormsForm.js";

interface Props {
  form: GravityFormsFormType;
  formId?: number | string;
  showTitle?: boolean;
  submitForm: (formData: SubmitGfFormInput) => Promise<any>;
}

const GravityForm = ({ form, formId, showTitle = true, submitForm }: Props) => {
  return (
    <GravityFormProvider>
      <GravityFormsForm
        form={form}
        formId={formId}
        showTitle={showTitle}
        submitForm={submitForm}
      />
    </GravityFormProvider>
  );
};

export default GravityForm;
