"use client";

import { Button } from "@/components/ui/button";
import { Sun } from "@/components/icons/Sun";
import { Moon } from "@/components/icons/Moon";

export function ThemeToggle() {
  return (
    <Button 
      variant="default" 
      size="icon"
      onClick={() => {
        const theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', theme);
      }}
    >
      <span className="sr-only">Toggle theme</span>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
