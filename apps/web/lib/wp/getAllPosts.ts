
const getAllPosts = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
    posts(first: 100) {
      nodes {
        id
        slug
      }
    }
  }`,
    }),
  })

  const json = await data.json();

    return json.data.posts.nodes;
};

export { getAllPosts };