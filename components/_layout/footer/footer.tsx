import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { getIntlayer } from "next-intlayer";

import { Link } from "@/components/_base/link/link";

export function Footer() {
  const content = getIntlayer("footer");

  return (
    <footer role="contentinfo" className="bg-darker-background py-8.5">
      <div className="mx-auto flex w-full max-w-188 items-center justify-between 2xl:max-w-198">
        <div className="flex items-center gap-x-2">
          <p className="text-xs font-semibold tracking-widest text-stone-200">{content.brand}</p>
          <span className="h-1 w-1 rounded-full bg-stone-400" />
          <p className="text-sm text-stone-400">{content.slogan}</p>
        </div>

        <div className="flex text-stone-400">
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
