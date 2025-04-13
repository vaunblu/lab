"use client";

import { GrainyBackground } from "@/components/grainy-background";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
} from "framer-motion";
import React from "react";

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
        animate={
          {
            // color: ctx.bgStatus === "system" ? "#ffffff" : "#000000",
          }
        }
        className={cn("relative h-12 w-[175px] rounded-full")}
      >
        {ctx.bgStatus === "system" && (
          <motion.div
            layoutId="active-bg-pill"
            style={{ borderRadius: 99999 }}
            className="absolute inset-0 bg-black"
          />
        )}
        <span className="relative z-20 text-white mix-blend-exclusion">
          System
        </span>
      </motion.button>

      <div className={cn("relative h-12 w-[175px] rounded-full")}>
        <div className="h-full w-full overflow-hidden rounded-full">
          <AnimatePresence key={ctx.bgStatus} mode="popLayout">
            {ctx.bgStatus === "system" ? (
              <motion.button
                onClick={() => ctx.setBgStatus("manual")}
                initial={{ opacity: 0, color: "#ffffff" }}
                animate={{ opacity: 1, color: "#000000" }}
                exit={{ opacity: 0, color: "#ffffff" }}
                className={cn("absolute inset-0")}
              >
                <motion.div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    // initial={{ y: -10, scale: 0.8 }}
                    // animate={{ y: 0, scale: 1 }}
                    // exit={{ y: -10, scale: 0.8 }}
                    layoutId="manual-text"
                    className="h-[20px]"
                  >
                    <span className="leading-[0]">Manual</span>
                  </motion.div>
                  <div className="flex items-center rounded-full text-xs">
                    <motion.div
                      layoutId="light-container"
                      className="flex items-center justify-center rounded-full p-1"
                    >
                      <motion.span layoutId="light-text">Light</motion.span>
                    </motion.div>
                    <span>/</span>
                    <motion.div
                      layoutId="dark-container"
                      className="flex items-center justify-center rounded-full p-1"
                    >
                      <motion.span layoutId="dark-text">Dark</motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.button>
            ) : (
              <>
                <motion.div
                  layoutId="active-bg-pill"
                  style={{ borderRadius: 99999 }}
                  className="absolute inset-0 z-10 bg-black"
                />
                <motion.div
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ ...transition, delay: 0.1 }}
                  className="relative z-20 flex h-12 w-[175px] items-center rounded-full p-0.5"
                >
                  <motion.button
                    layoutId="light-container"
                    onClick={() => ctx.setStatus("light")}
                    className="relative h-full w-full rounded-full text-white"
                  >
                    {ctx.status === "light" && (
                      <motion.div
                        layoutId="active-pill"
                        style={{ borderRadius: 99999 }}
                        className="absolute inset-0 bg-white"
                      />
                    )}
                    <motion.span
                      layoutId="light-text"
                      className="relative z-30 mix-blend-exclusion"
                    >
                      Light
                    </motion.span>
                  </motion.button>
                  <motion.button
                    layoutId="dark-container"
                    onClick={() => ctx.setStatus("dark")}
                    className="relative h-full w-full rounded-full text-white"
                  >
                    {ctx.status === "dark" && (
                      <motion.div
                        layoutId="active-pill"
                        style={{ borderRadius: 99999 }}
                        className="absolute inset-0 z-20 bg-white"
                      />
                    )}
                    <motion.span
                      layoutId="dark-text"
                      className="relative z-30 mix-blend-exclusion"
                    >
                      Dark
                    </motion.span>
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {ctx.bgStatus === "manual" && (
            <motion.div
              key="manual-tab"
              initial={{ left: "50%", x: "-50%", y: "100%" }}
              animate={{ y: 0 }}
              exit={{ left: "50%", x: "-50%", y: "100%" }}
              className="absolute -top-6 -z-10 grid h-6 w-[135px] place-items-center rounded-t-2xl bg-[#fafafa] text-sm"
            >
              <motion.span layoutId="manual-text">Manual</motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
