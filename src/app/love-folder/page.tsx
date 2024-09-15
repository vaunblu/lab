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
      className="relative h-64 w-[332px]"
    >
      <motion.div
        initial={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(255,123,123,0.95) 0%, rgba(167,0,0,0.90) 100%)",
        }}
        animate={
          isOpen
            ? {
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(255,123,123,1) 0%, rgba(167,0,0,1) 100%)",
              }
            : {}
        }
        style={{ backgroundAttachment: "fixed", clipPath: "url(#folder)" }}
        className="size-full absolute bottom-0 left-0 shadow-[0_48px_48px_-16px_rgba(0,0,0,0.46)] ring-1 ring-white/25"
      >
        <svg>
          <clipPath id="folder">
            <path
              className="size-full"
              d="M22,0 H100 C122,0 122,22 144,22 H310 A22,22 0 0 1 332,44 V234 A22,22 0 0 1 310,256 H22 A22,22 0 0 1 0,234 V22 A22,22 0 0 1 22,0"
            />
          </clipPath>
        </svg>
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
        className="absolute bottom-0 left-0 grid h-52 w-full origin-bottom place-items-center rounded-[22px] bg-gradient-to-br from-[#ff7b7b] to-[#a70000] shadow-[0_-1px_1px_1px_rgba(0,0,0,0.06),0_-6px_6px_3px_rgba(0,0,0,0.06),0_-3px_3px_1.5px_rgba(0,0,0,0.06),0_-12px_12px_6px_rgba(0,0,0,0.06),0_-24px_24px_12px_rgba(0,0,0,0.06)] ring-1 ring-white/20"
      >
        <div className="size-3/4 relative overflow-hidden bg-[#5a0000] [mask:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj4KICA8cGF0aCBkPSJtMTEuNjQ1IDIwLjkxLS4wMDctLjAwMy0uMDIyLS4wMTJhMTUuMjQ3IDE1LjI0NyAwIDAgMS0uMzgzLS4yMTggMjUuMTggMjUuMTggMCAwIDEtNC4yNDQtMy4xN0M0LjY4OCAxNS4zNiAyLjI1IDEyLjE3NCAyLjI1IDguMjUgMi4yNSA1LjMyMiA0LjcxNCAzIDcuNjg4IDNBNS41IDUuNSAwIDAgMSAxMiA1LjA1MiA1LjUgNS41IDAgMCAxIDE2LjMxMyAzYzIuOTczIDAgNS40MzcgMi4zMjIgNS40MzcgNS4yNSAwIDMuOTI1LTIuNDM4IDcuMTExLTQuNzM5IDkuMjU2YTI1LjE3NSAyNS4xNzUgMCAwIDEtNC4yNDQgMy4xNyAxNS4yNDcgMTUuMjQ3IDAgMCAxLS4zODMuMjE5bC0uMDIyLjAxMi0uMDA3LjAwNC0uMDAzLjAwMWEuNzUyLjc1MiAwIDAgMS0uNzA0IDBsLS4wMDMtLjAwMVoiIC8+Cjwvc3ZnPgo=)] [maskPosition:center] [maskRepeat:no-repeat]">
          <motion.div
            initial={{ y: 40, x: -60 }}
            animate={isOpen ? { y: -250, x: -200 } : {}}
            className="size-[500px] absolute rounded-full bg-[radial-gradient(at_center,rgba(255,186,186,1),rgba(255,186,186,0.3)_100%)]"
          />
          <motion.div
            initial={{ height: 0 }}
            animate={isOpen ? { height: "100%" } : {}}
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#5a0000] from-30%"
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
