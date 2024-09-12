"use client";

import { motion, MotionConfig, type Transition } from "framer-motion";
import React from "react";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

function InnerContent() {
  const ctx = React.useContext(Context);
  const isOpen = ctx.status === "open";

  return (
    <div
      onClick={() => {
        if (isOpen) {
          ctx.setStatus("idle");
          return;
        }
        ctx.setStatus("open");
      }}
      className="relative aspect-[1.3] h-64"
    >
      <motion.div
        initial={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(77,77,77,0.95) 0%, rgba(0,0,0,0.90) 100%)",
        }}
        animate={
          isOpen
            ? {
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(77,77,77,1) 0%, rgba(0,0,0,0.95) 80%)",
              }
            : {}
        }
        style={{ backgroundAttachment: "fixed" }}
        className="absolute bottom-0 left-0 h-[220px] w-full rounded-[22px] rounded-tl-none shadow-[0_48px_48px_-16px_rgba(0,0,0,0.46)] ring-1 ring-white/25"
      >
        <motion.div
          initial={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(77,77,77,0.95) 0%, rgba(0,0,0,0.90) 100%)",
          }}
          animate={
            isOpen
              ? {
                  backgroundImage:
                    "linear-gradient(to bottom right, rgba(77,77,77,1) 0%, rgba(0,0,0,0.95) 80%)",
                }
              : {}
          }
          style={{ backgroundAttachment: "fixed" }}
          className="absolute -top-6 left-0 h-6 w-[40%] rounded-tl-[22px] rounded-tr-[12px]"
        >
          <motion.div
            initial={{
              backgroundImage:
                "linear-gradient(to bottom right, rgba(77,77,77,0.95) 0%, rgba(0,0,0,0.90) 100%)",
            }}
            animate={
              isOpen
                ? {
                    backgroundImage:
                      "linear-gradient(to bottom right, rgba(77,77,77,1) 0%, rgba(0,0,0,0.95) 100%)",
                  }
                : {}
            }
            style={{
              backgroundAttachment: "fixed",
              maskImage:
                "radial-gradient(circle 12px at 12px 0px, transparent 0, transparent 12px, black 12px)",
            }}
            className="size-3 absolute -right-3 top-3"
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{
          transform: "perspective(1100px) rotateX(0deg)",
        }}
        whileTap={{
          transform: "perspective(1100px) rotateX(-10deg)",
        }}
        animate={
          isOpen
            ? {
                transform: "perspective(1100px) rotateX(-70deg)",
              }
            : {}
        }
        className="absolute bottom-0 left-0 grid h-48 w-full origin-bottom place-items-center rounded-[22px] bg-gradient-to-br from-[#4d4d4d] to-[#111111] shadow-[0_-1px_1px_1px_rgba(0,0,0,0.06),0_-6px_6px_3px_rgba(0,0,0,0.06),0_-3px_3px_1.5px_rgba(0,0,0,0.06),0_-12px_12px_6px_rgba(0,0,0,0.06),0_-24px_24px_12px_rgba(0,0,0,0.06)] ring-1 ring-white/20"
      >
        <div className="relative aspect-[1.5/1] h-[87%] scale-[65%] overflow-hidden bg-black bg-no-repeat [mask:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjE2NyIgdmlld0JveD0iMCAwIDI1MCAxNjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDQuMzM1IDEwNi4xOTlMMCAwTDg1LjE4MTQgNjMuNTE2M1YzNi41ODU0TDE0Ni4xNjkgODUuMzY1OVY1My44NjE4TDI1MCAxNjYuNjY3TDE2Mi4yOTggOTUuMDIwM1YxMjEuNDQzTDEwNC4zMzUgNzQuNjk1MVYxMDYuMTk5WiIgZmlsbD0iI0Q5RDlEOSIvPgo8L3N2Zz4K)]">
          <motion.div
            initial={{ y: 40, x: -60 }}
            animate={isOpen ? { y: -250, x: -10 } : {}}
            className="size-[500px] absolute rounded-full bg-[radial-gradient(at_center,rgba(255,255,255,0.95),rgba(255,255,255,0.3)_100%)]"
          />
          <motion.div
            initial={{ height: 0 }}
            animate={isOpen ? { height: "100%" } : {}}
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black from-40%"
          />
        </div>
      </motion.div>
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
        <main className="relative flex h-screen items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#cccccc]">
          <InnerContent />
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
