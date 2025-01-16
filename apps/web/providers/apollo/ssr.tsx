"use client";

import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

import { createApolloConfig } from "./config";
import type { ReactNode } from "react";

export function createSSRApolloClient(authenticated: boolean) {
  const [inMemoryCacheObject, linkChain] = createApolloConfig(authenticated);
  return new ApolloClient({
    cache: new InMemoryCache(inMemoryCacheObject),
    link: linkChain,
  });
}

export function ApolloProvider({ children, isPreview }: {
  children: ReactNode;
  isPreview?: boolean;
}) {
  return (
    <ApolloNextAppProvider makeClient={() => createSSRApolloClient(!!isPreview)}>
      {children}
    </ApolloNextAppProvider>
  );
}
