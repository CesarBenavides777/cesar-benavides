// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function hasPreviewProps(props: any) {
  return props?.searchParams?.preview === "true" && !!props?.searchParams?.p;
}
