"use client";

import { motion, MotionConfig, Transition, useSpring } from "framer-motion";
import React from "react";
import imageThunderBg from "@/assets/thunder-bg.png";
import imageAzura from "@/assets/azura.png";
import Image from "next/image";

// NOTE: TOOK 30 MINS

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
      }).format(Number(latest.toFixed(0)));
    }
  });

  return <span ref={ref}>0</span>;
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
          <div className="relative z-10 text-[42px] font-[450] leading-none tracking-tighter text-white">
            <h1>Airdrop live</h1>
            <p>
              for beta users <span className="text-white/50">0% Fees.</span>
            </p>
          </div>

          <div className="z-10 flex flex-1">
            <div className="flex w-full flex-col justify-between">
              <div className="size-full relative flex flex-col justify-end pb-2.5">
                <div className="absolute left-0 top-0 flex h-[calc(100%-10px)] w-2 flex-col justify-end bg-[linear-gradient(0deg,rgba(255,255,255,0.4)_4%,rgba(0,0,0,0)_4%,rgba(0,0,0,0)_50%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.4)_54%,rgba(0,0,0,0)_54%,rgba(0,0,0,0)_100%)] bg-[size:26px_26px]" />
                <div className="absolute left-1/2 top-0 flex h-[calc(100%-10px)] w-2 -translate-x-1/2 flex-col justify-end bg-[linear-gradient(0deg,rgba(255,255,255,0.4)_4%,rgba(0,0,0,0)_4%,rgba(0,0,0,0)_50%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.4)_54%,rgba(0,0,0,0)_54%,rgba(0,0,0,0)_100%)] bg-[size:26px_26px]" />
                <div className="absolute right-0 top-0 flex h-[calc(100%-10px)] w-2 flex-col justify-end bg-[linear-gradient(0deg,rgba(255,255,255,0.4)_4%,rgba(0,0,0,0)_4%,rgba(0,0,0,0)_50%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.4)_54%,rgba(0,0,0,0)_54%,rgba(0,0,0,0)_100%)] bg-[size:26px_26px]" />

                <motion.div
                  initial={{ height: 0, padding: 0 }}
                  animate={{ height: 100, padding: 4 }}
                  className="z-20 flex w-full flex-col justify-between bg-[#65fc9f] p-1"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    className="text-[60px] font-[550] leading-none tracking-tighter text-black"
                  >
                    <SpringNumber value={540} />
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                    className="text-[10px] font-bold uppercase tracking-tight text-black/60"
                  >
                    Thunder
                  </motion.p>
                </motion.div>
                <motion.div
                  initial={{ height: 0, padding: 0 }}
                  animate={{ height: 170, padding: 4 }}
                  className="z-20 flex w-full flex-col justify-between bg-white p-1"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-[60px] font-[550] leading-none tracking-tighter text-[#9fa3a4]"
                  >
                    <SpringNumber value={389} />
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="text-[10px] font-bold uppercase tracking-tight text-black/60"
                  >
                    Competition
                  </motion.p>
                </motion.div>
              </div>
              <div className="flex h-12 shrink-0 items-end justify-between border-t-[1.5px] pb-2">
                <p className="text-4xl font-[450] leading-none tracking-tighter text-white">
                  Thunder
                </p>
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
