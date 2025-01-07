import type { FieldError } from "@/src/types/wp.js";

import AddressField from "../inputs/AddressField.js";
import CheckboxField from "../inputs/CheckboxField.js";
import DateField from "../inputs/DateField.js";
import EmailField from "../inputs/EmailField.js";
import MultiSelectField from "../inputs/MultiSelectField.js";
import NameField from "../inputs/NameField.js";
import PhoneField from "../inputs/PhoneField.js";
import RadioField from "../inputs/RadioField.js";
import SelectField from "../inputs/SelectField.js";
import TextAreaField from "../inputs/TextAreaField.js";
import TextField from "../inputs/TextField.js";
import WebsiteField from "../inputs/WebsiteField.js";
import NumberField from "../inputs/NumberField.js";
import FileUploadField from "../inputs/FileUploadField.js";
import HTMLField from "../inputs/HTMLField.js";
import CaptchaField from "../inputs/CaptchaField.js";
import ConsentField from "../inputs/ConsentField.js";

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
    case "MULTISELECT":
      return (
        <MultiSelectField
          field={field}
          fieldErrors={fieldErrors}
          formId={formId}
        />
      );
    case "CONSENT":
      return (
        <ConsentField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
    case "CAPTCHA":
      return (
        <CaptchaField field={field} fieldErrors={fieldErrors} formId={formId} />
      );
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
