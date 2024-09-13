"use client";

import {
  motion,
  MotionConfig,
  type Transition,
  useVelocity,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";
import imageFarewell from "./farewell.jpg";
import imageDune from "./dune.jpg";
import imageAllTheLight from "./all-the-light.jpg";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

function InnerContent() {
  const ctx = React.useContext(Context);

  const x = useMotionValue(0);
  const xSmooth = useSpring(x, { damping: 10, stiffness: 100 });
  const xVelocity = useVelocity(xSmooth);
  const rotate = useTransform(
    xVelocity,
    [-3500, 0, 3500],
    ["15deg", "0deg", "-15deg"],
    {
      clamp: false,
    },
  );

  useMotionValueEvent(xVelocity, "change", (latestVelocity) => {
    console.log("Velocity", latestVelocity);
  });

  return (
    <div className="size-[720px] flex flex-col justify-between overflow-hidden rounded-[120px] bg-[#E3E3E3] p-10 font-[510] leading-none -tracking-[0.2rem]">
      <h2 className="p-10 text-[56px] text-[#9F9F9F]">Audiobooks</h2>
      <motion.ul
        drag="x"
        dragConstraints={{
          left: -((420 - 40) * 2) + 60,
          right: 0,
        }}
        dragElastic={0.2}
        dragTransition={{ bounceDamping: 30, bounceStiffness: 100 }}
        // whileDrag={{ scale: 0.95 }}
        style={{ x }}
        className="flex w-fit gap-10"
      >
        <li className="size-[420px] relative flex flex-col justify-end rounded-[80px] border border-black/10 bg-black/[7%] p-10">
          <motion.div
            style={{ rotate, translateX: "-50%" }}
            className="absolute -top-[96px] left-1/2 isolate h-[320px] w-[214px] -translate-x-1/2 rounded-l-[2px] rounded-r-[8.5px] shadow-[0_13px_28px_0_rgba(0,0,0,0.09),0_50px_50px_0_rgba(0,0,0,0.07),0_112px_66px_0_rgba(0,0,0,0.04),0_200px_80px_0_rgba(0,0,0,0.01)]"
          >
            <Image
              src={imageFarewell}
              alt="Farewell"
              className="size-full relative z-10 rounded-l-[2px] rounded-r-[8.5px]"
            />
            <div className="size-full absolute left-0 top-0 z-10 rounded-l-[2px] rounded-r-[8.5px] shadow-[0_0_0_2px_rgba(0,0,0,0.1)_inset]" />
            <div className="size-full bg-white-30 absolute -right-2 top-0 scale-95 rounded-l-[2px] rounded-r-[8.5px] shadow-[0_0_0_2px_rgba(183,170,139,1)] backdrop-blur" />
          </motion.div>
          <div className="space-y-5">
            <div className="space-y-2.5">
              <h3 className="text-[40px] text-black/90">A Farewell To Arms</h3>
              <p className="text-[34px] text-black/[32%]">Ernest Hemingway</p>
            </div>
            <div className="flex items-center justify-between gap-2.5">
              <Play fill="currentColor" className="size-7" />
              <div className="relative h-2.5 flex-1 rounded-full bg-black/[7%]">
                <div className="absolute left-0 top-0 h-full w-20 rounded-full bg-black/[32%]"></div>
              </div>
              <p className="text-[28px] -tracking-[0.15rem] text-black/[32%]">
                1h 24m
              </p>
            </div>
          </div>
        </li>
        <li className="size-[420px] relative flex flex-col justify-end rounded-[80px] border border-black/10 bg-black/[7%] p-10">
          <motion.div
            style={{ rotate, translateX: "-50%" }}
            className="absolute -top-[96px] left-1/2 h-[320px] w-[214px] -translate-x-1/2 rounded-l-[2px] rounded-r-[8.5px] shadow-[0_13px_28px_0_rgba(0,0,0,0.09),0_50px_50px_0_rgba(0,0,0,0.07),0_112px_66px_0_rgba(0,0,0,0.04),0_200px_80px_0_rgba(0,0,0,0.01)]"
          >
            <Image
              src={imageDune}
              alt="Dune"
              className="size-full relative z-10 rounded-l-[2px] rounded-r-[8.5px]"
            />
            <div className="size-full absolute left-0 top-0 z-10 rounded-l-[2px] rounded-r-[8.5px] shadow-[0_0_0_2px_rgba(0,0,0,0.1)_inset]" />
            <div className="size-full bg-white-30 absolute -right-2 top-0 scale-95 rounded-l-[2px] rounded-r-[8.5px] shadow-[0_0_0_2px_rgba(189,123,49,1)] backdrop-blur" />
          </motion.div>
          <div className="space-y-5">
            <div className="space-y-2.5">
              <h3 className="text-[40px] text-black/90">Dune</h3>
              <p className="text-[34px] text-black/[32%]">Frank Herbert</p>
            </div>
            <div className="flex items-center justify-between gap-2.5">
              <Play fill="currentColor" className="size-7" />
              <div className="relative h-2.5 flex-1 rounded-full bg-black/[7%]">
                <div className="absolute left-0 top-0 h-full w-40 rounded-full bg-black/[32%]"></div>
              </div>
              <p className="text-[28px] -tracking-[0.15rem] text-black/[32%]">
                3h 6m
              </p>
            </div>
          </div>
        </li>
        <li className="size-[420px] relative flex flex-col justify-end rounded-[80px] border border-black/10 bg-black/[7%] p-10">
          <motion.div
            style={{ rotate, translateX: "-50%" }}
            className="absolute -top-[96px] left-1/2 h-[320px] w-[214px] -translate-x-1/2 rounded-l-[2px] rounded-r-[8.5px] shadow-[0_13px_28px_0_rgba(0,0,0,0.09),0_50px_50px_0_rgba(0,0,0,0.07),0_112px_66px_0_rgba(0,0,0,0.04),0_200px_80px_0_rgba(0,0,0,0.01)]"
          >
            <Image
              src={imageAllTheLight}
              alt="All the light we cannot see"
              className="size-full relative z-10 rounded-l-[2px] rounded-r-[8.5px]"
            />
            <div className="size-full absolute left-0 top-0 z-10 rounded-l-[2px] rounded-r-[8.5px] shadow-[0_0_0_2px_rgba(0,0,0,0.1)_inset]" />
            <div className="size-full bg-white-30 absolute -right-2 top-0 scale-95 rounded-l-[2px] rounded-r-[8.5px] shadow-[0_0_0_2px_rgba(13,50,89,1)] backdrop-blur" />
          </motion.div>
          <div className="space-y-5">
            <div className="space-y-2.5">
              <h3 className="truncate text-[40px] text-black/90">
                All the Light We Cannot See
              </h3>
              <p className="text-[34px] text-black/[32%]">Anthony Doerr</p>
            </div>
            <div className="flex items-center justify-between gap-2.5">
              <Play fill="currentColor" className="size-7" />
              <div className="relative h-2.5 flex-1 rounded-full bg-black/[7%]">
                <div className="absolute left-0 top-0 h-full w-10 rounded-full bg-black/[32%]"></div>
              </div>
              <p className="text-[28px] -tracking-[0.15rem] text-black/[32%]">
                3h 51m
              </p>
            </div>
          </div>
        </li>
      </motion.ul>
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
        <main className="relative flex h-screen items-center justify-center bg-gradient-to-br from-white to-[#eeeeee]">
          <InnerContent />
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
