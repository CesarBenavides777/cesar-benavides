"use client";
import { useTheme } from "next-themes";

const DynamicFavicon = () => {
  const { theme } = useTheme();

  return (
    <>
      <link
        rel="icon"
        type="image/icon"
        href={`/${theme === "dark" ? "favicon-dark" : "favicon"}.ico`}
      />
    </>
  );
};

export default DynamicFavicon;
