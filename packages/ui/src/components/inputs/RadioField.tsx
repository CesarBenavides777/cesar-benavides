"use client";;
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import { Label } from "@workspace/ui/components/label";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "@workspace/ui/hooks/useGravityForm";
import type {
  RadioField as RadioFieldType,
  FieldError,
} from "@workspace/ui/types/wp";

import type { JSX } from "react";

interface Props {
  field: RadioFieldType;
  fieldErrors: FieldError[];
  formId: string;
}

const DEFAULT_VALUE = "";

const RadioField = ({ field, fieldErrors, formId }: Props): JSX.Element => {
  const { id, type, label, description, cssClass, choices, databaseId } = field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId,
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;

  function handleChange(value: string) {
    dispatch({
      type: ACTION_TYPES.updateRadioFieldValue,
      fieldValue: {
        id: databaseId,
        value: value,
      },
    });
  }

  return (
    <div id={htmlId} className={`space-y-4 ${cssClass || ""}`.trim()}>
      <Label className="text-base font-semibold leading-7 text-foreground">
        {label}
      </Label>
      {/* @ts-expect-error */}
      <RadioGroup onValueChange={handleChange} defaultValue={value}>
        {choices?.map((input) => {
          const text = input?.text || "";
          const inputValue = input?.value || "";
          return (
            <div key={inputValue} className="flex items-center space-x-2">
              <RadioGroupItem
                // @ts-ignore
                value={inputValue}
                id={`choice_${formId}_${databaseId}_${inputValue}`}
              />
              <Label
                htmlFor={`choice_${formId}_${databaseId}_${inputValue}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {text}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {fieldErrors?.length > 0 && (
        <div className="mt-2">
          {fieldErrors.map((fieldError) => (
            <p key={fieldError.id} className="text-sm text-destructive">
              {fieldError.message}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default RadioField;
