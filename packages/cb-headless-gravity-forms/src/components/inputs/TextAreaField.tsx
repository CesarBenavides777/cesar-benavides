import type {
  TextAreaField as TextAreaFieldType,
  FieldError,
} from "@/types/wp.js";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "../../hooks/useGravityForm.js";

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
      <label
        className={`text-body mb-2 text-left font-body text-lg leading-5 text-gray-800 hidden`}
        htmlFor={htmlId}
      >
        {isRequired ? (
          <>
            {label}
            <sup className={`text-secondary`}>*</sup>
          </>
        ) : (
          label
        )}
      </label>
      <textarea
        name={String(databaseId)}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        className={`form-input[type='textarea'] min-h-[175px] w-full rounded-lg px-4 py-2 font-body text-gray-500 bg-gray-200`}
        placeholder={(isRequired ? `${label}*` : label) ?? ``}
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
