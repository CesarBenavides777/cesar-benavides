"use client";

import ThemeProvider from "./ThemeProvider";
import { FaustProvider } from "@faustwp/experimental-app-router/ssr";


const Providers = ({ children }) => {
  return (
    <FaustProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </FaustProvider>
  );
};

export default Providers;
