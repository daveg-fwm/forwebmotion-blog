import Image from "next/image";

import { Link } from "@/components/_base/link/link";
import { ToggleTheme } from "@/components/theme/toggle-theme";

export function Header() {
  return (
    <header className="fixed top-43.5 left-31.5 z-10" role="banner">
      <a
        className="sr-only font-medium text-stone-300 focus:not-sr-only focus:absolute focus:-top-20"
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
        />
      </Link>

      <nav role="navigation" className="my-3.5">
        <ul className="text-stone-300">
          <li>
            <Link href="#" className="block py-1 hover:underline">
              Posts
            </Link>
          </li>
          <li>
            <Link href="#" className="block py-1 hover:underline">
              About
            </Link>
          </li>
        </ul>
      </nav>

      <ToggleTheme />
    </header>
  );
}
