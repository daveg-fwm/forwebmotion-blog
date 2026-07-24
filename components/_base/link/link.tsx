import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";

import { cn } from "@/utils/_base/utils";

interface LinkProps extends NextLinkProps {
  className?: string;
  children: React.ReactNode;
  href: NextLinkProps["href"] & string;
  as?: "a";
}

export function Link({ className, children, as, ...props }: LinkProps) {
  const Component = as ?? NextLink;

  return (
    <Component className={cn("font-medium", className)} {...props}>
      {children}
    </Component>
  );
}
