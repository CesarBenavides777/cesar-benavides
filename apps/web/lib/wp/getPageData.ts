import { GET_PAGE } from "@/queries";
import { ContentNodeIdTypeEnum } from "@/types/wp";
import { getAuthClient, getClient } from "@faustwp/experimental-app-router";
import { getForm } from "./getForm";

type GetPageData = {
  pageId: ContentNodeIdTypeEnum;
  asPreview: boolean;
};

const getPageData = async ({ pageId, asPreview }: GetPageData) => {
  if (!pageId) {
    throw new Error("Page ID is required");
  }

  const client = asPreview ? await getAuthClient() : await getClient();

  if (!client) {
    throw new Error("Failed to get client");
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
