"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Transition,
} from "framer-motion";
import React from "react";
import Image from "next/image";
import svgPhone from "@/assets/iphone-black.svg";

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

const transition: Transition = {
  type: "tween",
  ease: "easeInOut",
  duration: 2,
};

function InnerContent() {
  const ctx = React.useContext(Context);
  const isActive = ctx.status === "active";

  return (
    <div
      onClick={() => ctx.setStatus("active")}
      className="relative flex h-full flex-col overflow-hidden rounded-[51px] bg-[#000000] py-20"
    >
      <motion.div
        initial={{
          boxShadow: "0 0.1px 0.1px 0.1px rgba(255,255,255,0)",
        }}
        animate={
          isActive
            ? {
                boxShadow: "0 80px 80px -40px rgba(255,255,255,1)",
              }
            : {}
        }
        className="absolute -top-40 left-0 h-40 w-full bg-white"
      />

      <motion.div
        initial={{
          boxShadow: "0.1px 0 0.1px 0.1px rgba(255,255,255,0)",
        }}
        animate={
          isActive
            ? {
                boxShadow: "-80px 0 80px -40px rgba(255,255,255,1)",
              }
            : {}
        }
        className="absolute -right-40 top-0 h-full w-40 bg-white"
      />

      <motion.div
        initial={{
          boxShadow: "0 0.1px 0.1px 0.1px rgba(255,255,255,0)",
        }}
        animate={
          isActive
            ? {
                boxShadow: "0 -80px 80px -40px rgba(255,255,255,1)",
              }
            : {}
        }
        className="absolute -bottom-40 left-0 h-40 w-full bg-white"
      />

      <motion.div
        initial={{
          boxShadow: "0.1px 0 0.1px 0.1px rgba(255,255,255,0)",
        }}
        animate={
          isActive
            ? {
                boxShadow: "80px 0 80px -40px rgba(255,255,255,1)",
              }
            : {}
        }
        className="absolute -left-40 top-0 h-full w-40 bg-white"
      />
    </div>
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
      <MotionConfig transition={transition}>
        <main className="flex h-screen select-none items-center justify-center overflow-hidden">
          <div
            className={cn(
              "relative flex aspect-square h-screen items-center justify-center bg-black",
            )}
          >
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
          </div>
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
