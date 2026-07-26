import Image from "next/image";

import { Link } from "@/components/_base/link/link";
import { ToggleTheme } from "@/components/theme/toggle-theme";

export function Header() {
  return (
    <header
      className="bg-background/90 fixed top-43.5 left-16 z-10 pr-10 2xl:left-[calc(50%-49.5rem)] 2xl:translate-x-20"
      role="banner"
    >
      <a
        className="sr-only font-medium text-stone-300 focus:not-sr-only focus:absolute focus:-top-20 focus:p-2"
        href="#main-content"
      >
        Skip to main content
      </a>

      <Link href="/">
        <Image
          src="/images/forwebmotion-logo.svg"
          width="134"
          height="16"
          alt="Forwebmotion homepage"
          priority
        />
      </Link>

      <nav role="navigation" className="my-4">
        <ul className="text-stone-300">
          <li>
            <Link href="#" variant="underline" className="inline-block py-1">
              Posts
            </Link>
          </li>
          <li>
            <Link href="#" variant="underline" className="inline-block py-1">
              About
            </Link>
          </li>
        </ul>
      </nav>

      <ToggleTheme />
    </header>
  );
}
