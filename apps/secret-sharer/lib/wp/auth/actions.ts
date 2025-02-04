"use server";

import { getClient } from "@/providers/apollo/rsc";
import { gql } from "@apollo/client";
import { User } from "@/types/wp";

const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken(
    $token: String! # The user's refreshToken.
  ) {
    refreshToken(input: { refreshToken: $token }) {
      authToken # The new auth token for the user.
      authTokenExpiration # The expiration time of the new auth token.
      success
    }
  }
`;

export const refreshAuthToken: (
  refreshToken: string,
) => Promise<User["auth"]> = async (refreshToken: string) => {
  const variables = {
    token: refreshToken,
  };

  const client = await getClient();

  const { data } = await client.mutate({
    mutation: REFRESH_TOKEN_MUTATION,
    variables,
  });

  if (!data?.refreshToken?.success) {
    return null;
  }

  return data?.refreshToken;
};
