"use client";

import ThemeProvider from "./ThemeProvider";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ApolloProvider } from "./apollo/ssr";
import { useEffect } from "react";

const isDev = process.env.NODE_ENV === "development";

const Providers = ({ children }) => {

    useEffect(() => {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      });
    }, []);

  return (
    <ApolloProvider>
      <ThemeProvider>
        {isDev ? (
          children
        ) : (
          <PostHogProvider client={posthog}>{children}</PostHogProvider>
        )}
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default Providers;
