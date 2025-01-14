import { ApolloClient, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { createApolloConfig } from "./config";
import { auth } from "@/auth";

export function createRSCApolloClient(authenticated = false) {
  
  const [inMemoryCacheObject, linkChain] = createApolloConfig(authenticated);
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

export async function getAuthClient() {
  const session = await auth();
  if (!session || !session?.isLoggedIn) {
    return null;
  }
  const faustApolloClient = createRSCApolloClient(true);
  const client = registerApolloClient(() => faustApolloClient);

  return client.getClient();
}
