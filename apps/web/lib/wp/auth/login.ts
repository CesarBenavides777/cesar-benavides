"use server";

import { getClient } from "@/providers/apollo/rsc";
import { LOGIN, LOGIN_WITH_OAUTH } from "@/queries";

type LoginWithUserNameAndPasswordInput = {
  username: string;
  password: string;
};

export const loginWithUserNameAndPassword = async ({
  username,
  password,
}: LoginWithUserNameAndPasswordInput) => {
  const client = await getClient();
  // query
  const { data } = await client.query({
    query: LOGIN,
    variables: {
      username,
      password,
    },
    fetchPolicy: "no-cache",
  });

  if (!data?.login?.user) {
    return null;
  }

  return data.login.user;
};

export const loginWithOAuth = async (
  provider: string,
  code: string,
  state?: string
) => {
  // console.log("loginWithOAuth running with:", { provider, code, state });

  const client = await getClient();

  try {
    const { data } = await client.mutate({
      mutation: LOGIN_WITH_OAUTH,
      variables: {
        provider, // Example: "GITHUB"
        code, // The OAuth `code` from the GitHub callback
        state, // Optional `state` from OAuth flow
      },
      fetchPolicy: "no-cache",
    });
    
    
    if (!data?.login) {
      console.warn("Login with OAuth failed. No user data returned.");
      console.error("Data:", data);
      return null;
    }

    return data.login;

  } catch (error) {
    // @ts-ignore
    const errors = error?.graphQLErrors;
    if (errors) {
      errors.forEach((err: any) => {
        console.error("Error during loginWithOAuth:", err);
      });
    }
    return null;
  }
};
