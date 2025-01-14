import { auth } from "@/auth";

export default async function fetchAPI(
  query: any,
  { variables }: { variables?: Record<string, any> } = {},
  headers = {
    "Content-Type": "application/json",
    Origin: process.env.NEXT_PUBLIC_URL,
    Authorization: "",
  }
) {
  try {
    // We get the session from NextAuth.
    const session = await auth();

    // If the user has an authToken, we add it to the headers.
    if (session && session?.authToken) {
      headers.Authorization = `Bearer ${session.authToken}`;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: process.env.NEXT_PUBLIC_URL,
          ...headers,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      }
    );

    const json = await res.json();

    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to fetch API");
    }

    return json.data;
  } catch (e) {
    return {
      errors: [e],
    };
  }
}
