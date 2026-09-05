"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        "group/item relative overflow-hidden rounded-2xl glass glass-rim",
        "transition-[border-color,background-color] duration-500 ease-glass",
        "data-[state=open]:border-aqua/25 data-[state=open]:bg-ice/[0.055]",
        className,
      )}
      {...props}
    />
  );
});

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-start justify-between gap-6 px-6 py-5 text-left",
          "font-display text-[1.0625rem] font-medium tracking-[-0.015em] text-ice/90",
          "transition-colors duration-300 hover:text-ice",
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        <span
          aria-hidden
          className={cn(
            "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-ice/12 text-mist",
            "transition-[transform,color,border-color,background-color] duration-500 ease-glass",
            "group-data-[state=open]/item:rotate-45 group-data-[state=open]/item:border-aqua/40",
            "group-data-[state=open]/item:bg-aqua/12 group-data-[state=open]/item:text-ice",
          )}
        >
          <Plus className="size-3.5" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

export const AccordionContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden",
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      )}
      {...props}
    >
      <div className={cn("px-6 pb-6 pt-0 text-sm leading-relaxed text-dim", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});
