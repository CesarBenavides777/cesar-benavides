import { GET_ALL_PAGES } from "@/queries";
import { getClient } from "@/providers/apollo/rsc";


const getAllPages = async () => {
  const client = await getClient();

    if (!client) {
        throw new Error("Failed to get client");
    }

    const { data } = await client.query({
        query: GET_ALL_PAGES,
    });

    return data.pages.nodes;
};

export { getAllPages };