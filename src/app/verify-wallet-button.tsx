"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export function VerifyWalletButton() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <motion.div layoutId="wrapper" style={{ borderRadius: 20 }}>
        <Button
          variant="secondary"
          onClick={() => setOpen(true)}
          style={{ borderRadius: 20 }}
        >
          <motion.span layoutId="title">Verify wallet</motion.span>
        </Button>
      </motion.div>

      <AnimatePresence>
        {open ? (
          <motion.div
            layoutId="wrapper"
            className="absolute max-w-sm bg-muted p-4 text-muted-foreground"
            style={{ borderRadius: 20 }}
          >
            <motion.span
              layoutId="title"
              className="absolute left-4 top-4 text-sm"
            >
              Verify wallet
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
              className="space-y-6 pt-8"
            >
              <div>
                <p>Are you sure you want to verify the wallet</p>
                <p className="font-medium">0x123...abc</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  className="w-full rounded-full"
                  onClick={() => setOpen(false)}
                >
                  Verify
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
