"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import imageBird from "@/assets/bird.jpg";
import Image from "next/image";
import React from "react";
import { X } from "lucide-react";

export default function HomePage() {
  const [open, setOpen] = React.useState(false);
  const [closeHovered, setCloseHovered] = React.useState(false);

  const containerVariants = {
    hover: (custom: { open: boolean }) => ({
      scale: !custom.open ? 1.05 : 1,
    }),
  };

  const blurVariants = {
    hover: (custom: { open: boolean }) => ({
      height: !custom.open ? "60%" : "33%",
    }),
  };

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}>
      <div className="flex h-screen items-center justify-center">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, y: 5 }}
              className="size-8 fixed left-1/2 top-[145px] flex -translate-x-1/2 flex-col items-center justify-center gap-2"
            >
              <motion.div
                animate={
                  closeHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }
                }
              >
                <p className="rounded-full bg-[#374a36]/30 px-2 py-0.5 text-[12px] font-medium text-[#1b2522]">
                  Close
                </p>
              </motion.div>
              <motion.div
                onHoverStart={() => setCloseHovered(true)}
                onHoverEnd={() => setCloseHovered(false)}
                onClick={() => {
                  setOpen(false);
                  setCloseHovered(false);
                }}
              >
                <X className="size-6 text-[#374a36]/50" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={
            open
              ? {
                  width: 900,
                  height: 600,
                  scale: closeHovered ? 0.95 : 1,
                }
              : { width: 300, height: 300 }
          }
          whileHover="hover"
          variants={containerVariants}
          custom={{ open }}
          onClick={() => setOpen((prevState) => !prevState)}
          data-open={open}
          className="relative overflow-hidden rounded-[48px] data-[open=false]:shadow-[-16px_-16px_64px_-32px_rgba(56,76,55,1),0_32px_64px_-32px_rgba(53,113,201,0.8),32px_0_64px_-32px_rgba(153,170,4,0.6)]"
        >
          <Image
            src={imageBird}
            alt="Bird"
            className="size-full object-cover"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 h-1/2 w-full bg-transparent backdrop-blur-md [mask:linear-gradient(0deg,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_100%)]"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            variants={blurVariants}
            custom={{ open }}
            className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-[#313f2d]"
          />

          <div className="absolute bottom-6 left-6 space-y-1.5">
            <p className="whitespace-pre-wrap text-lg font-medium leading-tight text-white">{`Bold New Contemporary\nArt Showcase`}</p>
            <p className="text-sm font-medium uppercase tracking-wider text-white/60">
              See new media evolve
            </p>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
