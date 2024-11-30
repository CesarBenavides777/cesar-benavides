"use client";

import type {
  FieldError,
  FormField,
  GfForm as GravityFormsFormType,
  SubmitGfFormInput,
  SubmitGfFormPayload,
} from "@/types/wp.js";
import useGravityForm from "../../hooks/useGravityForm.js";
import { toast } from "sonner";
import GravityFormsField from "./GravityFormsField.js";
import { Button } from "@/components/ui/button.js";
import { useId, useState } from "react";
import { removeHtml } from "@/utils/removeHtml.js";

interface Props {
  form: GravityFormsFormType;
  formId?: number | string;
  showTitle?: boolean;
  submitForm: (formData: SubmitGfFormInput) => Promise<any>;
  useToast?: boolean;
  styled?: boolean;
}

const successOptions = {
  autoClose: 3000,
  hideProgressBar: false,
  position: "bottom-center",
};

const fieldError = {
  autoClose: 3000,
  hideProgressBar: false,
  position: "bottom-center",
  pauseOnHover: true,
};

const GravityFormsForm = ({ form, formId, showTitle, submitForm }: Props) => {
  const {
    formFields,
    title,
    description,
    id,
    databaseId,
    submitButton,
    confirmations,
  } = form ?? {
    formFields: {
      nodes: [],
    },
    title: "",
    id: "",
    databaseId: 0,
    submitButton: {
      text: "",
    },
    confirmations: [
      {
        message: "",
      },
    ],
  };

  const { state } = useGravityForm();

  let [data, setData] = useState({
    entry: {
      id: "",
    },
    errors: [
      {
        message: "",
      },
    ],
    confirmation: {
      message: "",
    },
  } as SubmitGfFormPayload);

  let [isLoading, setIsLoading] = useState(false);

  const submitGfForm = async (input: SubmitGfFormInput) => {
    setIsLoading(true);
    const res = await submitForm(input);

    if (res) {
      setIsLoading(false);
    }

    setData(res);

    return res;
  };

  const haveEntryId = Boolean(data?.entry?.id !== "");
  const haveFieldErrors = Boolean(data && data?.errors && data?.errors?.length);
  const wasSuccessfullySubmitted = haveEntryId && !haveFieldErrors;
  const hasConfirmation =
    data && data?.confirmation && data.confirmation.message;
  const defaultConfirmation =
    hasConfirmation && data.confirmation && data.confirmation.message;
  const fields = (formFields?.edges as any) || [];

  const confirmationId = useId();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitGfForm({
      // @ts-ignore
      fieldValues: state,
      id: form.databaseId.toString(),
      clientMutationId: confirmationId,
    })
      .catch((errors: any) => toast.error(errors.message))
      .then((data: any) => {
        if (haveFieldErrors && data?.errors?.length) {
          toast.error(data?.errors[0]?.message);
        } else {
          console.log("Success", data);
          toast.success(removeHtml(data?.confirmation?.message));
        }
      });
  };

  function getFieldErrors(id: number): FieldError[] {
    if (!haveFieldErrors) return [];
    // @ts-ignore
    return data?.errors.filter((error: FieldError) => error?.id === id);
  }

  return (
    <>
      {wasSuccessfullySubmitted ? (
        <div
          className="mx-auto mb-6 max-w-2xl"
          dangerouslySetInnerHTML={{ __html: defaultConfirmation as string }}
        />
      ) : (
        <>
          {showTitle && (
            <h3 className={`text-left font-bold text-2xl font-sans mb-4 px-2`}>
              {title}
            </h3>
          )}
          {description ? (
            <div className="mx-auto mb-6 max-w-2xl text-left px-2">
              {description}
            </div>
          ) : null}
          <form
            // className={`${styles[`form`]}`}
            method="post"
            onSubmit={handleSubmit}
            autoComplete="on"
          >
            <div className={`mx-auto flex max-w-xl flex-col gap-4`}>
              {fields
                ? fields.map((field: { id: any }, index: any) => {
                    return (
                      <GravityFormsField
                        key={`${field?.id}-${index}`}
                        formId={formId}
                        // @ts-expect-error
                        field={field.node as FormField}
                        fieldErrors={getFieldErrors(Number(field?.id))}
                      />
                    );
                  })
                : null}

              <Button
                className="w-fit rounded"
                variant="outline"
                size="lg"
                type="submit"
                disabled={isLoading}
              >
                {submitButton?.text ?? "Submit"}
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default GravityFormsForm;
