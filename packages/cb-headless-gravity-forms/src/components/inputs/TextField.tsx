import type { FieldError, TextField as TextFieldType } from "@/types/wp.js";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "../../hooks/useGravityForm.js";
import { gql } from "@apollo/client";

export const TEXT_FIELD_FIELDS = gql`
  fragment TextFieldFields on TextField {
    id
    databaseId
    label
    description
    cssClass
    isRequired
    placeholder
  }
`;

interface Props {
  field: TextFieldType;
  fieldErrors: FieldError[];
  formId: any;
}

const DEFAULT_VALUE = "";

export default function TextField({ field, fieldErrors, formId }: Props) {
  const { id, type, label, description, cssClass, isRequired, placeholder, databaseId } =
    field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label
        className={`text-body mb-2 block text-left font-body text-lg leading-5 text-gray-800`}
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
        type="text"
        name={String(databaseId)}
        id={htmlId}
        className={`form-input[type='text'] w-full rounded-lg px-4 py-2 font-body text-gray-700`}
        required={Boolean(isRequired)}
        placeholder={placeholder || isRequired ? `${label}*` : label || ""}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateTextFieldValue,
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
