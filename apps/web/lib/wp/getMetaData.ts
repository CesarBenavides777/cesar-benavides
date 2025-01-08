import { SEO_CONFIG_FRAGMENT, SEO_FRAGMENT } from "@/queries";
import { gql } from "@apollo/client";
import { getClient } from "@faustwp/experimental-app-router";

interface GetPageDataProps {
  slug: string;
  asPreview?: boolean;
  page?: number;
}

export const getMetaData = async ({ slug, asPreview }: GetPageDataProps) => {
  const client = await getClient();

  const isBlog = slug === "blog";
  const blogId = 259; // Blog page ID for Archive page query

  const { data } = await client.query({
    query: gql`
      ${SEO_FRAGMENT}
      ${SEO_CONFIG_FRAGMENT}
      query GetMetaData(
        $slug: ID!
        $asPreview: Boolean
        $idType: ContentNodeIdTypeEnum
      ) {
        seo {
          ...SEOConfigFragment
        }
        contentNode(id: $slug, idType: $idType, asPreview: $asPreview) {
          id
          seo {
            ...SEOFragment
          }
        }
      }
    `,
    variables: {
      slug: isBlog ? blogId : slug,
      asPreview,
      idType: asPreview || isBlog ? "DATABASE_ID" : "URI",
    },
  });

  if (!data.contentNode) {
    return {
      title: "Page not found",
      openGraph: {
        title: "Page not found",
        description: "Page not found",
      },
    };
  }

  const { seo } = data.contentNode;

  const title = seo?.title || "Page not found";
  const description = seo?.metaDesc || "Page not found";
  const opengraphTitle = seo?.opengraphTitle || title;
  const opengraphDescription = seo?.opengraphDescription || description;
  const opengraphUrl = seo?.opengraphUrl || "";
  const opengraphImage = seo?.opengraphImage || "";
  const focuskw = seo?.focuskw || "";
  return {
    title,
    description,
    openGraph: {
      title: opengraphTitle,
      description: opengraphDescription,
      url: opengraphUrl,
      locale: "en_US",
      type: "website",
      images: opengraphImage?.sourceUrl
        ? [{ url: opengraphImage.sourceUrl }]
        : [],
    },
    keywords: focuskw,
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1",
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    twitter: {
      card: "summary_large_image",
      site: "https://www.cesarbenavides.com",
      creator: "https://x.com/CesarCodes777",
    },
  };
};
