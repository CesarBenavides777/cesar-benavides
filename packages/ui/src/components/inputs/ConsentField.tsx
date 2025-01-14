"use client";

import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  ConsentFieldValue,
} from "@workspace/ui/hooks/useGravityForm";
import type {
  ConsentField as ConsentFieldType,
  FieldError,
} from "@workspace/ui/types/wp";

interface Props {
  field: ConsentFieldType;
  fieldErrors: FieldError[];
  formId?: number;
}

const ConsentField: React.FC<Props> = ({
  field,
  fieldErrors,
  formId,
}: Props) => {
  const {
    id,
    databaseId,
    type,
    label,
    description,
    cssClass,
    checkboxLabel,
    isRequired,
    descriptionPlacement,
    errorMessage,
  } = field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId,
  ) as ConsentFieldValue | undefined;
  const isChecked = fieldValue?.value === "true" ? true : false;

  function handleChange(checked: boolean) {
    dispatch({
      type: ACTION_TYPES.updateConsentFieldValue,
      fieldValue: {
        id: databaseId,
        value: checked.toString(),
      },
    });
  }

  return (
    <fieldset id={htmlId} className={`space-y-4 ${cssClass || ""}`.trim()}>
      {label && (
        <legend className="text-base font-semibold leading-7 text-foreground">
          {label}
          {isRequired && <span className="text-destructive ml-1">*</span>}
        </legend>
      )}
      {/* @ts-ignore */}
      {descriptionPlacement === "above" && description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <div className="flex items-center space-x-2">
        <Checkbox
          // @ts-ignore
          id={`input_${formId}_${id}`}
          name={String(databaseId)}
          checked={isChecked}
          onCheckedChange={(checked) => {
            if (checked === undefined) return;
            handleChange(checked as boolean);
          }}
        />
        <Label
          htmlFor={`input_${formId}_${databaseId}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {checkboxLabel}
        </Label>
      </div>
      {/* @ts-ignore */}
      {descriptionPlacement !== "above" && description && (
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
};

export default ConsentField;
