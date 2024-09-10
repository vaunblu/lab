"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
} from "framer-motion";
import React from "react";
import Image from "next/image";
import svgPhone from "@/assets/iphone-black.svg";
import imageForestSky from "@/assets/forest-sky.jpg";

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

const transition: Transition = { type: "spring", bounce: 0, duration: 3 };

function InnerContent() {
  const ctx = React.useContext(Context);
  const isActive = ctx.status === "active";

  return (
    <MotionConfig transition={transition}>
      <div
        onClick={() => ctx.setStatus("active")}
        className="relative flex h-full flex-col overflow-hidden rounded-[51px] bg-[#FAFAFA] text-[#1F1F1F]"
      >
        <AnimatePresence>
          {isActive && (
            <div className="size-full absolute left-0 top-0 z-10 flex flex-col items-center justify-center text-center text-white">
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { ...transition, delay: 1.6 },
                }}
                exit={{ opacity: 0, y: 20 }}
                className="text-balance px-10 font-serif text-xl font-medium leading-relaxed"
              >
                Break free.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { ...transition, delay: 2.8 },
                }}
                exit={{ opacity: 0, y: 20 }}
                className="text-balance flex items-start gap-[1ch] px-10 font-serif text-xl font-medium leading-relaxed"
              >
                <p className="pt-px leading-5">Start</p>
                <div className="font-display text-2xl">
                  <p className="leading-5">creating.</p>
                  <svg
                    width="72"
                    height="10"
                    viewBox="0 0 240 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M1 29.5003C63.5 8.50032 198.6 -20.8997 239 29.5003"
                      fill="transparent"
                      stroke="white"
                      stroke-width="4"
                      stroke-linecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ pathLength: 1 }}
                      transition={{ ...transition, delay: 3.2, duration: 2 }}
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="size-full absolute left-0 top-0 z-10 flex flex-col items-center justify-between pb-12 pt-28 text-center">
          <AnimatePresence>
            {!isActive && (
              <>
                <div className="space-y-10">
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                    transition={{ ...transition, duration: 2 }}
                    className="font-display text-5xl font-bold tracking-tighter"
                  >
                    Stuck?
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                    transition={{ ...transition, delay: 0.1, duration: 1.6 }}
                    className="px-12 font-serif text-xl font-medium leading-relaxed"
                  >
                    The trees tower above, their branches weaving into a
                    suffocating canopy, blocking out the sunlight. Every step
                    feels heavy, the ground soft and unsteady, pulling you
                    deeper into the earth.
                  </motion.p>
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.15 } }}
                  transition={{ ...transition, duration: 1.6 }}
                  className="z-10 rounded-full border border-white/20 bg-gradient-to-b from-white/80 from-20% to-[#DDDDDD]/80 px-4 py-1.5 shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.1)]"
                >
                  Start exploring
                </motion.button>
              </>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ y: 100, scale: 1 }}
          animate={isActive ? { y: 490, scale: 1.5 } : {}}
          className="size-full relative h-[150vh] w-full"
        >
          <Image
            src={imageForestSky}
            alt="Forest Sky"
            className="size-full scale-[1.5]"
          />
        </motion.div>

        <div className="absolute left-0 top-0 h-1/4 w-full backdrop-blur-2xl [mask:linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]">
          <div className="size-full absolute left-0 top-0 opacity-30 [mask:linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)] [filter:url(#grain)]" />
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          animate={isActive ? { opacity: 0 } : {}}
          className="absolute left-0 top-0 h-2/3 w-full backdrop-blur-lg [mask:linear-gradient(180deg,rgba(0,0,0,1)_80%,rgba(0,0,0,0)_100%)]"
        >
          <div className="size-full absolute left-0 top-0 opacity-30 [filter:url(#grain)] [mask:linear-gradient(180deg,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)]" />
        </motion.div>

        <motion.div
          initial={{
            backgroundImage:
              "linear-gradient(0deg, rgba(47, 58, 36, 0.7) 0%, rgba(47, 58, 36, 0) 100%)",
          }}
          animate={
            isActive
              ? {
                  backgroundImage:
                    "linear-gradient(0deg, rgba(255, 255, 255, 0.7) 0%, rgba(0, 0, 0, 0) 100%)",
                  transition: { delay: 0.5, duration: 2.5 },
                }
              : {}
          }
          className="absolute bottom-0 left-0 h-1/4 w-full backdrop-blur-2xl [mask:linear-gradient(0deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]"
        >
          <div className="size-full absolute left-0 top-0 opacity-30 [filter:url(#grain)] [mask:linear-gradient(0deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]" />
        </motion.div>
      </div>
    </MotionConfig>
  );
}

export default function HomePage() {
  const [status, setStatus] = React.useState("idle");

  React.useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setStatus("idle");
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setStatus]);

  return (
    <Context.Provider value={{ status, setStatus }}>
      <main className="flex h-screen select-none items-center justify-center overflow-hidden">
        <motion.div
          initial={{
            backgroundImage:
              "linear-gradient(180deg, rgba(155, 186, 204, 0.5) 20%, rgba(213, 208, 199, 0.5), rgba(47, 58, 36, 0.5) 70%)",
          }}
          animate={
            status === "active"
              ? {
                  backgroundImage:
                    "linear-gradient(157.5deg, rgba(155, 186, 204, 0.7) 10%, rgba(213, 208, 199, 0), rgba(47, 58, 36, 0) 100%)",
                }
              : {}
          }
          transition={transition}
          className={cn(
            "relative flex aspect-square h-screen items-center justify-center transition-colors duration-300",
          )}
        >
          <div className="size-full absolute left-0 top-0 opacity-30 [filter:url(#grain)]" />

          <div className="absolute left-1/2 top-1/2 z-20 h-[814px] w-[376px] -translate-x-1/2 -translate-y-1/2">
            <InnerContent />
          </div>

          <div className="fixed bottom-[72px] left-1/2 z-50 h-1.5 w-[360px] -translate-x-1/2 px-28">
            <div className="size-full rounded-3xl bg-black" />
          </div>

          <Image
            src={svgPhone}
            alt="iphone mock"
            className="pointer-events-none relative z-30"
          />
        </motion.div>
      </main>

      {/* Grain SVG */}
      <svg className="hidden">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2.65"
            numOctaves="6"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
    </Context.Provider>
  );
}
