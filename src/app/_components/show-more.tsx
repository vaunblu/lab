"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as React from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Button } from "@/components/ui/button";

function ShowMoreDialog(props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog.Root open={props.open} onOpenChange={props.setOpen}>
      <AnimatePresence>
        {props.open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/80"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild onOpenAutoFocus={(e) => e.preventDefault()}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed left-[50%] top-[50%] z-50 h-[80vh] w-full max-w-screen-2xl translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg sm:rounded-lg"
              >
                <div className="space-y-4 p-6">
                  <div className="relative h-[36px]">
                    <Dialog.Title asChild>
                      <motion.h3
                        layoutId="title"
                        className="absolute left-0 top-0 font-semibold leading-none"
                      >
                        Pages
                      </motion.h3>
                    </Dialog.Title>
                    <Dialog.Description asChild>
                      <motion.p
                        layoutId="subtitle"
                        className="absolute left-0 top-4 text-sm font-medium text-muted-foreground"
                      >
                        17 unique pages viewed
                      </motion.p>
                    </Dialog.Description>
                  </div>

                  <motion.div
                    layoutId="data"
                    className="flex w-full flex-col gap-y-1"
                  >
                    <div className="h-7 w-[80%] rounded bg-[#c2e2fb]" />
                    <div className="h-7 w-[30%] rounded bg-[#c2e2fb]" />
                    <div className="h-7 w-[23%] rounded bg-[#c2e2fb]" />
                    <div className="h-7 w-[22%] rounded bg-[#c2e2fb]" />
                    <div className="h-7 w-[20%] rounded bg-[#c2e2fb]" />
                    <div className="h-7 w-[19%] rounded bg-[#c2e2fb]" />
                    <div className="h-7 w-[19%] rounded bg-[#c2e2fb]" />
                    <div className="h-7 w-[18%] rounded bg-[#c2e2fb]" />
                    <div className="h-7 w-[16%] rounded bg-[#c2e2fb]" />
                    <div className="h-7 w-[15%] rounded bg-[#c2e2fb]" />
                  </motion.div>
                </div>

                <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export function ShowMore() {
  const [open, setOpen] = React.useState(false);

  return (
    <MotionConfig transition={{ duration: 0.2 }}>
      <ShowMoreDialog open={open} setOpen={setOpen} />
      <motion.div className="w-full max-w-lg space-y-4 rounded-lg bg-background p-5 shadow-lg">
        <div className="relative h-[36px]">
          <motion.h3
            layoutId="title"
            className="absolute left-0 top-0 font-semibold leading-none"
          >
            Pages
          </motion.h3>
          <motion.p
            layoutId="subtitle"
            className="absolute left-0 top-3.5 text-sm font-medium text-muted-foreground"
          >
            17 unique pages viewed
          </motion.p>
        </div>

        <motion.div layoutId="data" className="space-y-1">
          <div className="h-7 w-[80%] rounded bg-[#c2e2fb]" />
          <div className="h-7 w-[30%] rounded bg-[#c2e2fb]" />
          <div className="h-7 w-[23%] rounded bg-[#c2e2fb]" />
          <div className="h-7 w-[22%] rounded bg-[#c2e2fb]" />
          <div className="h-7 w-[20%] rounded bg-[#c2e2fb]" />
          <div className="h-7 w-[19%] rounded bg-[#c2e2fb]" />
          <div className="h-7 w-[19%] rounded bg-[#c2e2fb]" />
          <div className="h-7 w-[18%] rounded bg-[#c2e2fb]" />
          <div className="h-7 w-[16%] rounded bg-[#c2e2fb]" />
          <div className="h-7 w-[15%] rounded bg-[#c2e2fb]" />
        </motion.div>

        <div className="flex items-center justify-center">
          <Button
            onClick={() => setOpen(true)}
            variant="ghost"
            className="h-9 w-full text-muted-foreground"
          >
            Show more (7)
          </Button>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
