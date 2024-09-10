"use client";

import { motion, MotionConfig, Transition } from "framer-motion";
import React from "react";
import imageIJustNeed from "@/assets/i-just-need-daniel.webp";
import Image from "next/image";
import MotionNumber from "motion-number";

// NOTE: TOOK 2 HOURS 30 MINS

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

function CD() {
  const ctx = React.useContext(Context);
  const isPressed = ctx.status === "pressed";
  const [active, setActive] = React.useState(false);

  return (
    <motion.div
      initial={{ rotate: 0, x: "-50%", y: -245, borderRadius: 250 }}
      animate={
        isPressed
          ? {
              y: -245,
              transition: { ...transition, duration: 1.2 },
            }
          : active
            ? {
                rotate: 0,
                width: "100%",
                height: "100%",
                y: 0,
                borderRadius: 0,
                border: 0,
                transition: { ...transition, duration: 1.2 },
              }
            : {
                rotate: 360,
                y: -245,
                transition: {
                  ease: "linear",
                  duration: 5,
                  repeat: Infinity,
                },
              }
      }
      whileHover={{
        scale: 1.03,
      }}
      onTapStart={() => {
        ctx.setStatus("pressed");
      }}
      onTap={() => {
        setActive((prev) => !prev);
        ctx.setStatus("idle");
      }}
      onTapCancel={() => {
        setActive(false);
        ctx.setStatus("idle");
      }}
      className="size-[500px] absolute left-1/2 z-10 flex  origin-center select-none items-center justify-center overflow-hidden border-2 border-[#a89f9f] bg-gray-400 shadow-[0_0_200px_-20px_rgba(0,0,0,0.6)]"
    >
      <Image
        src={imageIJustNeed}
        alt="I Just Need"
        className="pointer-events-none select-none object-cover"
      />
      <motion.div
        animate={active ? { opacity: 0 } : {}}
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        <div className="size-[150px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500/20 backdrop-blur-sm" />
        <div className="size-[143px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-dotted border-gray-200/10" />
        <div className="size-[127px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white bg-[#9799a5]" />
        <div className="size-[85px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9c2c7]" />
        <div className="size-[70px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9c2c7]" />
        <div className="size-[67px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e3dee4]" />
        <div className="size-[60px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#a6a4a5] bg-[#bebcba] shadow-[0_0_24px_-12px_rgba(0,0,0,0.25)_inset]" />
      </motion.div>
    </motion.div>
  );
}

export default function HomePage() {
  const [status, setStatus] = React.useState("idle");
  const [time, setTime] = React.useState(10);
  const isNotIdle = status !== "idle";

  React.useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setStatus("idle");
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setStatus]);

  React.useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [setTime]);

  return (
    <Context.Provider value={{ status, setStatus }}>
      <MotionConfig transition={transition}>
        <div className="flex h-screen items-center justify-center bg-[#f2f2f2]">
          <div className="size-[500px] relative overflow-hidden rounded-[100px] border border-[#cacaca] bg-[#e3e3e3] font-medium tracking-tight shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.06)]">
            <CD />
            <motion.div
              animate={isNotIdle ? { scale: 0.95, filter: "blur(4px)" } : {}}
              className="absolute bottom-10 flex w-full flex-col items-center gap-5"
            >
              <div className="relative flex h-8 w-fit items-center justify-center gap-1">
                <motion.div
                  initial={{ height: 16 }}
                  animate={{
                    height: 4,
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1,
                      type: "linear",
                    },
                  }}
                  className="h-8 w-1 rounded-full bg-[#999592]"
                />
                <motion.div
                  initial={{ height: 4 }}
                  animate={{
                    height: 32,
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1.5,
                      type: "linear",
                    },
                  }}
                  className="h-8 w-1 rounded-full bg-[#999592]"
                />
                <motion.div
                  initial={{ height: 12 }}
                  animate={{
                    height: 4,
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.8,
                      type: "linear",
                    },
                  }}
                  className="h-3 w-1 rounded-full bg-[#999592]"
                />
                <motion.div
                  initial={{ height: 4 }}
                  animate={{
                    height: 24,
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1.8,
                      type: "linear",
                    },
                  }}
                  className="h-6 w-1 rounded-full bg-[#999592]"
                />
                <motion.div
                  initial={{ height: 8 }}
                  animate={{
                    height: 4,
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.6,
                      type: "linear",
                    },
                  }}
                  className="h-2 w-1 rounded-full bg-[#999592]"
                />
              </div>

              <div className="flex flex-col items-center gap-2 font-mono text-2xl">
                <p className="text-[#a09c99]">Daniel Allan</p>
                <p className="text-[#272622]">I Just Need (with Lyrah)</p>
                <div className="relative h-[3px] w-9 bg-[#cbc7c6]">
                  <motion.div
                    initial={{ width: "45%" }}
                    animate={{ width: "50%", transition: { duration: 12 } }}
                    className="absolute left-0 top-0 h-full bg-[#7a787a]"
                  />
                </div>
                <p className="text-[#272622]">
                  <span className="text-[#272622]">
                    1:
                    <MotionNumber value={time} />
                  </span>
                  <span className="px-[0.7ch] text-[#a5a3a1]">/</span>
                  <span className="text-[#a5a3a1]">2:26</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </MotionConfig>
    </Context.Provider>
  );
}
