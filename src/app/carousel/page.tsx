"use client";

import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
} from "framer-motion";
import Image from "next/image";
import React from "react";
import imageBarn from "@/assets/barn.jpg";
import imageOrlando from "@/assets/orlando.jpg";
import imageSnow from "@/assets/snow-board.jpg";
import imageField from "@/assets/field.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Context = React.createContext<{
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ index: 0, setIndex: () => null, status: "", setStatus: () => null });

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const locationData = [
  {
    title: "Orlando Beach",
    city: "Orlando",
    state: "FL",
    image: imageOrlando,
  },
  {
    title: "Mount Elbert",
    city: "Leadville",
    state: "CO",
    image: imageSnow,
  },
  {
    title: "Mount Rainier",
    city: "Paradise",
    state: "WA",
    image: imageBarn,
  },
  {
    title: "Galt Ranch",
    city: "White Sulphur Springs",
    state: "MT",
    image: imageField,
  },
];

function NavigationIndicator() {
  const ctx = React.useContext(Context);

  return (
    <div className="absolute right-0 top-0 z-10 flex gap-1 p-[75px] px-16">
      <div
        className={cn(
          "h-[3px] w-3.5 rounded-full bg-white/30 transition-colors",
          {
            "bg-white": ctx.index === 0,
          },
        )}
      />
      <div
        className={cn(
          "h-[3px] w-3.5 rounded-full bg-white/30 transition-colors",
          {
            "bg-white": ctx.index === 1,
          },
        )}
      />
      <div
        className={cn(
          "h-[3px] w-3.5 rounded-full bg-white/30 transition-colors",
          {
            "bg-white": ctx.index === 2,
          },
        )}
      />
      <div
        className={cn(
          "h-[3px] w-3.5 rounded-full bg-white/30 transition-colors",
          {
            "bg-white": ctx.index === 3,
          },
        )}
      />
    </div>
  );
}

function PreviousButton() {
  const ctx = React.useContext(Context);

  function handlePreviousClick() {
    if (ctx.index <= 0) return;
    ctx.setIndex((prev) => prev - 1);
  }

  return (
    <button
      aria-label="Previous"
      type="button"
      onMouseDown={() => ctx.setStatus("pressing-previous")}
      onMouseUp={() => ctx.setStatus("idle")}
      onClick={handlePreviousClick}
      className="group absolute left-0 top-0 isolate flex h-full w-1/3 items-center pl-8"
    >
      <div className="size-full absolute left-0 top-0 opacity-0 backdrop-blur-md transition-opacity duration-500 ease-out [mask:linear-gradient(90deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)] group-hover:opacity-100" />
      <div className="size-full absolute left-0 top-0 bg-gradient-to-r from-black/10 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
      <ChevronLeft className="size-8 z-10 text-white/30 transition-colors duration-500 ease-out group-hover:text-white" />
    </button>
  );
}

function NextButton() {
  const ctx = React.useContext(Context);

  function handleNextClick() {
    if (ctx.index >= 3) return;
    ctx.setIndex((prev) => prev + 1);
  }

  return (
    <button
      aria-label="Next"
      type="button"
      onMouseDown={() => ctx.setStatus("pressing-next")}
      onMouseUp={() => ctx.setStatus("idle")}
      onClick={handleNextClick}
      className="group absolute right-0 top-0 isolate flex h-full w-1/3 items-center justify-end pr-8"
    >
      <div className="size-full absolute left-0 top-0 opacity-0 backdrop-blur-md transition-opacity duration-500 ease-out [mask:linear-gradient(270deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)] group-hover:opacity-100" />
      <div className="size-full absolute left-0 top-0 bg-gradient-to-l from-black/10 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
      <ChevronRight className="size-8 z-10 text-white/30 transition-colors duration-500 ease-out group-hover:text-white" />
    </button>
  );
}

function InnerContent() {
  const ctx = React.useContext(Context);
  const location = locationData[ctx.index];
  const isPressingNext = ctx.status === "pressing-next";
  const isPressingPrevious = ctx.status === "pressing-previous";

  return (
    <div className="size-[600px] relative isolate overflow-hidden rounded-[100px] border border-[#cacaca] bg-[#e3e3e3] font-medium tracking-tight shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.06)]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={ctx.index}
          initial={{
            // opacity: 0,
            filter: "blur(8px)",
            transform: "perspective(1000px) rotateY(0deg)",
          }}
          animate={
            isPressingNext
              ? {
                  transform: "perspective(800px) rotateY(10deg)",
                  // opacity: 1,
                  filter: "blur(0px)",
                }
              : isPressingPrevious
                ? {
                    transform: "perspective(800px) rotateY(-10deg)",
                    // opacity: 1,
                    filter: "blur(0px)",
                  }
                : { filter: "blur(0px)" }
          }
          exit={{ filter: "blur(8px)" }}
          className="size-full relative"
        >
          <Image
            src={location.image}
            alt={location.title}
            className="size-full scale-150 object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute left-0 top-0 z-0 h-1/2 w-full backdrop-blur-md [mask:linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]" />
      <div className="absolute left-0 top-0 z-0 h-1/2 w-full bg-gradient-to-b from-black/40" />

      <motion.div
        initial={{
          transform: "perspective(1000px) rotateY(0deg)",
        }}
        animate={
          isPressingNext
            ? {
                transform: "perspective(800px) rotateY(20deg)",
              }
            : isPressingPrevious
              ? {
                  transform: "perspective(800px) rotateY(-20deg)",
                }
              : {}
        }
        className="absolute left-0 top-0 z-20 w-full p-14 px-16"
      >
        <p className="text-3xl font-normal leading-[1.4] tracking-wide text-white">
          {location.title}
          <br />
          {location.city}
          <br />
          {location.state}
        </p>
      </motion.div>

      <NavigationIndicator />

      <PreviousButton />

      <NextButton />
    </div>
  );
}

export default function HomePage() {
  const [index, setIndex] = React.useState(2);
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
    <Context.Provider value={{ index, setIndex, status, setStatus }}>
      <MotionConfig transition={transition}>
        <main className="relative flex h-screen items-center justify-center">
          <InnerContent />
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
