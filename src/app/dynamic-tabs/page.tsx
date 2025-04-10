"use client";

import { GrainyBackground } from "@/components/grainy-background";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
} from "framer-motion";
import React, { useState } from "react";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  bgStatus: string;
  setBgStatus: React.Dispatch<React.SetStateAction<string>>;
}>({
  status: "",
  setStatus: () => null,
  bgStatus: "",
  setBgStatus: () => null,
});

function InnerContent() {
  const ctx = React.useContext(Context);

  return (
    <div className="flex items-center rounded-full bg-[#fafafa] p-0.5 shadow-2xl">
      <motion.button
        onClick={() => ctx.setBgStatus("system")}
        className={cn(
          "relative h-full w-[175px] rounded-full py-2 text-black transition-colors",
          ctx.bgStatus === "system" && "text-white",
        )}
      >
        {ctx.bgStatus === "system" && (
          <motion.div
            layoutId="active-bg-pill"
            className="absolute inset-0 rounded-full bg-black"
          />
        )}
        <span className="relative z-10">System</span>
      </motion.button>

      <motion.button
        onClick={() => ctx.setBgStatus("manual")}
        className={cn(
          "relative w-[175px] rounded-full py-2 text-black transition-colors",
          ctx.bgStatus === "manual" && "py-0",
        )}
      >
        {ctx.bgStatus === "manual" && (
          <motion.div
            layoutId="active-bg-pill"
            className="absolute inset-0 rounded-full bg-black"
          />
        )}
        <AnimatePresence key={ctx.bgStatus} mode="popLayout">
          {ctx.bgStatus === "system" ? (
            <motion.span
              initial={{ scale: 0.5, opacity: 0.5, filter: "blur(4px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.5, opacity: 0.5, filter: "blur(4px)" }}
              className="relative z-10"
            >
              Manual
            </motion.span>
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0.5, filter: "blur(4px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.5, opacity: 0.5, filter: "blur(4px)" }}
              transition={{ ...transition, delay: 0.1 }}
              className="relative flex h-10 w-[175px] items-center rounded-full p-0.5"
            >
              <motion.button
                onClick={() => ctx.setStatus("light")}
                className="relative h-full w-full rounded-full text-white"
              >
                {ctx.status === "light" && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-white mix-blend-difference"
                  />
                )}
                <span>Light</span>
              </motion.button>
              <motion.button
                onClick={() => ctx.setStatus("dark")}
                className="relative h-full w-full rounded-full text-white"
              >
                {ctx.status === "dark" && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-white mix-blend-difference"
                  />
                )}
                <span>Dark</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export default function HomePage() {
  const [status, setStatus] = React.useState("light");
  const [bgStatus, setBgStatus] = React.useState("system");

  React.useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setStatus("light");
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setStatus]);

  return (
    <Context.Provider value={{ status, setStatus, bgStatus, setBgStatus }}>
      <MotionConfig transition={transition}>
        <GrainyBackground
          baseColor={
            bgStatus === "system" || status === "light" ? "#ffffff" : "#aaaaaa"
          }
          className="relative flex h-screen items-center justify-center transition-colors"
          grainOpacity={0.12}
          grainContrast={0.7}
        >
          <InnerContent />
        </GrainyBackground>
      </MotionConfig>
    </Context.Provider>
  );
}
