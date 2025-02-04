import { PleaseLogin } from "@/components/please-login";
import type { User } from "@/types/wp";
import { gql } from "@apollo/client";
import { getAuthClient } from "@/providers/apollo/rsc";
import { USER_FIELDS } from "@/queries";
import MyAccount from "@/features/User/my-account";

export default async function Page() {
  const client = await getAuthClient();

  if (!client) {
    return <PleaseLogin />;
  }
  const { data, errors } = await client.query({
    query: gql`
      query GetViewer {
        viewer {
          ...UserFields
        }
      }
      ${USER_FIELDS}
    `,
  });

  return <MyAccount user={data?.viewer as User} />;
}
