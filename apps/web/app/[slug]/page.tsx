import { hasPreviewProps } from "./hasPreviewProps";
import { PleaseLogin } from "@/components/please-login";
import Main from "@/components/ui/main";
import BlockReturner from "@/features/BlockReturner/BlockReturner";
import { PageIdType, PostTypeSeo } from "@/types/wp";
import getPageData from "@/lib/wp/getPageData";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const slug = (await params).slug;
  const pageData = await getPageData({
    pageId: slug as PageIdType,
    asPreview: false,
  });

  const { seo } = pageData.data.page;
  const {
    title,
    focuskw,
    metaDesc,
    opengraphTitle,
    opengraphDescription,
    opengraphUrl,
    opengraphType,
    opengraphImage,
    opengraphAuthor,
  } = seo as PostTypeSeo;

  return {
    title,
    description: metaDesc,
    generator: "Yoast SEO",
    applicationName: title,
    referrer: "origin-when-cross-origin",
    keywords: focuskw,
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1",
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    openGraph: {
      title: opengraphTitle || title || "",
      description: opengraphDescription || metaDesc || "",
      url: opengraphUrl || "",
      images: opengraphImage?.sourceUrl
        ? [{ url: opengraphImage.sourceUrl }]
        : [],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "https://www.cesarbenavides.com",
      creator: "https://x.com/CesarCodes777",
    },
  };
}

export default async function Page(props: Props) {
  const isPreview = await hasPreviewProps(props);
  const { searchParams, params } = props;
  const sParams = await searchParams;
  const param = await params;
  const { slug } = param;
  // consruct redirect url based
  const paramsForRedirect = new URLSearchParams(sParams as any);
  const fullRedirectUrl = `${process.env.NEXT_PUBLIC_URL}/${slug}?${paramsForRedirect.toString()}`;
  const redirectUrl = encodeURIComponent(fullRedirectUrl);

  const id = isPreview ? sParams.p : param.slug;

  const pageData = await getPageData({
    pageId: id as PageIdType,
    asPreview: isPreview,
  });

  const { data, hasClient } = pageData;
  const { pageContent, title, id: pageId } = data?.page ?? {};
  const { blocks } = pageContent ?? {};

  if (!pageId) {
    return notFound();
  }

  if (!hasClient) {
    return <PleaseLogin redirect={redirectUrl} />;
  }

  return (
    <Main>
      <BlockReturner blocks={blocks} title={title} />
    </Main>
  );
}

export const revalidate = 60;