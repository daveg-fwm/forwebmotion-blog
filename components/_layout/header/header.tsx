"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/_base/button/button";
import { Link } from "@/components/_base/link/link";
import { ToggleTheme } from "@/components/_layout/theme/toggle-theme";
import { cn } from "@/utils/_base/utils";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const onMenuClick = (show?: boolean) => {
    setShowMenu((prevState) => show ?? !prevState);
  };

  const MenuIcon = showMenu ? IconX : IconMenu2;

  return (
    <header
      className={cn(
        "fixed left-0 z-10",
        "max-xl:bg-darker-background/99 max-xl:light:border-stone-50 max-xl:bottom-0 max-xl:w-full max-xl:overflow-clip max-xl:border-t max-xl:px-4 max-xl:py-2",
        "max-xl:transition-[height] max-xl:transition-discrete",
        showMenu ? "max-xl:h-auto max-xl:pt-4 max-xl:pb-10" : "max-xl:h-15",
        "xl:top-43.5 xl:left-16 xl:pr-10",
        "2xl:left-[calc(50%-49.5rem)] 2xl:translate-x-20",
      )}
      role="banner"
    >
      <div className="mx-auto w-full max-w-188">
        <a
          className="text-nav-foreground sr-only font-medium focus:not-sr-only focus:absolute focus:-top-20 focus:p-2"
          href="#main-content"
        >
          Skip to main content
        </a>

        <div className="max-xl:flex max-xl:items-center max-xl:justify-between">
          <Link href="/" className="mb-0.5" onClick={() => onMenuClick(false)}>
            <Image
              className="light:invert light:brightness-70"
              src="/images/forwebmotion-logo.svg"
              width="134"
              height="16"
              alt="Forwebmotion homepage"
              priority
            />
          </Link>

          <Button
            variant="ghost"
            size="icon-lg"
            className="xl:hidden"
            onClick={() => onMenuClick()}
          >
            <MenuIcon className="size-5" />
          </Button>
        </div>

        <nav role="navigation" className="my-4 max-xl:mb-6">
          <ul className="text-nav-foreground max-xl:space-y-2">
            <li>
              <Link
                href="/blog"
                variant="underline"
                className="inline-block py-1"
                onClick={() => onMenuClick(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="#"
                variant="underline"
                className="inline-block py-1"
                onClick={() => onMenuClick(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        <ToggleTheme />
      </div>
    </header>
  );
}
