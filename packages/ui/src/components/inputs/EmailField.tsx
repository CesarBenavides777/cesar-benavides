import type { EmailField as EmailFieldType, FieldError } from "@workspace/ui/types/wp.js";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  EmailFieldValue,
} from "../../hooks/useGravityForm.js";
import { Label } from "@workspace/ui/components/label.js";
import { Input } from "@workspace/ui/components/input.js";

interface Props {
  field: EmailFieldType;
  fieldErrors: FieldError[];
  formId: any;
}

const DEFAULT_VALUE = "";

export default function EmailField({ field, fieldErrors, formId }: Props) {
  const { id, type, label, description, cssClass, isRequired, placeholder, databaseId } =
    field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId,
  ) as EmailFieldValue | undefined;
  const value = fieldValue?.emailValues?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield gfield-${type} ${cssClass ?? ""}`.trim()}>
      <Label htmlFor={htmlId}>
        {isRequired ? (
          <>
            {label}
            <sup className={`text-red-500`}>*</sup>
          </>
        ) : (
          label
        )}
      </Label>
      <Input 
        type="email"
        name={String(databaseId)}
        id={htmlId}
        className={`form-input[type='email'] font-sans`}
        required={Boolean(isRequired)}
        placeholder={placeholder || isRequired ? `${label}*` : label || ""}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateEmailFieldValue,
            fieldValue: {
              id: databaseId,
              emailValues: {
                value: event.target.value,
              },
            },
          });
        }}
      />
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length
        ? fieldErrors.map((fieldError) => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </div>
  );
}
