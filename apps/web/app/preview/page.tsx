import { PleaseLogin } from "@/components/please-login";
import Main from "@/components/ui/main";
import BlockReturner from "@/features/BlockReturner/BlockReturner";
import { ContentNodeIdTypeEnum } from "@/types/wp";
import getPageData from "@/lib/wp/getPageData";
import type { Metadata } from "next";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: 'Preview' ,
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const p = searchParams?.preview_id || searchParams?.p || searchParams?.page_id;
  const preview = searchParams?.preview;
  const redirectUrl = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_URL}/preview?p=${p}&preview=${preview}`
  );

  const pageData = await getPageData({
    pageId: p as ContentNodeIdTypeEnum,
    asPreview: true,
  });

  const { data, hasClient } = pageData;

  if (!hasClient) {
    return <PleaseLogin redirect={redirectUrl} />;
  }

  const { pageContent, title, id: pageId } = data?.page ?? {};
  const { blocks } = pageContent ?? {};

  return (
    <Main>
      <BlockReturner blocks={blocks} title={title} />
    </Main>
  );
}

export const dynamic = "force-dynamic";
