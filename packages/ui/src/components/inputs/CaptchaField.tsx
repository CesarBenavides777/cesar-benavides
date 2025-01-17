import React, { useRef } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import useGravityForm, {
  ACTION_TYPES,
} from "@workspace/ui/hooks/useGravityForm";
import { FieldError } from "@workspace/ui/types/wp";
import dynamic from "next/dynamic";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"));

interface Props {
  field: any;
  fieldErrors: FieldError[];
  formId: string;
}

export default function CaptchaField({ field, fieldErrors, formId }: Props) {
  const { cssClass, databaseId, captchaTheme } = field;
  const { dispatch } = useGravityForm();

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const handleCaptchaChange = (token: string | null) => {
    dispatch({
      type: ACTION_TYPES.updateCaptchaValue,
      fieldValue: {
        id: databaseId,
        value: token ?? "",
      },
    });
  };

  return (
    <fieldset
      id={`field_${formId}_${databaseId}`}
      className={`gfield w-full flex flex-col gfield-${field.type} ${
        cssClass ?? ""
      }`.trim()}
    >
      <ReCAPTCHA
        ref={recaptchaRef}
        // @ts-ignore
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        theme={captchaTheme || "light"}
        onChange={handleCaptchaChange}
      />

      {field.description && (
        <p className="text-left font-body text-sm text-gray-500">
          {field.description}
        </p>
      )}

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
