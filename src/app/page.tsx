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
            "linear-gradient(to bottom right, rgba(77,77,77,0.95) 0%, rgba(0,0,0,0.95) 100%)",
        }}
        animate={
          isOpen
            ? {
              backgroundImage:
                "linear-gradient(to bottom right, rgba(77,77,77,1) 0%, rgba(0,0,0,1) 80%)",
            }
            : {}
        }
        style={{ backgroundAttachment: "fixed" }}
        className="absolute bottom-0 left-0 h-[220px] w-full rounded-[22px] rounded-tl-none ring-1 ring-white/25"
      >
        <motion.div
          initial={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(77,77,77,0.95) 0%, rgba(0,0,0,0.95) 100%)",
          }}
          animate={
            isOpen
              ? {
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(77,77,77,1) 0%, rgba(0,0,0,1) 80%)",
              }
              : {}
          }
          style={{ backgroundAttachment: "fixed" }}
          className="absolute -top-8 left-0 h-8 w-[40%] rounded-t-[22px]"
        >
          <motion.div
            initial={{
              backgroundImage:
                "linear-gradient(to bottom right, rgba(77,77,77,0.95) 0%, rgba(0,0,0,0.95) 100%)",
            }}
            animate={
              isOpen
                ? {
                  backgroundImage:
                    "linear-gradient(to bottom right, rgba(77,77,77,1) 0%, rgba(0,0,0,1) 100%)",
                }
                : {}
            }
            style={{
              backgroundAttachment: "fixed",
              maskImage:
                "radial-gradient(circle 22px at 22px 0px, transparent 0, transparent 22px, black 22px)",
            }}
            className="absolute -right-[21px] top-[10px] h-[22px] w-[22px]"
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
        className="absolute bottom-0 left-0 h-48 w-full origin-bottom rounded-[22px] bg-gradient-to-br from-[#3d3d3d] to-[#181818] shadow-[0_-1px_1px_1px_rgba(0,0,0,0.06),0_-6px_6px_3px_rgba(0,0,0,0.06),0_-3px_3px_1.5px_rgba(0,0,0,0.06),0_-12px_12px_6px_rgba(0,0,0,0.06),0_-24px_24px_12px_rgba(0,0,0,0.06)] ring-1 ring-white/25"
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
        <main className="relative flex h-screen items-center justify-center">
          <InnerContent />
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
