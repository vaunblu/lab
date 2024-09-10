"use client";

import { motion, MotionConfig, Transition } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React from "react";
import imageHuberman from "@/assets/huberman.jpg";
import imageJoe from "@/assets/joe-rogan.jpg";
import imageMoral from "@/assets/moral.jpg";
import Image from "next/image";

// NOTE: TOOK 2 HOURS

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

export default function HomePage() {
  const [status, setStatus] = React.useState("idle");
  const isPressing = status === "pressing";
  const isActive = status === "active";

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
    <MotionConfig transition={transition}>
      <div className="flex h-screen items-center justify-center bg-[#f2f2f2]">
        <div className="size-[500px] relative overflow-hidden rounded-[100px] border border-[#cacaca] bg-[#e3e3e3] font-medium tracking-tight shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.06)]">
          <motion.h1
            animate={
              isPressing || isActive ? { scale: 0.9, filter: "blur(4px)" } : {}
            }
            className="w-full pt-14 text-center text-4xl font-medium tracking-tighter text-[#9f9f9f]"
          >
            Podcast highlights
          </motion.h1>

          <motion.div
            initial={{ rotate: 22 }}
            whileHover={{ rotate: 24, y: -20 }}
            animate={
              isPressing || isActive ? { scale: 0.9, filter: "blur(4px)" } : {}
            }
            className="absolute bottom-[-200px] right-[66px] h-full w-[330px] cursor-pointer space-y-4 rounded-[40px] bg-gradient-to-t from-[#a69346] from-50% to-[#b54827] px-8 py-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8),0_0_0_4px_rgba(100,100,100,0.15)]"
          >
            <div className="flex justify-between text-lg font-medium tracking-tight text-[#eafafc]/50">
              <p>28 Jul</p>
              <div className="flex items-center gap-2">
                <p>Moral Of The Story</p>
                <Image src={imageMoral} alt="Moral" className="size-6 shadow" />
              </div>
            </div>
            <h2 className="text-2xl font-medium tracking-tighter text-[#eafafc]">
              Perform with Dr. Andy Galpin: Nutritions to sup&hellip;
            </h2>
            <div className="space-y-1">
              <div className="w-full space-y-1 rounded-[16px] border-[1.5px] border-white/10 bg-white/10 px-2.5 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#eafafc]">00:41</p>
                  <ChevronRight className="size-5 text-white/30" />
                </div>
                <h3 className="text-lg font-normal leading-snug text-[#eafafc]/70">
                  Strength of Evidence Scale, Creatine
                </h3>
              </div>
              <div className="w-full space-y-1 rounded-[16px] border-[1.5px] border-white/10 bg-white/10 px-2.5 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#eafafc]">00:47</p>
                  <ChevronRight className="size-5 text-white/30" />
                </div>
                <h3 className="text-lg font-normal leading-snug text-[#eafafc]/70">
                  Creatine Doses, Frequency, Adverse Issues; Food Sourc&hellip;
                </h3>
              </div>
              <div className="w-full space-y-2 rounded-[16px] border-[1.5px] border-white/10 bg-white/10 px-2.5 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#eafafc]">01:03</p>
                  <ChevronRight className="size-5 text-white/30" />
                </div>
                <h3 className="text-lg font-normal text-[#eafafc]/70">
                  The Upsides and Downsides of Creatine
                </h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ rotate: 8 }}
            whileHover={{ rotate: 10, y: -20 }}
            animate={
              isPressing || isActive ? { scale: 0.9, filter: "blur(4px)" } : {}
            }
            className="absolute bottom-[-170px] right-[92px] h-full w-[330px] cursor-pointer space-y-4 rounded-[40px] bg-gradient-to-tl from-[#5c5c5c] from-10% to-[#1f1f1f] px-8 py-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8),0_0_0_4px_rgba(100,100,100,0.15)]"
          >
            <div className="flex justify-between text-lg font-medium tracking-tight text-[#eafafc]/50">
              <p>8 Aug</p>
              <div className="flex items-center gap-2">
                <p className="truncate">TJRE</p>
                <Image
                  src={imageJoe}
                  alt="Joe Rogan"
                  className="size-6 shadow"
                />
              </div>
            </div>
            <h2 className="text-2xl font-medium tracking-tighter text-[#eafafc]">
              Perform with Dr. Andy Galpin: Nutritions to sup&hellip;
            </h2>
            <div className="space-y-1">
              <div className="w-full space-y-1 rounded-[16px] border-[1.5px] border-white/10 bg-white/10 px-2.5 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#eafafc]">00:41</p>
                  <ChevronRight className="size-5 text-white/30" />
                </div>
                <h3 className="text-lg font-normal leading-snug text-[#eafafc]/70">
                  Strength of Evidence Scale, Creatine
                </h3>
              </div>
              <div className="w-full space-y-1 rounded-[16px] border-[1.5px] border-white/10 bg-white/10 px-2.5 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#eafafc]">00:47</p>
                  <ChevronRight className="size-5 text-white/30" />
                </div>
                <h3 className="text-lg font-normal leading-snug text-[#eafafc]/70">
                  Creatine Doses, Frequency, Adverse Issues; Food Sourc&hellip;
                </h3>
              </div>
              <div className="w-full space-y-2 rounded-[16px] border-[1.5px] border-white/10 bg-white/10 px-2.5 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#eafafc]">01:03</p>
                  <ChevronRight className="size-5 text-white/30" />
                </div>
                <h3 className="text-lg font-normal text-[#eafafc]/70">
                  The Upsides and Downsides of Creatine
                </h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ rotate: -4 }}
            whileHover={!isActive ? { rotate: -6, y: -20 } : {}}
            onTapStart={() => setStatus("pressing")}
            onTapCancel={() => setStatus("idle")}
            onTap={() => setStatus("active")}
            animate={
              isPressing
                ? { scale: 1.05 }
                : isActive
                  ? {
                      top: 0,
                      rotate: 0,
                      left: 0,
                      width: "500px",
                      height: "100%",
                      padding: "40px",
                      transition: { ...transition, duration: 0.8 },
                    }
                  : {}
            }
            className="absolute bottom-[-140px] left-8 h-full w-[330px] cursor-pointer select-none space-y-4 rounded-[40px] bg-gradient-to-tl from-[#57b9e6] from-25% to-[#177cb0] px-8 py-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8),0_0_0_4px_rgba(100,100,100,0.15)]"
          >
            <div className="flex justify-between gap-4 text-lg font-medium tracking-tight text-[#eafafc]/50">
              <p>12 Aug</p>
              <div className="flex items-center gap-2">
                <p>Huberman Lab</p>
                <Image
                  src={imageHuberman}
                  alt="Huberman"
                  className="size-6 shadow"
                />
              </div>
            </div>
            <h2 className="text-2xl font-medium tracking-tighter text-[#eafafc]">
              Perform with Dr. Andy Galpin: Nutrition to Sup
              <span>
                {isActive ? "port Brain Health & Offest Brain Injuries" : "..."}
              </span>
            </h2>
            <div className="space-y-1">
              <div className="w-full space-y-1 rounded-[16px] border-[1.5px] border-white/10 bg-white/10 px-2.5 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#eafafc]">00:41</p>
                  <ChevronRight className="size-5 text-white/30" />
                </div>
                <h3 className="text-lg font-normal leading-snug text-[#eafafc]/70">
                  Strength of Evidence Scale, Creatine
                </h3>
              </div>
              <div className="w-full space-y-1 rounded-[16px] border-[1.5px] border-white/10 bg-white/10 px-2.5 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#eafafc]">00:47</p>
                  <ChevronRight className="size-5 text-white/30" />
                </div>
                <h3 className="text-lg font-normal leading-snug text-[#eafafc]/70">
                  Creatine Doses, Frequency, Adverse Issues; Food Sourc&hellip;
                </h3>
              </div>
              <div className="w-full space-y-2 rounded-[16px] border-[1.5px] border-white/10 bg-white/10 px-2.5 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#eafafc]">01:03</p>
                  <ChevronRight className="size-5 text-white/30" />
                </div>
                <h3 className="text-lg font-normal text-[#eafafc]/70">
                  The Upsides and Downsides of Creatine
                </h3>
              </div>
              <div className="w-full space-y-1 rounded-[16px] border-[1.5px] border-white/10 bg-white/10 px-2.5 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#eafafc]">00:41</p>
                  <ChevronRight className="size-5 text-white/30" />
                </div>
                <h3 className="text-lg font-normal leading-snug text-[#eafafc]/70">
                  Strength of Evidence Scale, Creatine
                </h3>
              </div>
              <div className="w-full space-y-1 rounded-[16px] border-[1.5px] border-white/10 bg-white/10 px-2.5 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#eafafc]">00:47</p>
                  <ChevronRight className="size-5 text-white/30" />
                </div>
                <h3 className="text-lg font-normal leading-snug text-[#eafafc]/70">
                  Creatine Doses, Frequency, Adverse Issues; Food Sourc&hellip;
                </h3>
              </div>
              <div className="w-full space-y-2 rounded-[16px] border-[1.5px] border-white/10 bg-white/10 px-2.5 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#eafafc]">01:03</p>
                  <ChevronRight className="size-5 text-white/30" />
                </div>
                <h3 className="text-lg font-normal text-[#eafafc]/70">
                  The Upsides and Downsides of Creatine
                </h3>
              </div>
            </div>

            <motion.div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#57b9e6] from-10%" />
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
