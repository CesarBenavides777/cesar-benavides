// import { gql } from "@apollo/client";

import type { EmailField as EmailFieldType, FieldError } from "@/types/wp.js";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  EmailFieldValue,
} from "../../hooks/useGravityForm.js";

// export const EMAIL_FIELD_FIELDS = gql`
//   fragment EmailFieldFields on EmailField {
//     id
//     formId
//     label
//     description
//     cssClass
//     isRequired
//     placeholder
//   }
// `;

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
      <input
        type="email"
        name={String(databaseId)}
        className={`form-input[type='email'] w-full rounded-full px-4 py-2 font-body bg-gray-200`}
        id={htmlId}
        placeholder={field?.isRequired ? `${label}*` : label || ""}
        required={isRequired || false}
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
