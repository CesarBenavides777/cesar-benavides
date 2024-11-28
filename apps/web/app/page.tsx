import Main from "@/components/ui/main";
import { BlockReturner } from "@/features/BlockReturner";
import getPageData from "@/lib/wp/getPageData";
import { PageIdType } from "@/types/wp";

export default async function Home() {
  const pageData = await getPageData({
    pageId: "/" as PageIdType,
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
