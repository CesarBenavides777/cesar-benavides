"use client";

import { ThemeProvider as StyledThemeProvider } from "next-themes";
import type { ReactNode } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StyledThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
