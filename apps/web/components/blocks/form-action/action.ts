"use server";

import { SubmitGfFormInput } from "@/types/wp";
import { gql } from "@apollo/client";
import { getClient } from "@faustwp/experimental-app-router";

export const submitForm = async (formData: SubmitGfFormInput) => {
  const client = await getClient();

  const { data } = await client.mutate({
    mutation: gql`
      mutation SubmitForm($formData: SubmitGfFormInput!) {
        submitGfForm(input: $formData) {
          entry {
            id
          }
          confirmation {
            message
          }
          errors {
            id
            message
          }
        }
      }
    `,
    variables: {
      formData,
    },
  });

  return data.submitGfForm;
};
