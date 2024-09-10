"use client";

import { motion, MotionConfig, Transition, useSpring } from "framer-motion";
import React from "react";
import imageThunderBg from "@/assets/thunder-bg.png";
import imageAzura from "@/assets/azura.png";
import Image from "next/image";

// NOTE: TOOK 90 MINS

const transition: Transition = {
  type: "spring",
  damping: 80,
  stiffness: 100,
};

function SpringNumber(props: { value: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const springValue = useSpring(0, {
    damping: 80,
    stiffness: 100,
  });

  React.useEffect(() => {
    springValue.set(props.value);
  }, [springValue]);

  springValue.on("change", (latest) => {
    if (ref.current) {
      ref.current.textContent = Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumSignificantDigits: 1,
      }).format(Number(latest.toFixed(1)));
    }
  });

  return <span ref={ref}>0.0</span>;
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
    <MotionConfig transition={transition}>
      <div className="relative flex h-screen items-center justify-center">
        <div className="size-[500px] relative flex flex-col justify-between overflow-hidden rounded-2xl px-2.5 pt-3">
          <div className="relative z-10 text-[42px] font-[450] leading-none tracking-tighter">
            <h1 className="text-white">Meet Thunder:</h1>
            <p className="text-white/50">
              The New, Fastest Way to Trade On-Chain.
            </p>
          </div>

          <div className="z-10 flex flex-1 pt-4">
            <div className="flex w-full flex-col justify-between">
              <div className="size-full flex flex-col justify-end space-y-2 pb-2.5 pr-2.5">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-[42px] font-[450] leading-none tracking-tighter text-[#65fc9f]"
                >
                  <SpringNumber value={2.1} />
                  <span>s</span>
                </motion.p>
                <motion.div
                  initial={{ height: 0, padding: 0 }}
                  animate={{ height: 80, padding: 4 }}
                  className="flex w-full items-end bg-[#65fc9f] p-1"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-[10px] font-medium uppercase tracking-tight text-black/60"
                  >
                    Thunder
                  </motion.p>
                </motion.div>
              </div>
              <div className="flex h-12 shrink-0 items-end border-t-[1.5px] pb-2">
                <p className="text-4xl font-[450] leading-none tracking-tighter text-white">
                  Thunder
                </p>
              </div>
            </div>
            <div className="flex h-full w-2.5 flex-col justify-end bg-[linear-gradient(0deg,rgba(255,255,255,0.4)_6.25%,rgba(0,0,0,0)_6.25%,rgba(0,0,0,0)_50%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.4)_56.25%,rgba(0,0,0,0)_56.25%,rgba(0,0,0,0)_100%)] bg-[size:16px_16px]">
              <div className="h-12 w-full border-t-[1.5px] " />
            </div>
            <div className="flex w-full flex-col justify-between">
              <div className="flex h-full w-full flex-col justify-end space-y-2 pb-2.5 pl-2.5">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-[42px] font-[450] leading-none tracking-tighter text-white"
                >
                  <SpringNumber value={8.5} />
                  <span>s</span>
                </motion.p>
                <motion.div
                  initial={{ height: 0, padding: 0 }}
                  animate={{ height: 210, padding: 4 }}
                  className="flex w-full items-end bg-white p-1"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-[10px] font-medium uppercase tracking-tight text-black/60"
                  >
                    Competition
                  </motion.p>
                </motion.div>
              </div>
              <div className="flex h-12 shrink-0 items-end justify-end border-t-[1.5px] pb-2">
                <Image src={imageAzura} alt="Azura" className="size-7" />
              </div>
            </div>
          </div>

          <Image
            src={imageThunderBg}
            alt="Thunder BG"
            className="size-full absolute left-0 top-0 z-0"
          />
          <div className="size-full absolute left-0 top-0 z-0 opacity-30 [filter:url(#grain)]" />
        </div>
      </div>

      {/* Grain SVG */}
      <svg className="hidden">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
    </MotionConfig>
  );
}
