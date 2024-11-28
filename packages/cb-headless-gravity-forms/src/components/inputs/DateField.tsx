import { gql } from "@apollo/client";

import type { DateField as DateFieldType, FieldError } from "@/types/wp.js";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "../../hooks/useGravityForm.js";

export const DATE_FIELD_FIELDS = gql`
  fragment DateFieldFields on DateField {
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
  field: DateFieldType;
  fieldErrors: FieldError[];
  formId: string;
}

const DEFAULT_VALUE = "";

export default function DateField({ field, fieldErrors, formId }: Props) {
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
        type="date"
        name={String(databaseId)}
        id={htmlId}
        className={`form-input[type='date'] w-full rounded-lg px-4 py-2 font-body text-gray-400`}
        required={Boolean(isRequired)}
        placeholder={field?.isRequired ? `${label}*` : label || ""}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateDateFieldValue,
            fieldValue: {
              id,
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
