import { GET_PAGE } from "@/queries";
import { PageIdType } from "@/types/wp";
import { getAuthClient, getClient } from "@faustwp/experimental-app-router";
import { getForm } from "./getForm";

type GetPageData = {
  pageId: PageIdType;
  asPreview: boolean;
};

const getPageData = async ({ pageId, asPreview }: GetPageData) => {
  if (!pageId) {
    throw new Error("Page ID is required");
  }

  const client = asPreview ? await getAuthClient() : await getClient();

  const { data } = await client.query({
    query: GET_PAGE,
    variables: {
      id: pageId,
      idType: asPreview ? "DATABASE_ID" : "URI",
      asPreview,
    },
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
