"use client";

import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  CheckboxFieldValue,
} from "@workspace/ui/hooks/useGravityForm";
import type {
  CheckboxField as CheckboxFieldType,
  CheckboxFieldInput as CheckboxInput,
  FieldError,
} from "@workspace/ui/types/wp";

interface Props {
  field: CheckboxFieldType;
  fieldErrors: FieldError[];
  formId?: number;
}

const DEFAULT_VALUE: CheckboxInput[] = [];

const CheckboxField = ({ field, fieldErrors, formId }: Props): JSX.Element => {
  const {
    id,
    databaseId,
    type,
    label,
    description,
    cssClass,
    inputs,
    choices,
    isRequired,
  } = field;
  const checkboxInputs =
    choices?.map((choice, index) => ({ ...choice, id: inputs?.[index]?.id })) ||
    [];
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId
  ) as CheckboxFieldValue | undefined;
  const checkboxValues = fieldValue?.checkboxValues || DEFAULT_VALUE;

  function handleChange(inputId: number, checked: boolean, value: string) {
    const otherCheckboxValues = checkboxValues.filter(
      (checkboxValue: CheckboxInput) => checkboxValue.inputId !== inputId
    );
    const newCheckboxValues = checked
      ? [...otherCheckboxValues, { inputId, value }]
      : otherCheckboxValues;

    dispatch({
      type: ACTION_TYPES.updateCheckboxFieldValue,
      fieldValue: {
        id: databaseId,
        checkboxValues: newCheckboxValues,
      },
    });
  }

  return (
    <fieldset id={htmlId} className={`space-y-4 ${cssClass || ""}`.trim()}>
      <legend className="text-base font-semibold leading-7 text-foreground">
        {label}
        {isRequired && <span className="text-destructive ml-1">*</span>}
      </legend>
      <div className="space-y-2">
        {checkboxInputs.map(({ id: inputId, text, value }, i) => (
          <div key={`${inputId}_${i}`} className="flex items-center space-x-2">
            <Checkbox
              // @ts-ignore
              id={`input_${formId}_${id}_${inputId}`}
              name={String(inputId)}
              value={String(value)}
              onCheckedChange={(checked) => {
                if (checked === undefined) return;

                handleChange(Number(inputId), checked as boolean, String(value));
              }
              }
            />
            <Label
              htmlFor={`input_${formId}_${id}_${inputId}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {text}
            </Label>
          </div>
        ))}
      </div>
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
    </fieldset>
  );
}

export default CheckboxField;