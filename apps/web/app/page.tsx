import Main from "@/components/ui/main";
import { BlockReturner } from "@/features/BlockReturner";
import getPageData from "@/lib/wp/getPageData";
import { ContentNodeIdTypeEnum, PostTypeSeo } from "@/types/wp";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const pageData = await getPageData({
    pageId: "/" as ContentNodeIdTypeEnum,
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

export default async function Home() {
  const pageData = await getPageData({
    pageId: "/" as ContentNodeIdTypeEnum,
    asPreview: false,
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
