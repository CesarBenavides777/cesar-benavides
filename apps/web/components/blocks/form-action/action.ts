"use server";

import { gql } from "@apollo/client";
import { getClient } from "@faustwp/experimental-app-router";

export const submitForm = async (prevData: any, data: FormData) => {
  const client = await getClient();
  const state = JSON.parse(data.get("formState") as string);

  // Prepare GraphQL mutation
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

  // Combine form fields and file inputs

  // Execute mutation
  try {
    const response = await client.mutate({
      mutation: submitGfForm,
      variables: {
        input: {
          fieldValues: state.formFields,
          id: state.id,
          clientMutationId: state.clientMutationId,
        },
      },
      context: {
        multipart: true
      }
    });

    return response;
  } catch (error) {
    console.error("Error submitting form", error.graphQLErrors);
    return {
      errors: [...error.graphQLErrors],
    };
  }
};
