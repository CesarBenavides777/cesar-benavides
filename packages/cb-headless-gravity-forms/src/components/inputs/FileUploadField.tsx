import type { 
  FieldError,
  FileUploadField as GFFileUploadField,
} from "@/types/wp.js";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  FileUploadFieldValue,
} from "../../hooks/useGravityForm.js";

interface Props {
  field: any;
  fieldErrors: FieldError[];
  formId: string;
}

export default function FileUploadField({ field, fieldErrors, formId }: Props) {
  const { id, type, label, description, cssClass, isRequired, databaseId } = field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();

  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId,
  ) as FileUploadFieldValue | undefined;

  return (
    <fieldset
      id={htmlId}
      className={`gfield flex w-full flex-col justify-center gap-4 md:flex-row gfield-${type} ${
        cssClass ?? ""
      }`.trim()}
    >
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
        type="file"
        name={String(databaseId)}
        id={`input_${formId}_${databaseId}`}
        required={Boolean(isRequired)}
        onChange={(event) => {
          const { files } = event.target;
          const file = files?.[0];
          dispatch({
            type: ACTION_TYPES.updateFileUploadFieldValue,
            fieldValue: {
              id: databaseId,
              fileUploadValues: [
                file,
              ] as FileUploadFieldValue["fileUploadValues"],
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
    </fieldset>
  );
}
