import { gql } from "@apollo/client";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

import type {
  AddressField as AddressFieldType,
  AddressFieldInput,
  FieldError,
} from "@workspace/ui/types/wp";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  AddressFieldValue,
} from "@workspace/ui/hooks/useGravityForm";

export const ADDRESS_FIELD_FIELDS = gql`
  fragment AddressFieldFields on AddressField {
    id
    databaseId
    label
    inputName
    description
    cssClass
    inputs {
      placeholder
      name
      label
      key
      isHidden
      id
      defaultValue
      customLabel
      autocompleteAttribute
    }
  }
`;

interface Props {
  field: AddressFieldType;
  fieldErrors: FieldError[];
  formId: string;
}

const DEFAULT_VALUE: AddressFieldInput = {};

const AUTOCOMPLETE_ATTRIBUTES: { [key: string]: string } = {
  street: "address-line1",
  lineTwo: "address-line2",
  city: "address-level2",
  state: "address-level1",
  country: "country-name",
};

const AddressField: React.FC<Props> = ({
  field,
  fieldErrors,
  formId,
}: Props) => {
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
    (fieldValue: FieldValue) =>
      fieldValue.id.toString() === databaseId.toString(),
  ) as AddressFieldValue | undefined;
  const addressValues = fieldValue?.addressValues || DEFAULT_VALUE;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const newAddressValues = { ...addressValues, [name]: value };

    dispatch({
      type: ACTION_TYPES.updateAddressFieldValue,
      fieldValue: {
        id: databaseId,
        addressValues: newAddressValues,
      },
    });
  }

  return (
    <fieldset
      id={htmlId}
      className={`gfield flex flex-col gap-4 gfield-${type} ${cssClass}`.trim()}
    >
      <legend className="text-xl mb-2 block text-left font-sans text-lg leading-5">
        {isRequired ? (
          <>
            {label}
            <sup className="text-secondary">*</sup>
          </>
        ) : (
          label
        )}
      </legend>
      {inputs?.map((input) => {
        // @ts-ignore
        const key = input?.key as keyof AddressFieldInput;
        const inputLabel = input?.label || "";
        // const placeholder = input?.placeholder || "";
        const isCountry = key === "country";
        // @ts-ignore
        const isHidden = input?.isHidden;

        if (isHidden) {
          return null;
        }

        // Enforce country to follow the ISO 3166-1 alpha-2 standard
        if (isCountry) {
          return (
            <div key={key} className="flex flex-col gap-1">
              <Label htmlFor={`input_${formId}_${id}_${key}`}>
                {inputLabel}
              </Label>
              <Input
                type="text"
                name={String(key)}
                id={`input_${formId}_${id}_${key}`}
                placeholder={inputLabel}
                autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
                value={addressValues?.[key] ?? "US"}
                onChange={handleChange}
                pattern="[A-Z]{2}"
                title="Please enter a valid country code (e.g. US)"
              />
            </div>
          );
        }

        return (
          <div key={key} className="flex flex-col gap-1">
            <Label htmlFor={`input_${formId}_${id}_${key}`}>{inputLabel}</Label>
            <Input
              type="text"
              name={String(key)}
              id={`input_${formId}_${id}_${key}`}
              placeholder={inputLabel}
              autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
              value={addressValues?.[key] ?? ""}
              onChange={handleChange}
            />
          </div>
        );
      })}
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length
        ? fieldErrors.map((fieldError) => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </fieldset>
  );
};

export default AddressField;
