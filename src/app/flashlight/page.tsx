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
    <div className="relative h-[300px] w-[600px] overflow-visible">
      <div className="absolute bottom-[30px] left-[calc(50%-50px)] h-[250px] w-[150px] origin-bottom -rotate-[60deg] bg-[linear-gradient(90deg,red_0%,orange_30%,yellow_40%,green_45%,blue_80%,purple_100%)] opacity-20 blur-xl [mask:radial-gradient(circle_at_center,black_0%,transparent_70%)]" />
      <div className="absolute bottom-[30px] right-[calc(50%-50px)] h-[250px] w-[150px] origin-bottom rotate-[60deg] bg-[linear-gradient(270deg,red_0%,orange_30%,yellow_40%,green_45%,blue_80%,purple_100%)] opacity-20 blur-xl [mask:radial-gradient(circle_at_center,black_0%,transparent_70%)]" />
      <div className="absolute bottom-0 left-1/2 h-[250px] w-[500px] -translate-x-1/2 bg-[radial-gradient(farthest-side_at_bottom,#dcd8ff_0%,transparent_100%)] blur-lg [mask:conic-gradient(from_-65deg_at_bottom,transparent_0deg,rgba(0,0,0,0.5)_20deg_110deg,transparent_130deg)]" />
      <div className="absolute bottom-0 left-1/2 h-[70px] w-[50px] -translate-x-1/2"></div>
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
        <main className="relative flex h-screen items-center justify-center bg-[#010101]">
          <InnerContent />
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
