import type { FieldError } from "@workspace/ui/types/wp";
import useGravityForm, {
  ACTION_TYPES,
} from "@workspace/ui/hooks/useGravityForm";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";

interface Props {
  field: any;
  fieldErrors: FieldError[];
  formId: string;
}

import React from "react";

export default function FileUploadField({
  field,
  fieldErrors,
  formId,
}: Props): React.ReactElement<any> {
  const { id, type, label, description, cssClass, isRequired, databaseId } =
    field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { dispatch } = useGravityForm();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Capture the first file

    if (file) {
      // Debugging: Log the captured file
      dispatch({
        type: ACTION_TYPES.updateFileUploadFieldValue,
        fieldValue: {
          id: databaseId,
          fileUploadValues: [file], // Pass the File object
        },
      });
    } else {
      console.error("No file selected or file input is empty");
    }
  };

  return (
    <fieldset
      id={htmlId}
      className={`gfield flex w-full flex-col justify-center gap-1 gfield-${type} ${
        cssClass ?? ""
      }`.trim()}
    >
      {label && (
        <Label htmlFor={htmlId}>
          {isRequired ? (
            <>
              {label}
              <sup className={`text-secondary`}>*</sup>
            </>
          ) : (
            label
          )}
        </Label>
      )}

      <Input
        type="file"
        name={String(databaseId)}
        id={`input_${formId}_${databaseId}`}
        required={Boolean(isRequired)}
        onChange={handleFileChange}
      />

      {description ? (
        <p className="text-left font-body text-sm text-gray-500">
          {description}
        </p>
      ) : null}
      {fieldErrors?.length
        ? fieldErrors.map((fieldError) => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </fieldset>
  );
}
