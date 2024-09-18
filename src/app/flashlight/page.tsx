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

  return (
    <div className="h-[250px] w-[500px] bg-[radial-gradient(farthest-side_at_bottom,#f5f2fe_10%,transparent_100%)] [mask:conic-gradient(from_-65deg_at_bottom,transparent_0deg,rgba(0,0,0,0.9)_20deg_110deg,transparent_130deg)]"></div>
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
        <main className="relative flex h-screen items-center justify-center bg-[#010101]">
          <InnerContent />
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
