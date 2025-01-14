"use server";

import { getClient } from "@/providers/apollo/rsc";
import { LOGIN, LOGIN_WITH_OAUTH }  from "@/queries";

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
}

export const loginWithOAuth = async (provider: string, code: string, state: string) => {
    const client = await getClient();
    // query
    const { data } = await client.query({
      query: LOGIN_WITH_OAUTH,
      variables: {
        provider,
        code,
        state,
      },
      fetchPolicy: "no-cache",
    });

    if (!data?.login?.user) {
        return null;
    }

    return data.login.user;
}; 