import { ApolloClient, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { createApolloConfig } from "./config";
import { auth } from "@/auth";

export function createRSCApolloClient(authenticated = false, preview = false) {
  const [inMemoryCacheObject, linkChain] = createApolloConfig(authenticated, preview);
  return new ApolloClient({
    cache: new InMemoryCache(inMemoryCacheObject),
    link: linkChain,
  });
}

export async function getClient() {
  const faustApolloClient = createRSCApolloClient(false);
  const client = registerApolloClient(() => faustApolloClient);

  return client.getClient();
}

export async function getAuthClient(preview = false) {
  const session = await auth();
  const faustApolloClient = createRSCApolloClient(session?.isLoggedIn, preview);
  const client = registerApolloClient(() => faustApolloClient);

  return client.getClient();
}
