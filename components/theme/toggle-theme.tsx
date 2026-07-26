"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/_base/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/_base/dropdown-menu/dropdown-menu";

export function ToggleTheme() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon-lg" className="relative overflow-clip p-0">
            <IconSun className="size-6 translate-0 transition-all duration-1000 dark:translate-full" />
            <IconMoon className="absolute size-6 -translate-full transition-all duration-1000 dark:translate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
