"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import React from "react";
import Image from "next/image";
import svgPhone from "@/assets/iphone-black.svg";

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

function InnerContent() {
  const ctx = React.useContext(Context);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[51px] bg-[#FAFAFA] text-[#1F1F1F]">
      <p>Lab</p>
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
      <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
        <main className="flex h-screen select-none items-center justify-center overflow-hidden">
          <div
            className={cn(
              "relative flex aspect-square h-screen items-center justify-center bg-gradient-to-br from-[#FFFFFF] from-20% to-[#EEEEEE] transition-colors duration-300",
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
