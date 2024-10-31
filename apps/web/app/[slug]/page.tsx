import { getAuthClient, getClient } from "@faustwp/experimental-app-router";
import { hasPreviewProps } from "./hasPreviewProps";
import { PleaseLogin } from "@/components/please-login";
import Main from "@/components/ui/main";
import { GET_PAGE } from "@/queries";
import BlockReturner from "@/features/BlockReturner/BlockReturner";

export default async function Page(props) {
  const isPreview = await hasPreviewProps(props);
  const { searchParams, params } = props;
  const sParams = await searchParams;
  const param = await params;

  const id = isPreview ? sParams.p : param.slug;

  const client = isPreview ? await getAuthClient() : await getClient();

  if (!client) {
    return <PleaseLogin />;
  }

  const { data } = await client.query({
    query: GET_PAGE,
    variables: {
      id: id,
      idType: "URI",
      asPreview: isPreview,
    },
  });

  const { pageContent, title } = data.page;
  const { blocks } = pageContent;

  return (
    <Main>
      <BlockReturner blocks={blocks} title={title} />
    </Main>
  );
}
