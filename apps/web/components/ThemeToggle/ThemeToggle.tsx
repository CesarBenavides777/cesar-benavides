"use client";

import * as React from "react";
import { WiDaySunny } from "react-icons-all-files/wi/WiDaySunny";
import { FaMoon } from "react-icons-all-files/fa/FaMoon";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import useSound from "use-sound";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [onSound] = useSound("/assets/sound/on.mp3");
  const [offSound] = useSound("/assets/sound/off.mp3");

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
        theme === "dark" ? onSound() : offSound();
      }}
    >
      <WiDaySunny className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <FaMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
