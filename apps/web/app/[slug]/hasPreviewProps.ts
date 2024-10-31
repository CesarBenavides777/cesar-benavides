// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function hasPreviewProps(props: any) {
  const { searchParams } = await props;
  const data = await searchParams;

  return data?.preview === "true" && !!props?.searchParams?.p;
}
