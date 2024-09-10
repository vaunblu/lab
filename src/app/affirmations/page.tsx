"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import imageBackgroud from "@/assets/snow-board.jpg";
import Image from "next/image";
import React from "react";
import svgPhone from "@/assets/iphone-silver.svg";
import { cn } from "@/lib/utils";

function InnerContent() {
  const ctx = React.useContext(Context);
  const isIdle = ctx.phase === "idle";
  const isIntro = ctx.phase === "intro";
  const isAffirmation = ctx.phase === "affirmation";

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 2.5 }}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[51px] bg-[#E1F6FD] px-10 pt-20 text-[#1D3E56]">
        <AnimatePresence initial={false}>
          {isIdle && (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1 }}
                className="z-10 font-serif text-5xl"
              >
                It&apos;s going to be a good one
              </motion.h1>

              <motion.p
                onClick={() => ctx.setPhase("intro")}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1 },
                }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.6 } }}
                className="absolute left-0 top-1/2 z-10 w-full -translate-y-1/2 cursor-pointer text-center font-serif text-[21px] text-[#F9FEFF]/70"
              >
                start your day
              </motion.p>

              <div className="absolute bottom-10 left-0 z-10 flex w-full items-center gap-[0.5ch] px-10 font-serif text-[21px] leading-tight">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1 },
                  }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.6 } }}
                  className="text-[62px] leading-none"
                >
                  G
                </motion.p>
                <div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 1 },
                    }}
                    exit={{ opacity: 0, y: 20, transition: { duration: 0.6 } }}
                  >
                    ood morning. Time to start
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 1 },
                    }}
                    exit={{ opacity: 0, y: 20, transition: { duration: 0.6 } }}
                  >
                    another beautiful day.
                  </motion.p>
                </div>
              </div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {isAffirmation && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-10 left-0 z-10 flex w-full flex-col px-10 font-serif text-[21px]"
              >
                <div className="flex items-center gap-[0.5ch]">
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 1, delay: 2 },
                    }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.6 } }}
                    className="text-[62px] leading-none"
                  >
                    R
                  </motion.p>
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1, delay: 0.6 },
                      }}
                      exit={{
                        opacity: 0,
                        y: -20,
                        transition: { duration: 0.6 },
                      }}
                    >
                      egardless of how the previous
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1, delay: 0.8 },
                      }}
                      exit={{
                        opacity: 0,
                        y: -20,
                        transition: { duration: 0.6 },
                      }}
                    >
                      day went. There is always a
                    </motion.p>
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1, delay: 1 },
                  }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.6 } }}
                >
                  new day. A new hour. A new
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1, delay: 1.2 },
                  }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.6 } }}
                >
                  minute. Seize every and all oppor-
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1, delay: 1.4 },
                  }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.6 } }}
                >
                  tunities to be better than before.
                </motion.p>
              </motion.div>

              <motion.p
                onClick={() => ctx.setPhase("idle")}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, delay: 3 },
                }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.6 } }}
                className="absolute left-0 top-20 z-10 w-full -translate-y-1/2 cursor-pointer text-center font-serif text-[21px] text-[#F9FEFF]/70"
              >
                return home
              </motion.p>
            </>
          )}
        </AnimatePresence>

        <motion.div
          animate={
            isIntro
              ? { scale: 0.75, y: 60 }
              : isAffirmation
                ? { scale: 0.75, y: -30 }
                : { scale: 1 }
          }
          className="size-full absolute left-0 top-0"
        >
          <Image
            src={imageBackgroud}
            alt="snow board"
            className="size-full object-cover"
          />
        </motion.div>

        <motion.div
          animate={{ height: isIdle ? "100%" : "50%" }}
          className="absolute left-0 top-0 h-full w-full rounded-t-[24px] bg-transparent backdrop-blur-2xl [mask:linear-gradient(180deg,rgba(0,0,0,1)_40%,rgba(0,0,0,0)_100%)]"
        />
        <motion.div
          animate={{ width: isIdle ? "100%" : "40%" }}
          className="absolute right-0 top-0 h-full w-full rounded-l-[24px] bg-transparent backdrop-blur-2xl [mask:linear-gradient(270deg,rgba(0,0,0,1)_30%,rgba(0,0,0,0)_100%)]"
        />
        <motion.div
          animate={{ height: isIntro ? "20%" : isAffirmation ? "60" : "20%" }}
          className="absolute bottom-0 left-0 h-full w-full rounded-b-[24px] bg-transparent backdrop-blur-2xl [mask:linear-gradient(0deg,rgba(0,0,0,1)_40%,rgba(0,0,0,0)_100%)]"
        />
        <motion.div
          animate={{ width: isIdle ? "100%" : "50%" }}
          className="absolute left-0 top-0 h-full w-full rounded-l-[24px] bg-transparent backdrop-blur-2xl [mask:linear-gradient(90deg,rgba(0,0,0,1)_30%,rgba(0,0,0,0)_100%)]"
        />

        {/* <motion.div */}
        {/*   animate={{ height: isIdle ? "20%" : "50%" }} */}
        {/*   className="absolute left-0 top-0  w-full bg-gradient-to-b from-[#E1F6FD] from-10%" */}
        {/* /> */}
        <motion.div
          animate={{
            height: isIntro ? "20%" : isAffirmation ? "50%" : "20%",
          }}
          transition={{ delay: 0.2, duration: 2 }}
          className={cn(
            "absolute bottom-0 left-0 h-[20%] w-full bg-gradient-to-t from-[#E1F6FD] from-0% transition-transform duration-1000",
            { "from-40%": ctx.phase !== "idle" },
          )}
        />
      </div>
    </MotionConfig>
  );
}

const Context = React.createContext<{
  phase: string;
  setPhase: React.Dispatch<React.SetStateAction<string>>;
}>({
  phase: "idle",
  setPhase: () => null,
});

export default function HappyCardsPage() {
  const [phase, setPhase] = React.useState("idle");

  React.useEffect(() => {
    if (phase === "intro") {
      const timeout = setTimeout(() => setPhase("affirmation"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [setPhase, phase]);

  React.useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPhase("idle");
      }
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setPhase]);

  return (
    <Context.Provider value={{ phase, setPhase }}>
      <main className="flex h-screen select-none items-center justify-center overflow-hidden">
        <div
          className={cn(
            "relative flex aspect-square h-screen items-center justify-center bg-gradient-to-br from-[#F1FAFD] from-20% to-[#E1F6FD] transition-colors duration-300",
          )}
        >
          <div className="absolute left-1/2 top-1/2 z-20 h-[814px] w-[376px] -translate-x-1/2 -translate-y-1/2">
            <InnerContent />
          </div>

          <div className="fixed bottom-[72px] left-1/2 z-50 h-1.5 w-[360px] -translate-x-1/2 px-28">
            <div className="size-full rounded-3xl bg-black" />
          </div>

          <Image
            src={svgPhone}
            alt="iphone mock"
            className="pointer-events-none relative z-30"
          />
        </div>
      </main>
    </Context.Provider>
  );
}
