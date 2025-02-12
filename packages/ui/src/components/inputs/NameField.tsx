import type {
  NameField as NameFieldType,
  NameFieldInput,
  FieldError,
} from "@workspace/ui/types/wp";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  NameFieldValue,
} from "@workspace/ui/hooks/useGravityForm";
import { gql } from "@apollo/client";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";

import type { JSX } from "react";

export const NAME_FIELD_FIELDS = gql`
  fragment NameFieldFields on NameField {
    id
    databaseId
    formId
    label
    description
    cssClass
    inputs {
      key
      label
      placeholder
      choices {
        text
        value
      }
    }
  }
`;

interface Props {
  field: any;
  fieldErrors: FieldError[];
  formId: string;
}

const DEFAULT_VALUE: NameFieldInput = {};

const AUTOCOMPLETE_ATTRIBUTES: { [key: string]: string } = {
  prefix: "honorific-prefix",
  first: "given-name",
  middle: "additional-name",
  last: "family-name",
  suffix: "honorific-suffix",
};

export default function NameField({
  field,
  fieldErrors,
  formId,
}: Props): JSX.Element {
  const {
    id,
    type,
    label,
    description,
    cssClass,
    inputs,
    isRequired,
    databaseId,
  } = field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId,
  ) as NameFieldValue | undefined;
  const nameValues = fieldValue?.nameValues || DEFAULT_VALUE;

  const prefixInput = inputs?.find(
    (input: { key: string }) => input?.key === "prefix",
  );
  const otherInputs =
    inputs?.filter((input: { key: string }) => input?.key !== "prefix") || [];

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    const newNameValues = { ...nameValues, [name]: value };

    dispatch({
      type: ACTION_TYPES.updateNameFieldValue,
      fieldValue: {
        id: databaseId,
        nameValues: newNameValues,
      },
    });
  }

  return (
    <>
      <fieldset
        id={htmlId}
        className={`gfield w-full flex flex-col sm:flex-row gap-2 justify-center sm:gap-4 md:flex-row gfield-${type} ${
          cssClass ?? ""
        }`.trim()}
      >
        <legend
          className={`text-body mb-2 text-left font-body text-lg leading-5 text-gray-800 hidden`}
        >
          {isRequired ? (
            <>
              {label}
              <sup className={`text-secondary`}>*</sup>
            </>
          ) : (
            label
          )}
        </legend>
        {/* {prefixInput ? (
        <>
          <select
            name={String(prefixInput.key)}
            id={`input_${formId}_${id}_${prefixInput.key}`}
            autoComplete={AUTOCOMPLETE_ATTRIBUTES.prefix}
            value={nameValues.prefix || ""}
            onChange={handleChange}
          >
            <option value=""></option>
            {prefixInput.choices?.map((choice) => (
              <option key={choice?.value} value={String(choice?.value)}>
                {String(choice?.text)}
              </option>
            ))}
          </select>
          <label htmlFor={`input_${formId}_${id}_${prefixInput.key}`}>
            {prefixInput.label}
          </label>
        </>
      ) : null} */}
        {otherInputs.map(
          (input: { key: string; label: string; placeholder: string }) => {
            const key = input?.key as keyof NameFieldInput;
            const inputLabel = input?.label || "";
            const placeholder = input?.placeholder || "";
            return (
              (key === "first" || key === "last") && (
                <div key={key} className={`w-full`}>
                  <Label htmlFor={`input_${formId}_${databaseId}_${key}`}>
                    {inputLabel}
                  </Label>
                  <Input
                    type="text"
                    name={String(key)}
                    id={`input_${formId}_${databaseId}_${key}`}
                    className={`form-input[type='text'] font-sans`}
                    required={Boolean(isRequired)}
                    placeholder={
                      placeholder || isRequired
                        ? `${inputLabel}*`
                        : inputLabel || ""
                    }
                    value={nameValues?.[key] || ""}
                    onChange={handleChange}
                  />
                </div>
              )
            );
          },
        )}
      </fieldset>
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
    </>
  );
}
