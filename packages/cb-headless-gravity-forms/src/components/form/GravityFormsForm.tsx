"use client";

import type {
  FieldError,
  FormField,
  GfForm as GravityFormsFormType,
} from "@/types/wp.js";
import useGravityForm from "../../hooks/useGravityForm.js";
import { toast } from "sonner";
import GravityFormsField from "./GravityFormsField.js";
import { Button } from "@/components/ui/button.js";
import { useId, } from "react";
import { gql, useMutation } from "@apollo/client";
import { removeHtml } from "@/utils/removeHtml.js";

interface Props {
  form: GravityFormsFormType;
  formId?: number | string;
  showTitle?: boolean;
  submitForm: (prevData: any, data: FormData) => Promise<any>;
  useToast?: boolean;
  styled?: boolean;
}

const successOptions = {
  position: "bottom-center",
};

const fieldError = {
  autoClose: 3000,
  hideProgressBar: false,
  position: "bottom-center",
  pauseOnHover: true,
};

const submitGfForm = gql`
  mutation SubmitGfForm($input: SubmitGfFormInput!) {
    submitGfForm(input: $input) {
      clientMutationId
      confirmation {
        message
      }
      entry {
        formId
        id
      }
      errors {
        message
        id
      }
    }
  }
`;

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
      edges: [],
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
  console.log(state);

  

  const [mutateFunction, { data, loading, error }] = useMutation(submitGfForm);

  const haveEntryId = Boolean(data?.submitGfForm?.entry?.id);
  const haveFieldErrors = Boolean(data?.submitGfForm?.entry?.errors?.length);
  const wasSuccessfullySubmitted = haveEntryId && !haveFieldErrors;
  const hasConfirmation = confirmations && confirmations.length > 0;
  const defaultConfirmation = hasConfirmation && confirmations[0]?.message;
  const fields = (formFields?.edges as any) || [];

  const uniqueId = useId();
  function getFieldErrors(id: number): FieldError[] {
    if (!haveFieldErrors) return [];
    // @ts-ignore
    return data?.errors.filter((error: FieldError) => error?.id === id);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = {
      fieldValues: state,
      id: databaseId,
      clientMutationId: uniqueId,
    };

    try {
      const response = await mutateFunction({
        variables: {
          input,
        },
        context: {
          multipart: true,
        },
      });

      if (response?.data?.submitGfForm?.errors) {
        response?.data?.submitGfForm?.errors.map((error: FieldError) => {
          toast.error(error.message);
        });
      } else {
        toast.success(
          removeHtml(response?.data?.submitGfForm?.confirmation?.message)
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Error submitting form");
    }
  };

  return (
    <>
      {wasSuccessfullySubmitted ? (
        <div
          className="mx-auto max-w-xl flex flex-col gap-4"
          dangerouslySetInnerHTML={{ __html: defaultConfirmation as string }}
        />
      ) : (
        <>
          {showTitle && (
            <h3 className={`text-left font-bold text-2xl font-sans mb-4`}>
              {title}
            </h3>
          )}
          {description ? (
            <div className="mx-auto mb-6 max-w-2xl text-left px-2">
              {description}
            </div>
          ) : null}
          <form 
            onSubmit={handleSubmit}
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
                disabled={loading}
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
