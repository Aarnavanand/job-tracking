"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none flex items-center justify-center"
    >
      {/* Sun Icon for Light Theme */}
      <Sun
        className={`transition-all duration-300 ease-in-out h-[1.5rem] w-[1.5rem] ${theme === "light" ? "opacity-100" : "opacity-0"}`}
      />
      {/* Moon Icon for Dark Theme */}
      <Moon
        className={`absolute transition-all duration-300 ease-in-out h-[1.5rem] w-[1.5rem] ${theme === "dark" ? "opacity-100" : "opacity-0"} top-0 left-0`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
