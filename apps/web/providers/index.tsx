"use client";

import ThemeProvider from "./ThemeProvider";
import { ApolloProvider } from "./apollo/ssr";

const Providers = ({ children }) => {

  return (
    <ApolloProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ApolloProvider>
  );
};

export default Providers;
