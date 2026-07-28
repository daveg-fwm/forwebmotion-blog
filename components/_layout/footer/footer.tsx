import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { getIntlayer } from "next-intlayer";

import { Link } from "@/components/_base/link/link";

export function Footer() {
  const content = getIntlayer("footer");

  return (
    <footer role="contentinfo" className="bg-darker-background pt-8.5 pb-23.5 xl:pb-8.5">
      <div className="mx-auto flex w-full max-w-196 items-center justify-between gap-x-6 px-4 2xl:max-w-206">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <p className="text-xs font-semibold tracking-widest text-stone-900 dark:text-stone-200">
            {content.brand}
          </p>
          <span className="mt-0.5 h-1 w-1 self-center rounded-full bg-stone-700 dark:bg-stone-400" />
          <p className="text-sm text-stone-700 dark:text-stone-400">{content.slogan}</p>
        </div>

        <div className="flex">
          <Link
            as="a"
            buttonVariant={{ variant: "ghost", size: "icon-lg" }}
            href="https://github.com/daveg-fwm/"
            target="_blank"
            rel="noopener"
          >
            <IconBrandGithub className="size-6" />
          </Link>
          <Link
            as="a"
            buttonVariant={{ variant: "ghost", size: "icon-lg" }}
            href="https://www.linkedin.com/in/daveg-fwm/"
            target="_blank"
            rel="noopener"
          >
            <IconBrandLinkedin className="size-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
