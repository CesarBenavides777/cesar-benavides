import type { PhoneField as PhoneFieldType, FieldError } from "@/types/wp.js";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "../../hooks/useGravityForm.js";

interface Props {
  field: PhoneFieldType;
  fieldErrors: FieldError[];
  formId: string;
}

const DEFAULT_VALUE = "";

export default function PhoneField({ field, fieldErrors, formId }: Props) {
  const { id, type, label, description, cssClass, isRequired, placeholder, databaseId } =
    field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId,
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label
        className={`text-body mb-2text-left font-body text-lg leading-5 text-gray-800 hidden`}
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
      <input
        type="tel"
        name={String(databaseId)}
        className={`form-input[type='tel'] w-full rounded-full px-4 py-2 font-body text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-200`}
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder || isRequired ? `${label}*` : label || ""}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updatePhoneFieldValue,
            fieldValue: {
              id: databaseId,
              value: event.target.value,
            },
          });
        }}
      />
      {description ? (
        <p className="field-description font-body text-sm italic">
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
