import { FaustHooks, FaustPlugin } from "@faustwp/core";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { ApolloClientOptions, NormalizedCacheObject } from "@apollo/client";

export class UploadPlugin implements FaustPlugin {
  apply(hooks: FaustHooks) {
    const { addFilter } = hooks;

    // Modify the Apollo Client's options
    addFilter(
      "apolloClientOptions",
      "faust",
      (
        apolloClientOptions: ApolloClientOptions<NormalizedCacheObject>,
        context: Record<string, never>
      ) => {
        // Create an upload link using the 'apollo-upload-client' package
        const uploadLink = createUploadLink({
          uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/index.php?graphql`,
        });
        apolloClientOptions.link = uploadLink;
      }
    );

    // Modify the GraphQL Endpoint
    addFilter(
      "graphqlEndpoint",
      "faust",
      (graphqlEndpoint: string, context: { wpUrl: string }) => {
        // Set the GraphQL endpoint to the value of the environment variable
        return `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/index.php?graphql`;
      }
    );
  }
}
