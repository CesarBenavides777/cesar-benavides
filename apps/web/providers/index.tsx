"use client";

import ThemeProvider from "./ThemeProvider";
// import { FaustProvider } from "@faustwp/experimental-app-router/ssr";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ApolloProvider } from "./apollo/ssr";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "always", // or 'always' to create profiles for anonymous users as well
  });
}

const isDev = process.env.NODE_ENV === "development";

const Providers = ({ children }) => {
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
