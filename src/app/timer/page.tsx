"use client";

import { GrainyBackground } from "@/components/grainy-background";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Transition,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import svgPhone from "@/assets/iphone-black.svg";
import NumberFlow from "@number-flow/react";
import { Button } from "@/components/ui/button";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

function InnerContent() {
  const ctx = React.useContext(Context);
  const [paused, setPaused] = useState(false);
  const [minutesLeft, setMinutesLeft] = useState(43);
  let interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      setMinutesLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [setMinutesLeft]);

  function handlePauseToggle() {
    console.log(paused);
    if (paused) {
      interval.current = setInterval(() => {
        setMinutesLeft((prev) => prev - 1);
      }, 1000);
      setPaused(false);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
      }
      setPaused(true);
    }
  }

  return (
    <div className="relative isolate h-full w-full rounded-3xl">
      <div className="absolute z-10 grid h-full w-full place-items-center rounded-3xl px-2 py-[58px] pb-2.5">
        <div className="relative grid h-full w-full grid-rows-5 overflow-y-hidden rounded-[48px] bg-[#fafafa]">
          <div className="row-span-3 grid place-items-center">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 font-mono">
                <NumberFlow value={22} className="text-7xl font-medium" />
                <p className="text-5xl font-light">:</p>
                <NumberFlow
                  value={minutesLeft}
                  className="text-7xl font-medium"
                />
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handlePauseToggle}
                  className={cn(
                    "min-w-[73px] rounded-full transition-all active:scale-90",
                    paused &&
                    "bg-[#ced8da]/20 text-primary hover:bg-[#ced8da]/30 hover:text-primary",
                  )}
                >
                  {paused ? "Start" : "Pause"}
                </Button>
                <Button
                  className={cn(
                    "w-full rounded-full bg-[#ced8da]/20 text-primary hover:bg-[#ced8da]/30 hover:text-primary",
                    paused && "bg-primary text-white",
                  )}
                >
                  Stop
                </Button>
              </div>
            </div>
          </div>

          <div className="row-span-2 h-full space-y-2">
            <div className="flex items-center justify-between px-3.5">
              <p className="font-medium">Today&apos;s activity</p>
            </div>
            <ul className="px-2">
              <li>
                <div className="mb-2 flex w-full items-center justify-between rounded-xl bg-[#ced8da]/20 p-3 text-left">
                  <div>
                    <p className="text-xs font-light">Exploration</p>
                    <p className="text-sm font-medium">Mock out timer design</p>
                  </div>
                  <p className="font-medium">45m</p>
                </div>
              </li>
              <li>
                <div className="mb-2 flex w-full items-center justify-between rounded-xl bg-[#ced8da]/20 p-3 text-left">
                  <div>
                    <p className="text-xs font-light">Deep work</p>
                    <p className="text-sm font-medium">
                      Build page and clip path animation
                    </p>
                  </div>
                  <p className="font-medium">1h 30m</p>
                </div>
              </li>
              <li>
                <div className="mb-2 flex w-full items-center justify-between rounded-xl bg-[#ced8da]/20 p-3 text-left">
                  <div>
                    <p className="text-xs font-light">Deep work</p>
                    <p className="text-sm font-medium">Record and edit demo</p>
                  </div>
                  <p className="font-medium">30m</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="absolute bottom-0 left-0 h-1/5 w-full bg-gradient-to-t from-[#fafafa]" />
          <div className="absolute bottom-0 left-0 h-1/5 w-full bg-transparent backdrop-blur-lg [mask:linear-gradient(0deg,rgba(0,0,0,1)_30%,rgba(0,0,0,0)_100%)]" />
        </div>
      </div>

      <div
        className="absolute h-full w-full rounded-[48px] bg-gradient-to-t from-[#53828c]/60 to-[#e5eeee]"
        style={{
          clipPath: `inset(${100 - minutesLeft}% 0 0 0)`,
          transition: "clip-path 1s linear",
        }}
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
          <GrainyBackground
            className="relative flex aspect-square h-screen items-center justify-center transition-colors duration-300"
            grainOpacity={0.12}
            grainContrast={0.7}
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
          </GrainyBackground>
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
