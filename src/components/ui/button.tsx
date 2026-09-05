import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium tracking-[-0.01em] rounded-pill isolate overflow-hidden",
    "transition-[transform,box-shadow,background-color,border-color,color] duration-400 ease-glass",
    "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-aqua",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-400",
  ].join(" "),
  {
    variants: {
      variant: {
        /** The one loud element on a page. Reserve for the primary path. */
        primary: [
          "text-abyss font-semibold",
          "bg-linear-to-r from-ice via-ice to-ice/88",
          "shadow-[0_1px_0_0_rgba(248,250,252,.6)_inset,0_18px_40px_-16px_rgba(37,99,235,.55)]",
          "hover:shadow-[0_1px_0_0_rgba(248,250,252,.8)_inset,0_22px_54px_-14px_rgba(20,184,166,.6)]",
        ].join(" "),
        /** Default action surface — frosted, sits inside glass layouts. */
        glass: [
          "glass glass-rim text-ice",
          "hover:border-ice/22 hover:bg-ice/[0.07]",
        ].join(" "),
        /** Brand-forward alternative to primary, used on dark washes. */
        brand: [
          "text-ice font-semibold border border-ice/14",
          "bg-linear-to-r from-electric to-aqua",
          "shadow-[0_18px_44px_-18px_rgba(37,99,235,.75)]",
          "hover:shadow-[0_22px_54px_-16px_rgba(20,184,166,.8)]",
        ].join(" "),
        ghost: "text-mist hover:text-ice hover:bg-ice/[0.05]",
        link: "text-ice underline-offset-4 hover:underline rounded-none px-0",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem] [&_svg]:size-3.5",
        md: "h-11 px-5 text-sm [&_svg]:size-4",
        lg: "h-13 px-7 text-[0.9375rem] [&_svg]:size-4",
        icon: "size-11 [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "glass", size: "md" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, children, ...props },
  ref,
) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
});

export { buttonVariants };
