import { gql } from "@apollo/client";
import { LoginInput } from "@/types/wp";
import { getClient } from "@/providers/apollo/rsc";
import { GraphQLFormattedError } from "graphql";

const USER_DATA_FRAG = gql`
  fragment UserDataFrag on User {
    databaseId
    name
    email
  }
`;

const LOGIN_MUTATION = gql`
  ${USER_DATA_FRAG}
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      authToken
      refreshToken
      userData: user {
        ...UserDataFrag
      }
    }
  }
`;

export const authenticate = async (
  input: LoginInput,
): Promise<{
  login: any["login"];
  errors: GraphQLFormattedError | undefined;
}> => {
  const client = getClient();
  //   @ts-ignore
  const { data, errors } = await client.mutate({
    mutation: LOGIN_MUTATION,
    variables: { input },
  });

  return { login: data?.login, errors };
};
