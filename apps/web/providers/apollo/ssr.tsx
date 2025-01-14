"use client";

import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import React, { PropsWithChildren } from "react";
import { createApolloConfig } from "./config";

export function createSSRApolloClient(authenticated: boolean) {
  const [inMemoryCacheObject, linkChain] = createApolloConfig(authenticated);
  return new ApolloClient({
    cache: new InMemoryCache(inMemoryCacheObject),
    link: linkChain,
  });
}

export function ApolloProvider({ children }: PropsWithChildren<object>) {
  return (
    <ApolloNextAppProvider makeClient={() => createSSRApolloClient(false)}>
      {children}
    </ApolloNextAppProvider>
  );
}
