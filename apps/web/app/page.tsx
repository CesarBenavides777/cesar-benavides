import { getClient } from "@faustwp/experimental-app-router";
import Main from "@/components/ui/main";
import { GET_PAGE } from "@/queries";
import { BlockReturner } from "@/features/BlockReturner";

export default async function Home() {
  const client = await getClient();

  const { data } = await client.query({
    query: GET_PAGE,
    variables: {
      id: "/",
      idType: "URI",
      asPreview: false,
    },
  });

  const { pageContent } = data.page;
  const { blocks } = pageContent;

  return (
    <Main>
      <BlockReturner blocks={blocks} />
    </Main>
  );
}
