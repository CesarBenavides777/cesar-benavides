import { Input } from "@/src/components/ui/input.js"; 
import { Label } from "@/src/components/ui/label.js"; 

import type {
  WebsiteField as WebsiteFieldType,
  FieldError,
} from "@/src/types/wp.js";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "../../hooks/useGravityForm.js";

interface Props {
  field: WebsiteFieldType;
  fieldErrors: FieldError[];
  formId: any;
}

const DEFAULT_VALUE = "";

export default function WebsiteField({ field, fieldErrors, formId }: Props) {
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
    <div className={`gfield gfield-${type} ${cssClass ?? ""}`.trim()}>
      {label && (
        <Label className="text-md" htmlFor={htmlId}>
          {label}
        </Label>
      )}
      <Input
        type="url"
        name={String(databaseId)}
        id={htmlId}
        placeholder={isRequired ? `${label}*` : `${placeholder}` || ""}
        className="w-full"
        required={isRequired || false}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateWebsiteFieldValue,
            fieldValue: {
              id: databaseId,
              value: event.target.value,
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
