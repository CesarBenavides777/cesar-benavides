
import { Input } from "@/src/components/input.js";
import { Label } from "@/src/components/label.js";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "../../hooks/useGravityForm.js";
import type { FieldError, NumberField as NumberFieldType } from "@/src/types/wp.js";

interface Props {
  field: NumberFieldType;
  fieldErrors: FieldError[];
  formId: any;
}

const DEFAULT_VALUE = "";

const NumberField = ({ field, fieldErrors, formId }: Props) => {
  const {
    id,
    type,
    label,
    description,
    cssClass,
    isRequired,
    placeholder,
    databaseId,
  } = field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div className={`space-y-2 ${cssClass || ""}`.trim()}>
      {label && (
        <Label
          htmlFor={htmlId}
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {isRequired && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Input
        type="number"
        pattern="[0-9]*"
        name={String(databaseId)}
        id={htmlId}
        required={isRequired || false}
        placeholder={placeholder || (isRequired ? `${label}*` : label) || ""}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateNumberFieldValue,
            fieldValue: {
              id: databaseId,
              value: event.target.value,
            },
          });
        }}
        className="w-full"
      />
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
}

export default NumberField;