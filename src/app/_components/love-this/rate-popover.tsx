"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const RatePopover = PopoverPrimitive.Root;

const RatePopoverTrigger = PopoverPrimitive.Trigger;

const RatePopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
  (
    { className, align = "center", children, sideOffset = 4, ...props },
    ref,
  ) => (
    <PopoverPrimitive.Portal>
      <>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "relative z-50 rounded-full border bg-popover px-8 py-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...props}
        >
          {children}
          <PopoverPrimitive.Close className="absolute -bottom-[68px] left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full bg-white p-1.5 shadow-md">
            <X className="size-7" />
          </PopoverPrimitive.Close>
        </PopoverPrimitive.Content>

        <div className="size-full absolute left-0 top-0 z-40 bg-black opacity-25 transition-opacity duration-200" />
      </>
    </PopoverPrimitive.Portal>
  ),
);
RatePopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { RatePopover, RatePopoverTrigger, RatePopoverContent };
