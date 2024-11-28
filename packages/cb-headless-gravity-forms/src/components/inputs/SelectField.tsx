// import { gql } from "@apollo/client";

import type { SelectField as SelectFieldType, FieldError } from "@/types/wp.js";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "../../hooks/useGravityForm.js";

interface Props {
  field: SelectFieldType;
  fieldErrors: FieldError[];
  formId: any;
}

export default function SelectField({ field, fieldErrors, formId }: Props) {
  const {
    id,
    type,
    label,
    description,
    cssClass,
    isRequired,
    defaultValue,
    choices,
    databaseId,
  } = field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || String(defaultValue);

  return (
    <div
      className={`gfield flex flex-col gap-2 gfield-${type} ${cssClass}`.trim()}
    >
      <label
        htmlFor={htmlId}
        className={`text-body mb-2 block text-left font-body text-lg leading-5 text-gray-800`}
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
      <select
        className={`ml-xs my-sm rounded-lg px-4 py-2`}
        name={String(databaseId)}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateSelectFieldValue,
            fieldValue: {
              id: databaseId,
              value: event.target.value,
            },
          });
        }}
      >
        {choices?.map((choice, i) => (
          <option
            key={`choice-${i}-${choice?.value}`}
            value={choice?.value || ""}
          >
            {choice?.text || ""}
          </option>
        ))}
      </select>
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
