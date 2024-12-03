import type {
  MultiSelectField as MultiSelectFieldType,
  FieldError,
} from "@/types/wp.js";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValues,
} from "../../hooks/useGravityForm.js";
import { MultiSelect } from "@/components/ui/multi-select.js";

interface Props {
  field: MultiSelectFieldType;
  fieldErrors: FieldError[];
  formId: any;
}

const DEFAULT_VALUE: string[] = [];

export default function MultiSelectField({
  field,
  fieldErrors,
  formId,
}: Props) {
  const {
    id,
    type,
    label,
    description,
    cssClass,
    isRequired,
    choices,
    databaseId,
  } = field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId
  ) as StringFieldValues | undefined;
  const values = fieldValue?.values || DEFAULT_VALUE;

  const options =
    choices?.map((choice) => ({
      label: choice?.text || "",
      value: choice?.value || "",
    })) || [];

  function handleChange(newValues: string[]) {
    dispatch({
      type: ACTION_TYPES.updateMultiSelectFieldValue,
      fieldValue: { id: databaseId, values: newValues },
    });
  }

  return (
    <div className={`gfield gfield-${type} ${cssClass || ""}`.trim()}>
      <label htmlFor={htmlId}>{label}</label>
      <MultiSelect
        options={options}
        onValueChange={handleChange}
        defaultValue={values}
        placeholder={`Select ${label}`}
        className="mb-sm mt-xs"
        maxCount={5}
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
