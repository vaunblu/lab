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
    <div className="flex items-center rounded-full bg-[#fafafa] p-0.5 text-lg shadow-xl">
      <motion.button
        onClick={() => ctx.setBgStatus("system")}
        animate={{
          color: ctx.bgStatus === "system" ? "#ffffff" : "#000000",
        }}
        className={cn("relative h-12 w-[175px] rounded-full")}
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
        className={cn("relative h-12 w-[175px] rounded-full")}
      >
        {ctx.bgStatus === "manual" && (
          <motion.div
            layoutId="active-bg-pill"
            className="absolute inset-0 rounded-full bg-black"
          />
        )}
        <AnimatePresence key={ctx.bgStatus} mode="popLayout">
          {ctx.bgStatus === "system" ? (
            <motion.div
              key="manual-button"
              initial={{ opacity: 0, color: "#000000" }}
              animate={{
                scale: 1,
                opacity: 1,
                color: "#000000",
              }}
              exit={{ opacity: 0, color: "#000000" }}
              className="relative z-10 flex flex-col items-center gap-1"
            >
              <div className="h-[20px]">
                <motion.span className="leading-[0]">Manual</motion.span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <motion.span>Light</motion.span>
                <span>/</span>
                <motion.span>Dark</motion.span>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                key="manual-container"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ ...transition, delay: 0.1 }}
                className="relative flex h-12 w-[175px] items-center rounded-full p-0.5"
              >
                <motion.button
                  key="light-button"
                  onClick={() => ctx.setStatus("light")}
                  className="relative h-full w-full rounded-full text-white"
                >
                  {ctx.status === "light" && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-white mix-blend-difference"
                    />
                  )}
                  <motion.span layoutId="light-text">Light</motion.span>
                </motion.button>
                <motion.button
                  key="dark-button"
                  onClick={() => ctx.setStatus("dark")}
                  className="relative h-full w-full rounded-full text-white"
                >
                  {ctx.status === "dark" && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-white mix-blend-difference"
                    />
                  )}
                  <motion.span layoutId="dark-text">Dark</motion.span>
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {ctx.bgStatus === "manual" && (
            <motion.div
              key="manual-tab"
              initial={{ left: "50%", x: "-50%", y: "100%" }}
              animate={{ y: 0 }}
              exit={{ left: "50%", x: "-50%", y: "100%" }}
              className="absolute -top-6 -z-10 grid h-6 w-[135px] place-items-center rounded-t-2xl bg-[#fafafa] text-sm"
            >
              <motion.span>Manual</motion.span>
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
            bgStatus === "system" || status === "light" ? "#fafafa" : "#aaaaaa"
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
