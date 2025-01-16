import { PleaseLogin } from "@/components/please-login";
import Main from "@/components/ui/main";
import BlockReturner from "@/features/BlockReturner/BlockReturner";
import { ContentNodeIdTypeEnum } from "@/types/wp";
import getPageData from "@/lib/wp/getPageData";
import type { Metadata } from "next";
import { hasPreviewProps } from "@/app/[slug]/hasPreviewProps";
import { auth } from "@/auth";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function generateMetadata(): Metadata {
  return {
    title: "Preview",
    openGraph: {
      title: "Preview",
    },
  };
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const p = searchParams.preview_id || searchParams.p;
  const preview = searchParams.preview;
  const redirectUrl = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_URL}/en/preview?p=${p}&preview=${preview}`
  );
  const isPreview = await hasPreviewProps({
    p,
    preview,
  });

  const session = await auth();

 

  const pageData = await getPageData({
    pageId: p as ContentNodeIdTypeEnum,
    asPreview: isPreview,
  });

  const { data, hasClient } = pageData;
   if (!session || !hasClient) {
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
