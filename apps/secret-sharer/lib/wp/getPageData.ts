import { GET_PAGE } from "@/queries";
import { ContentNodeIdTypeEnum } from "@/types/wp";
import { getAuthClient, getClient } from "@/providers/apollo/rsc";
import { getForm } from "./getForm";

type GetPageData = {
  pageId: ContentNodeIdTypeEnum;
  asPreview: boolean;
};
export const clientFunction = (asPreview: boolean) => {
  return asPreview
    ? () => getAuthClient(asPreview) // Return a callable function that includes asPreview
    : () => getClient(); // Always return a callable function
};

const getPageData = async ({ pageId, asPreview }: GetPageData) => {

  // Ensure `clientFunction` always returns a callable function
  const client = await clientFunction(asPreview)();

  if (!client || !pageId) {
    return {
      data: null,
      hasClient: false,
    };
  }

  // @ts-expect-error
  const isBlog = pageId === "blog";
  const blogId = 259; // Blog page ID for Archive page query

  const { data } = await client.query({
    query: GET_PAGE,
    variables: {
      id: isBlog ? blogId : pageId,
      idType: asPreview || isBlog ? "DATABASE_ID" : "URI",
      asPreview,
    },
    fetchPolicy: asPreview ? "no-cache" : "cache-first",
  });

  const blocks = data?.page?.pageContent?.blocks || [];
  const moddedBlocks: typeof blocks = [];

  for (const block of blocks) {
    if (
      block.__typename === "PageContentBlocksFormblockLayout" &&
      block.gravityformid?.length > 0
    ) {
      const formId = block.gravityformid[0]; // Use gravityformid as the form ID
      const { gfForm } = await getForm(formId); // Fetch form data
      moddedBlocks.push({ ...block, form: gfForm }); // Inject form data
    } else {
      moddedBlocks.push(block); // Push other blocks as-is
    }
  }

  return {
    data: {
      ...data,
      page: {
        ...data.page,
        pageContent: {
          ...data.page?.pageContent,
          blocks: moddedBlocks, // Inject modified blocks
        },
      },
    },
    hasClient: !!client,
  };
};

export default getPageData;