import { getClient } from "@/providers/apollo/rsc";
import { GET_ALL_POSTS } from "@/queries";
const getAllPosts = async () => {
  const client = await getClient();

  if (!client) {
    throw new Error("Failed to get client");
  }

  const { data } = await client.query({
    query: GET_ALL_POSTS,
  });

  return data.posts.nodes;
};

export { getAllPosts };
