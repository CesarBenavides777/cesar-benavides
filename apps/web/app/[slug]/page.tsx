import { hasPreviewProps } from "./hasPreviewProps";
import { PleaseLogin } from "@/components/please-login";
import Main from "@/components/ui/main";
import BlockReturner from "@/features/BlockReturner/BlockReturner";
import { PageIdType } from "@/types/wp";
import getPageData from "@/lib/wp/getPageData";

export default async function Page(props) {
  const isPreview = await hasPreviewProps(props);
  const { searchParams, params } = props;
  const sParams = await searchParams;
  const param = await params;
  const { slug } = param;
  // consruct redirect url based
  const paramsForRedirect = new URLSearchParams(sParams);
  const fullRedirectUrl = `${process.env.NEXT_PUBLIC_URL}/${slug}?${paramsForRedirect.toString()}`;
  const redirectUrl = encodeURIComponent(fullRedirectUrl);

  const id = isPreview ? sParams.p : param.slug;

  const pageData = await getPageData({
    pageId: id as PageIdType,
    asPreview: isPreview,
  });

  const { data, hasClient } = pageData;
  const { pageContent, title } = data?.page ?? {};
  const { blocks } = pageContent ?? {};

  if (!hasClient) {
    return <PleaseLogin redirect={redirectUrl} />;
  }

  return (
    <Main>
      <BlockReturner blocks={blocks} title={title} />
    </Main>
  );
}
