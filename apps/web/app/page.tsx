import Main from "@/components/ui/main";
import { BlockReturner } from "@/features/BlockReturner";
import { getMetaData } from "@/lib/wp/getMetaData";
import getPageData from "@/lib/wp/getPageData";
import { ContentNodeIdTypeEnum } from "@/types/wp";
import type { Metadata, ResolvingMetadata } from "next";
import { hasPreviewProps } from "./[slug]/hasPreviewProps";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
    const slug = "/";
    const metaData = await getMetaData({
      slug,
      asPreview: await hasPreviewProps({ params, searchParams }),
    });
  
    return metaData;
}

export default async function Home(req) {
  const isPreview = await hasPreviewProps(req);
  const pageData = await getPageData({
    pageId: "/" as ContentNodeIdTypeEnum,
    asPreview: isPreview,
  });

  const { data } = pageData;
  const { pageContent, title } = data?.page ?? {};
  const { blocks } = pageContent ?? {};

  return (
    <Main>
        <BlockReturner blocks={blocks} title={title} />
    </Main>
  );
}

export const dynamic = "force-static";
export const revalidate = 60;
