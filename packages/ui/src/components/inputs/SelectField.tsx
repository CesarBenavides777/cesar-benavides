"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Label } from "@workspace/ui/components/label";
import type { SelectField as SelectFieldType, FieldError } from "@workspace/ui/types/wp";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "@workspace/ui/hooks/useGravityForm";

interface Props {
  field: SelectFieldType;
  fieldErrors: FieldError[];
  formId: any;
}

export default function SelectField({ field, fieldErrors, formId }: Props) {
  const {
    id,
    type,
    label,
    description,
    cssClass,
    isRequired,
    defaultValue,
    choices,
    databaseId,
  } = field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || String(defaultValue);

  return (
    <div className={`space-y-2 ${cssClass}`}>
      <Label htmlFor={htmlId}>
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select
        name={String(databaseId)}
        value={value}
        onValueChange={(newValue) => {
          dispatch({
            type: ACTION_TYPES.updateSelectFieldValue,
            fieldValue: {
              id: databaseId,
              value: newValue,
            },
          });
        }}
      >
        {/* @ts-ignore */}
        <SelectTrigger id={htmlId} className="bg-background">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        {/* @ts-ignore */}
        <SelectContent className="bg-background">
          {choices?.map((choice, i) => (
            // @ts-ignore
            <SelectItem
              key={`choice-${i}-${choice?.value}`}
              value={choice?.value || ""}
            >
              {choice?.text || ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {description && <p className="text-xs">{description}</p>}
      {fieldErrors?.map((fieldError) => (
        <p key={fieldError.id} className="text-sm text-red-500">
          {fieldError.message}
        </p>
      ))}
    </div>
  );
}
