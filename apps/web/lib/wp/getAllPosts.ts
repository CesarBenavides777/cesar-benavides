
import { getClient } from "@faustwp/experimental-app-router";
import { GET_ALL_POSTS } from "@/queries";
const getAllPosts = async () => {
  const client = await getClient();

  if (!client) {
    throw new Error("Failed to get client");
  }

  const { data } = await client.query({
    query: GET_ALL_POSTS,
    fetchPolicy: "no-cache",
  });

  return data.pages.nodes;
};

export { getAllPosts };
