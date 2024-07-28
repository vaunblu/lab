"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, Send, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

export const RatePopoverContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => null,
});

function LoveThisButton() {
  const ctx = React.useContext(RatePopoverContext);
  const [loveThis, setLoveThis] = React.useState(false);

  React.useEffect(() => {
    if (loveThis) {
      const timeout = setTimeout(() => {
        setLoveThis(false);
        ctx.setOpen(false);
      }, 900);

      return () => clearTimeout(timeout);
    }
  }, [loveThis, setLoveThis, ctx.setOpen]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLoveThis(true)}
      className="size-16 relative rounded-full p-2"
    >
      <motion.div
        whileTap={{ y: 5, rotate: 5, transition: { duration: 0.1 } }}
        animate={
          loveThis
            ? {
                y: [5, -35, 0],
                x: [0, -5, 0],
                rotate: [5, -10, 0],
              }
            : {}
        }
        transition={{ bounce: 100, mass: 0.1, duration: 1 }}
      >
        <ThumbsUp className="size-10" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          loveThis
            ? {
                y: [5, -10, -8],
                x: [0, 10, 20],
                rotate: [5, -10, 0],
                opacity: [1, 1, 0],
                scale: [0, 1, 0],
              }
            : {}
        }
        transition={{ bounce: 100, mass: 0.1, duration: 1 }}
        className="size-2 absolute right-2 rounded-full bg-foreground"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          loveThis
            ? {
                y: [5, -20, -8],
                x: [0, 15, 20],
                rotate: [5, -10, 0],
                opacity: [1, 1, 0],
                scale: [0, 1, 0],
              }
            : {}
        }
        transition={{ bounce: 100, mass: 0.1, duration: 1 }}
        className="size-2 absolute right-3 top-3 rounded-full bg-foreground"
      />
    </Button>
  );
}

function RatePopover() {
  const ctx = React.useContext(RatePopoverContext);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
      <Popover.Root open={ctx.open} onOpenChange={ctx.setOpen}>
        <Popover.Trigger>
          <AnimatePresence initial={false}>
            {!ctx.open ? (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="size-14 inline-flex items-center justify-center whitespace-nowrap rounded-full p-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  <ThumbsUp className="size-8 cursor-pointer" />
                </div>
                <p>Rate</p>
              </motion.div>
            ) : (
              <div className="h-[88px] w-[56px]" />
            )}
          </AnimatePresence>
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
                      <LoveThisButton />
                      <p className="text-nowrap">Love this!</p>
                    </div>
                    <Popover.Close className="absolute -bottom-[68px] left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full bg-white p-1.5 shadow-md">
                      <X className="size-7" />
                    </Popover.Close>
                  </motion.div>
                </Popover.Content>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  className="size-full absolute left-0 top-0 z-40 bg-black"
                />
              </>
            </Popover.Portal>
          )}
        </AnimatePresence>
      </Popover.Root>
    </MotionConfig>
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

        <RatePopover />

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
