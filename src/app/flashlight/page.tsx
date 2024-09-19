"use client";

import { motion, MotionConfig, type Transition } from "framer-motion";
import { Flashlight } from "lucide-react";
import React from "react";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

function InnerContent() {
  const ctx = React.useContext(Context);
  const isNarrow = ctx.status === "narrow";

  return (
    <div className="relative h-[300px] w-[600px]">
      <motion.div
        initial={{ backgroundSize: "60% 75%" }}
        animate={isNarrow ? { backgroundSize: "10% 80%" } : {}}
        className="size-full absolute bottom-0 left-0 bg-[radial-gradient(circle,#dcd8ff_0%,transparent_100%)] bg-[position:50%_90%] bg-no-repeat opacity-60 blur-lg [mask:radial-gradient(circle_at_center,black_0%,transparent_70%)]"
      />
      <motion.div
        initial={{
          width: 150,
          rotate: "-60deg",
          left: "calc(50% - 50px)",
          mask: "radial-gradient(circle at center, black 0%, transparent 70%)",
          opacity: 0.1,
        }}
        animate={
          isNarrow
            ? {
                width: 80,
                rotate: "0deg",
                left: "calc(50% - 50px)",
                mask: "radial-gradient(circle at center, black 0%, transparent 40%)",
                opacity: 0.15,
              }
            : {}
        }
        className="absolute bottom-[30px] h-[250px] origin-bottom bg-[linear-gradient(90deg,red_0%,orange_30%,yellow_40%,green_45%,blue_80%,purple_100%)] blur-xl"
      />
      <motion.div
        initial={{
          width: 150,
          rotate: "60deg",
          translateX: "0%",
          right: "calc(50% - 50px)",
          mask: "radial-gradient(circle at center, black 0%, transparent 70%)",
          opacity: 0.1,
        }}
        animate={
          isNarrow
            ? {
                width: 80,
                rotate: "0deg",
                right: "calc(50% - 50px)",
                mask: "radial-gradient(circle at center, black 0%, transparent 40%)",
                opacity: 0.15,
              }
            : {}
        }
        className="absolute bottom-[30px] h-[250px] w-[150px] origin-bottom rotate-[60deg] bg-[linear-gradient(270deg,red_0%,orange_30%,yellow_40%,green_45%,blue_80%,purple_100%)] opacity-20 blur-xl [mask:radial-gradient(circle_at_center,black_0%,transparent_70%)]"
      />
      <motion.div
        initial={{
          mask: "conic-gradient(from -65deg at bottom, transparent 0deg, rgba(0, 0, 0, 0.3) 20deg 110deg, transparent 130deg)",
          opacity: 1,
        }}
        animate={
          isNarrow
            ? {
                mask: "conic-gradient(from -45deg at bottom, transparent 10deg, rgba(0, 0, 0, 0.3) 20deg 70deg, transparent 80deg)",
                opacity: 0.6,
              }
            : {}
        }
        className="absolute bottom-0 left-1/2 h-[250px] w-[500px] -translate-x-1/2 bg-[radial-gradient(farthest-side_at_bottom,#dcd8ff_0%,transparent_100%)] blur-lg"
      />
      <motion.div
        initial={{
          backgroundSize: "70px 100px",
          backgroundPosition: "50% 90%",
          opacity: 0.6,
        }}
        animate={
          isNarrow
            ? {
                backgroundSize: "20px 140px",
                backgroundPosition: "50% 85%",
                opacity: 1,
              }
            : {}
        }
        className="size-full absolute bottom-0 left-0 bg-[radial-gradient(circle,#f5f1ff_10%,#dcd8ff_50%,transparent_90%)] bg-no-repeat blur-lg [mask:radial-gradient(circle_at_center,black_0%,transparent_100%)]"
      />

      <div
        onClick={() => ctx.setStatus("narrow")}
        className="size-16 absolute -bottom-20 left-1/2 -translate-x-1/2 bg-white bg-[radial-gradient(circle_at_50%_40%,#f5f1ff_10%,#dcd8ff_40%)] bg-no-repeat [mask:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1mbGFzaGxpZ2h0Ij48cGF0aCBkPSJNMTggNmMwIDItMiAyLTIgNHYxMGEyIDIgMCAwIDEtMiAyaC00YTIgMiAwIDAgMS0yLTJWMTBjMC0yLTItMi0yLTRWMmgxMnoiLz48bGluZSB4MT0iNiIgeDI9IjE4IiB5MT0iNiIgeTI9IjYiLz48bGluZSB4MT0iMTIiIHgyPSIxMiIgeTE9IjEyIiB5Mj0iMTIiLz48L3N2Zz4=)] [maskPosition:center] [maskRepeat:no-repeat] [maskSize:100%_100%]"
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
        <main className="relative flex h-screen items-center justify-center bg-[#010101]">
          <InnerContent />
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
