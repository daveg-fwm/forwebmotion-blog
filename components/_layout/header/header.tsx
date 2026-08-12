"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useIntlayer } from "next-intlayer";
import { useState } from "react";

import { Button } from "@/components/_base/button/button";
import { Link } from "@/components/_base/link/link";
import { ToggleTheme } from "@/components/_layout/theme/toggle-theme";
import { cn } from "@/utils/_base/utils";

export function Header() {
  const content = useIntlayer("header");
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  const onMenuClick = (show?: boolean) => {
    setShowMenu((prevState) => show ?? !prevState);
  };

  const MenuIcon = showMenu ? IconX : IconMenu2;

  return (
    <header
      className={cn(
        "fixed left-0 z-10",
        "max-xl:bg-darker-background/99 max-xl:light:border-stone-50 max-xl:bottom-0 max-xl:w-full max-xl:overflow-clip max-xl:border-t max-xl:px-4 max-xl:py-2",
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
          {content.skipLink}
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
            aria-expanded={showMenu}
            aria-controls="main-navigation"
          >
            <MenuIcon className="size-5" aria-hidden="true" />
            <span className="sr-only">{content.menuButton}</span>
          </Button>
        </div>

        <nav id="main-navigation" role="navigation" className="my-4 max-xl:mb-6">
          <ul className="text-nav-foreground max-xl:space-y-2">
            {content.navLinks.map((label) => {
              const href = `/${label.toLocaleLowerCase()}`;
              const isActive = pathname === href;

              return (
                <li key={label}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    variant="underline"
                    className={cn("inline-block py-1", isActive && "text-stone-500")}
                    onClick={() => onMenuClick(false)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <ToggleTheme />
      </div>
    </header>
  );
}
