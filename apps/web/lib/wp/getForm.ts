import { FORM_QUERY } from "@/queries";
import { getClient } from "@/providers/apollo/rsc";

export const getForm = async (id: string) => {
  const client = await getClient();

  const { data } = await client.query({
    query: FORM_QUERY,
    variables: {
      id,
    },
  });

  return data;
};
