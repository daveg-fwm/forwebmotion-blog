import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";

import { cn } from "@/utils/_base/utils";

interface LinkProps extends NextLinkProps {
  className?: string;
  children: React.ReactNode;
  href: NextLinkProps["href"] & string;
  as?: "a";
  variant?: "underline" | "icon";
}

const variantClassName = {
  underline: "font-medium hover:underline",
  icon: "inline-flex gap-x-2 items-center font-semibold text-stone-100",
};

export function Link({ className, children, as, variant, ...props }: LinkProps) {
  const Component = as ?? NextLink;

  return (
    <Component className={cn(variant && variantClassName[variant], className)} {...props}>
      {children}
    </Component>
  );
}
