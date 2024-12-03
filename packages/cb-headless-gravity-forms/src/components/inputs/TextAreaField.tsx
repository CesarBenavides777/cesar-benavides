import type {
  TextAreaField as TextAreaFieldType,
  FieldError,
} from "@/types/wp.js";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "../../hooks/useGravityForm.js";
import { Textarea } from "../ui/textarea.js";
import { Label } from "../ui/label.js";

interface Props {
  field: TextAreaFieldType;
  fieldErrors: FieldError[];
  formId: string;
}

const DEFAULT_VALUE = "";

export default function TextAreaField({ field, fieldErrors, formId }: Props) {
  const { id, type, label, description, cssClass, isRequired, databaseId } = field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId,
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
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
      <Textarea
        name={String(databaseId)}
        id={htmlId}
        className={`form-input[type='text'] font-sans`}
        required={Boolean(isRequired)}
        placeholder={(isRequired ? `${label}*` : label) ?? ``}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateTextAreaFieldValue,
            fieldValue: {
              id: databaseId,
              value: event.target.value,
            },
          });
        }}
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
    </div>
  );
}
