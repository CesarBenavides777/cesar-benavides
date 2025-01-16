// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function hasPreviewProps(props: any) {
  const data = props;

  return data?.preview === "true" && (!!data?.p || !!data?.preview_id);
}
