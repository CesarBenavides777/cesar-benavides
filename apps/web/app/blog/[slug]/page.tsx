
import { PleaseLogin } from "@/components/please-login";
import Main from "@/components/ui/main";
import BlockReturner from "@/features/BlockReturner/BlockReturner";
import { ContentNodeIdTypeEnum, PostTypeSeo } from "@/types/wp";
import getPageData from "@/lib/wp/getPageData";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { getMetaData } from "@/lib/wp/getMetaData";
import { hasPreviewProps } from "../../[slug]/hasPreviewProps";
import { getAllPosts } from "@/lib/wp/getAllPosts";


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
  const metaData = await getMetaData({
    slug: `/blog/${slug}`,
    asPreview: await hasPreviewProps({ params, searchParams }),
  });

  return metaData;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  console.log("posts", posts);

  return posts.map((post: {
    slug: string;
  }) => ({
    params: {
      slug: post.slug ?? "",
    },
  }));
}

export default async function BlogPage(props: Props) {
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
    pageId: `/blog/${id}` as ContentNodeIdTypeEnum,
    asPreview: isPreview,
  });
  

  const { data, hasClient } = pageData;
  const { pageContent, title, id: pageId, tags } = data?.page ?? {};
  const { blocks } = pageContent ?? {};

  if (!pageId) {
    return notFound();
  }
  

  if (!hasClient) {
    return <PleaseLogin redirect={redirectUrl} />;
  }

  const tagNames = tags?.nodes.map((tag: any) => tag.name) ?? [];

  return (
    <Main>
      <BlockReturner 
        blocks={blocks} 
        title={title} 
        tags={tagNames}
      />
    </Main>
  );
}


export const revalidate = 60;

