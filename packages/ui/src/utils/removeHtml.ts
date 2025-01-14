const removeHtml = (html: string): string => {
  if (!html) return "";

  return html.replace(/<[^>]*>?/gm, "");
};

export { removeHtml };
