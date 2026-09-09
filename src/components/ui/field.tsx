import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

const fieldBase = [
  "w-full rounded-2xl px-4 text-sm text-ice",
  "glass border-ice/10 placeholder:text-mist/60",
  "transition-[border-color,box-shadow,background-color] duration-300 ease-glass",
  "hover:border-ice/18",
  "focus:border-aqua/45 focus:bg-ice/[0.06] focus:outline-none",
  "focus:shadow-[0_0_0_1px_rgba(20,184,166,.35),0_0_28px_-6px_rgba(20,184,166,.35)]",
  "aria-[invalid=true]:border-red-400/50 aria-[invalid=true]:shadow-[0_0_0_1px_rgba(248,113,113,.35)]",
  "disabled:opacity-50",
].join(" ");

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(fieldBase, "h-12", className)} {...props} />;
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(fieldBase, "min-h-32 resize-y py-3.5 leading-relaxed", className)}
      {...props}
    />
  );
});

/**
 * Native select, styled. A custom listbox would add a dependency and a
 * keyboard-behaviour surface to maintain for no gain here.
 */
export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          fieldBase,
          "h-12 cursor-pointer appearance-none pr-11",
          "[&_option]:bg-[#111827] [&_option]:text-ice [&_option]:py-1.5 [&_optgroup]:bg-[#0b1120] [&_optgroup]:text-aqua [&_optgroup]:font-semibold [&_optgroup]:not-italic",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-4 top-1/2 size-3.5 -translate-y-1/2 text-mist"
      >
        <path
          d="M4 6l4 4 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
});

export function Label({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mist",
        className,
      )}
      {...props}
    />
  );
}

/** Inline validation message. Announced politely so it never interrupts typing. */
export function FieldError({ children }: { children?: string }) {
  if (!children) return null;

  return (
    <p role="alert" className="mt-2 text-xs text-red-300/90">
      {children}
    </p>
  );
}
