import { type VariantProps } from "class-variance-authority";
import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";

import { buttonVariants } from "@/components/_base/button/button-variants";
import { cn } from "@/utils/_base/utils";

interface LinkProps extends NextLinkProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children: React.ReactNode;
  href: NextLinkProps["href"] & string;
  as?: "a";
  variant?: "underline" | "icon";
  buttonVariant?: VariantProps<typeof buttonVariants>;
}

const variantClassName = {
  underline: "font-medium hover:underline underline-offset-[3px]",
  icon: "inline-flex gap-x-2 items-center font-semibold text-stone-100 [&>svg]:translate-x-0 hover:[&>svg]:translate-x-1 [&>svg]:transition-transform",
};

export function Link({ className, children, as, variant, buttonVariant, ...props }: LinkProps) {
  const Component = as ?? NextLink;

  return (
    <Component
      className={cn(
        variant && variantClassName[variant],
        buttonVariant && buttonVariants(buttonVariant),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
