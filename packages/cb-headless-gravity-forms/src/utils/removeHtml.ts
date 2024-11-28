const removeHtml = (html: string): string => {
    return html.replace(/<[^>]*>?/gm, "");
}

export { removeHtml };