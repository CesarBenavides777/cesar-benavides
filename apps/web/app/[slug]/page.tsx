import { getAuthClient, getClient } from "@faustwp/experimental-app-router";
import { gql } from "@apollo/client";
import { hasPreviewProps } from "./hasPreviewProps";
import { PleaseLogin } from "@/components/please-login";
import Main from "@/components/ui/main";

export default async function Page(props) {
  const isPreview = hasPreviewProps(props);
  const id = isPreview ? props.searchParams.p : props.params.slug;

  const client = isPreview ? await getAuthClient() : await getClient();

  if (!client) {
    return <PleaseLogin />;
  }

  const { data } = await client.query({
    query: gql`
      query GetContentNode(
        $id: ID!
        $idType: ContentNodeIdTypeEnum!
        $asPreview: Boolean!
      ) {
        contentNode(id: $id, idType: $idType, asPreview: $asPreview) {
          ... on NodeWithTitle {
            title
          }
          ... on NodeWithContentEditor {
            content
          }
          date
        }
      }
    `,
    variables: {
      id,
      idType: isPreview ? "DATABASE_ID" : "URI",
      asPreview: isPreview,
    },
  });

  return (
    <Main>
      <h2>{data?.contentNode?.title}</h2>
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: data?.contentNode?.content ?? "",
        }}
      />
    </Main>
  );
}
