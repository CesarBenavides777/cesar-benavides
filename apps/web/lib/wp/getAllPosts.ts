import { GET_ALL_POSTS } from "@/queries";
import { getClient } from "@faustwp/experimental-app-router";


const getAllPosts = async () => {
  const client = await getClient();

    if (!client) {
        throw new Error("Failed to get client");
    }

    const { data } = await client.query({
        query: GET_ALL_POSTS,
        fetchPolicy: "no-cache",
    });

    return data.posts.nodes;
};

export { getAllPosts };