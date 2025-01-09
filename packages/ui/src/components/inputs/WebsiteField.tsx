import { Input } from "@workspace/ui/components/input"; 
import { Label } from "@workspace/ui/components/label"; 

import type {
  WebsiteField as WebsiteFieldType,
  FieldError,
} from "@workspace/ui/types/wp";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "@workspace/ui/hooks/useGravityForm";

interface Props {
  field: WebsiteFieldType;
  fieldErrors: FieldError[];
  formId: any;
}

const DEFAULT_VALUE = "";

import type { FC } from "react";

const WebsiteField: FC<Props> = ({ field, fieldErrors, formId }) => {
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

export default WebsiteField;