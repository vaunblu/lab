"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, Send, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export const RatePopoverContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => null,
});

function RatePopover() {
  const ctx = React.useContext(RatePopoverContext);

  return (
    <Popover.Root open={ctx.open} onOpenChange={ctx.setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-14 rounded-full p-2"
        >
          <ThumbsUp
            className={cn(
              "size-8 cursor-pointer transition-opacity",
              ctx.open ? "opacity-0" : "opacity-100",
            )}
          />
        </Button>
      </Popover.Trigger>

      <AnimatePresence initial={false}>
        {ctx.open && (
          <Popover.Portal forceMount>
            <>
              <Popover.Content
                side="top"
                sideOffset={20}
                onInteractOutside={(e) => e.preventDefault()}
                asChild
              >
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  className="relative z-50 flex items-end gap-4 rounded-full border bg-popover px-8 pb-4 pt-3 font-semibold text-popover-foreground shadow-md outline-none"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-16 rounded-full p-2"
                    >
                      <ThumbsDown className="size-10" />
                    </Button>
                    <p className="text-nowrap">Not for me</p>
                  </div>
                  <div className="flex flex-col items-center gap-2.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-16 rounded-full p-2"
                    >
                      <ThumbsUp className="size-10" />
                    </Button>
                    <p className="text-nowrap">I like this</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-16 rounded-full p-2"
                    >
                      <ThumbsUp className="size-10" />
                    </Button>
                    <p className="text-nowrap">Love this!</p>
                  </div>
                  <Popover.Close className="absolute -bottom-[68px] left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full bg-white p-1.5 shadow-md">
                    <X className="size-7" />
                  </Popover.Close>
                </motion.div>
              </Popover.Content>

              <div className="size-full absolute left-0 top-0 z-40 bg-black opacity-25 transition-opacity duration-200" />
            </>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}

export function LoveThis() {
  const [open, setOpen] = React.useState(false);

  return (
    <RatePopoverContext.Provider value={{ open, setOpen }}>
      <div className="flex items-end gap-14 font-semibold">
        <div className="flex flex-col items-center gap-2">
          <Button variant="ghost" size="icon" className="size-14 rounded-full">
            <Check className="size-8" />
          </Button>
          <p>My List</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <RatePopover />
          <p
            className={cn(
              "transition-opacity",
              open ? "opacity-0" : "opacity-100",
            )}
          >
            Rate
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-14 rounded-full p-2"
          >
            <Send className="size-7 translate-y-0.5" />
          </Button>
          <p>Share</p>
        </div>
      </div>
    </RatePopoverContext.Provider>
  );
}
