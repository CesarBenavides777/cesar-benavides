"use client";

import type { FieldError } from "@workspace/ui/types/wp";

import EmailField from "@workspace/ui/components/inputs/EmailField";
import PhoneField from "@workspace/ui/components/inputs/PhoneField";
import RadioField from "@workspace/ui/components/inputs/RadioField";
import TextAreaField from "@workspace/ui/components/inputs/TextAreaField";
import TextField from "@workspace/ui/components/inputs/TextField";
import WebsiteField from "@workspace/ui/components/inputs/WebsiteField";
import NumberField from "@workspace/ui/components/inputs/NumberField";
import FileUploadField from "@workspace/ui/components/inputs/FileUploadField";
import HTMLField from "@workspace/ui/components/inputs/HTMLField";
import ConsentField from "@workspace/ui/components/inputs/ConsentField";
import { Skeleton } from "@workspace/ui/components/skeleton";
import NameField from "@workspace/ui/components/inputs/NameField";

import dynamic from "next/dynamic";


interface Props {
  field: any;
  fieldErrors: FieldError[];
  formId: any;
}

const GravityFormsField = ({ field, fieldErrors, formId }: Props) => {
  switch (field?.type) {
    case "ADDRESS": {
      const AddressField = dynamic(
        () => import("@workspace/ui/components/inputs/AddressField"),
        {
          ssr: false,
          loading: () => (
            <div className={"flex flex-col gap-2"}>
              <Skeleton
                className={
                  "flex h-[60px] w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-xs"
                }
              />
              <Skeleton
                className={
                  "flex h-[60px] w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-xs"
                }
              />
              <Skeleton
                className={
                  "flex h-[60px] w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-xs"
                }
              />
            </div>
          ),
        }
      );

      return (
        <AddressField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    }
    case "CHECKBOX": {
      const CheckboxField = dynamic(
        () => import("@workspace/ui/components/inputs/CheckboxField"),
        {
          loading: () => (
            <div className={"flex flex-col gap-2"}>
              <Skeleton
                className={
                  "flex h-[60px] w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-xs"
                }
              />
            </div>
          ),
          ssr: false,
        }
      );

      return (
        <CheckboxField
          field={field}
          fieldErrors={fieldErrors}
          formId={formId}
        />
      );
    }
    case "DATE": {
      const DateField = dynamic(
        () => import("@workspace/ui/components/inputs/DateField"),
        {
          loading: () => (
            <div className={"flex flex-col gap-2"}>
              <Skeleton
                className={
                  "flex h-[60px] w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-xs"
                }
              />
            </div>
          ),
          ssr: false,
        }
      );

      return (
        <DateField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    }
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
        () => import("@workspace/ui/components/inputs/MultiSelectField"),
        {
          loading: () => (
            <div className={"flex flex-col gap-2"}>
              <Skeleton
                className={
                  "flex h-[60px] w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-xs"
                }
              />
            </div>
          ),
          ssr: false,
        }
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
    case "NAME": {

      return (
        <NameField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    }
    case "PHONE":
      return (
        <PhoneField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "RADIO":
      return (
        <RadioField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "SELECT": {
      const SelectField = dynamic(
        () => import("@workspace/ui/components/inputs/SelectField"),
        {
          loading: () => (
            <div className={"flex flex-col gap-2"}>
              <Skeleton
                className={
                  "flex h-[60px] w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-xs"
                }
              />
            </div>
          ),
          ssr: false,
        }
      );

      return (
        <SelectField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    }
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
