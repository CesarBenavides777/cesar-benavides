import { auth } from "@/auth";
import getPreviewToken from "@/lib/wp/getPreviewToken";
import {
  ApolloLink,
  InMemoryCacheConfig,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
// import { fetchAccessToken } from "@faustwp/experimental-app-router";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Path: ${path}, Locations: ${locations?.toString()}`,
      ),
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});



export function createApolloConfig(
  authenticated = false,
  preview = false,
): [InMemoryCacheConfig, ApolloLink] {
  let inMemoryCacheObject: InMemoryCacheConfig = {
    typePolicies: {
      RootQuery: {
        queryType: true,
      },
      RootMutation: {
        mutationType: true,
      },
    },
  };

  let linkChain = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/index.php?graphql`,
    credentials: "omit",
    headers: {
      Origin: process.env.NEXT_PUBLIC_URL || "",
    },
    fetchOptions: {
      mode: "cors",
      referrerPolicy: "strict-origin-when-cross-origin",
    },
  });

  // @todo Create hook for client and options.
  // console.log("Preview", preview);
  // console.log("Authenticated", authenticated);
  

  // If the request is coming from the auth client, apply the auth link.
  if (authenticated) {
    linkChain = setContext(async (_, { headers }) => {
      // return the headers to the context so httpLink can read them
      const session = await auth();
      const token = session?.user?.auth?.authToken;

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
          // "woocommerce-session": wooToken ? `Session ${wooToken.value}` : undefined,
        },
      };
    }).concat(linkChain);
  }
  /**
   * @todo
   * Configure GET requests and persisted queries options.
   * These are not defined right now as these behaviors may
   * change based on the App Router implementation. For example,
   * we may set config differently than how we currently do it.
   */

  return [inMemoryCacheObject, errorLink.concat(linkChain)];
}
