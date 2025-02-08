"use client";

import type { FieldError } from "@workspace/ui/types/wp";

import AddressField from "@workspace/ui/components/inputs/AddressField";
import CheckboxField from "@workspace/ui/components/inputs/CheckboxField";
import DateField from "@workspace/ui/components/inputs/DateField";
import EmailField from "@workspace/ui/components/inputs/EmailField";
// import MultiSelectField from "@workspace/ui/components/inputs/MultiSelectField";
import NameField from "@workspace/ui/components/inputs/NameField";
import PhoneField from "@workspace/ui/components/inputs/PhoneField";
import RadioField from "@workspace/ui/components/inputs/RadioField";
import SelectField from "@workspace/ui/components/inputs/SelectField";
import TextAreaField from "@workspace/ui/components/inputs/TextAreaField";
import TextField from "@workspace/ui/components/inputs/TextField";
import WebsiteField from "@workspace/ui/components/inputs/WebsiteField";
import NumberField from "@workspace/ui/components/inputs/NumberField";
import FileUploadField from "@workspace/ui/components/inputs/FileUploadField";
import HTMLField from "@workspace/ui/components/inputs/HTMLField";
import ConsentField from "@workspace/ui/components/inputs/ConsentField";

import dynamic from "next/dynamic";


interface Props {
  field: any;
  fieldErrors: FieldError[];
  formId: any;
}

const GravityFormsField = ({ field, fieldErrors, formId }: Props) => {
  switch (field?.type) {
    case "ADDRESS":
      return (
        <AddressField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "CHECKBOX":
      return (
        <CheckboxField
          field={field}
          fieldErrors={fieldErrors}
          formId={formId}
        />
      );
    case "DATE":
      return (
        <DateField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "EMAIL":
      return (
        <EmailField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "NUMBER":
      return (
        <NumberField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "MULTISELECT": {
      const MultiSelectField = dynamic(
        () => import("@workspace/ui/components/inputs/MultiSelectField")
      );
      return (
        <MultiSelectField
          field={field}
          fieldErrors={fieldErrors}
          formId={formId}
        />
      );
    }
    case "CONSENT":
      return (
        <ConsentField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "CAPTCHA":{
      // Loaded in dynamically for speed
      const CaptchaField = dynamic(
        () => import("@workspace/ui/components/inputs/CaptchaField")
      );
      
      return (
        <CaptchaField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    }
    case "NAME":
      return field ? (
        <NameField field={field} fieldErrors={fieldErrors} formId={formId} />
      ) : null;
    case "PHONE":
      return (
        <PhoneField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "RADIO":
      return (
        <RadioField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "SELECT":
      return (
        <SelectField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "TEXT":
      return (
        <TextField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "HTML":
      return (
        <HTMLField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "TEXTAREA":
      return (
        <TextAreaField
          field={field}
          fieldErrors={fieldErrors}
          formId={formId}
        />
      );
    // case 'time':
    //   return <TimeField field={field} fieldErrors={fieldErrors} />
    case "FILEUPLOAD":
      return (
        <FileUploadField
          field={field}
          fieldErrors={fieldErrors}
          formId={formId}
        />
      );
    case "WEBSITE":
      return (
        <WebsiteField field={field} fieldErrors={fieldErrors} formId={formId} />
      );

    default:
      return null;
  }
};

export default GravityFormsField;
