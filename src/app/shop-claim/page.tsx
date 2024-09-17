"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Transition,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React from "react";
import Image from "next/image";
import svgPhone from "@/assets/iphone-black.svg";
import imageShopDollar from "./shop-dollar.jpg";
import imageShop from "./shop.png";
import imageShopify from "./shopify.png";
import { ArrowRight, CheckIcon } from "lucide-react";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

function InnerContent() {
  const ctx = React.useContext(Context);
  const isClaimed = ctx.status === "claimed";
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 130], [1, 0]);
  const bgColor = useTransform(
    x,
    [0, 160],
    ["rgb(204 204 204 / 0.3)", "rgb(159 226 191 / 0.4)"],
  );

  React.useEffect(() => {
    if (isClaimed) {
      const timeout = setTimeout(() => {
        x.set(0);
        ctx.setStatus("idle");
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [isClaimed, ctx.setStatus]);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[51px] bg-white p-2.5 text-[#1F1F1F]">
      <div className="flex justify-center pb-4 pt-12">
        <Image src={imageShop} alt="shop logo" className="h-auto w-14" />
      </div>
      <div className="relative isolate flex flex-1 flex-col justify-end overflow-hidden rounded-[46px] border p-2.5">
        <Image
          src={imageShopDollar}
          alt="shop background"
          className="size-full absolute left-0 top-0 rounded-[46px] object-cover brightness-125 grayscale"
        />

        <motion.div
          style={{ backgroundColor: bgColor }}
          className="z-10 flex w-full flex-col items-center space-y-6 rounded-[46px] px-6 py-5 text-center backdrop-blur-xl"
        >
          <div className="space-y-3">
            <p className="text-2xl font-semibold tracking-tight">
              Here&apos;s $5!
            </p>
            <p className="max-w-xs text-lg font-[550] leading-snug tracking-tight">
              You can spend it in your Shop
              <br />
              app on your favorite brands or products.
            </p>
          </div>
          <div className="flex w-full flex-col items-center space-y-3">
            <div className="relative isolate h-14 w-full rounded-full bg-[#5533ea] p-1.5">
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 196 }}
                dragElastic={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x >= 196 || info.velocity.x > 500) {
                    ctx.setStatus("claimed");
                  } else {
                    x.set(0);
                  }
                }}
                whileTap={{ scale: 1.05 }}
                style={{ x }}
                className="relative z-10 grid h-full w-20 place-items-center rounded-full bg-white"
              >
                <ArrowRight className="text-[#5533ea]" strokeWidth={3} />
              </motion.div>
              <motion.p
                style={{ opacity }}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-lg font-[550] tracking-tight text-white"
              >
                Claim $5 Shop Cash
              </motion.p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-[550]">Powered by</p>
              <Image
                src={imageShopify}
                alt="shopify logo"
                className="h-5 w-auto brightness-75 grayscale"
              />
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isClaimed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="size-full absolute left-0 top-0 z-20 flex flex-col items-center justify-center gap-6 rounded-[41px] backdrop-blur-xl"
            >
              <motion.div
                initial={{ scale: 1.15, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                className="size-16 relative flex items-center justify-center rounded-full bg-[#7baf93] p-3 text-white shadow-[0_1px_1px_0_rgba(0,0,0,0.02),0_4px_8px_0_rgba(0,0,0,0.04)] ring-[0.8px] ring-black/[0.08]"
              >
                <CheckIcon strokeWidth={4} className="size-full" />
              </motion.div>

              <motion.p
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                className="text-balance max-w-[180px] pb-6 text-center text-2xl font-[550] tracking-tight text-white"
              >
                You claimed $5 in Shop Cash!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isClaimed && (
            <>
              <motion.div
                initial={{ bottom: "-67%" }}
                animate={{ top: "-67%" }}
                transition={{ ...transition, duration: 1 }}
                className="absolute left-0 z-30 h-2/3 w-1 -translate-x-px bg-[radial-gradient(circle,rgba(159,226,191,1)_0%,rgba(0,0,0,0)_100%)]"
              />
              <motion.div
                initial={{ bottom: "-67%" }}
                animate={{ top: "-67%" }}
                transition={{ ...transition, duration: 1 }}
                className="absolute right-0 z-30 h-2/3 w-1 translate-x-px bg-[radial-gradient(circle,rgba(159,226,191,1)_0%,rgba(0,0,0,0)_100%)]"
              />
            </>
          )}
        </AnimatePresence>
      </div>
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
        <main className="flex h-screen select-none items-center justify-center overflow-hidden">
          <div
            className={cn(
              "relative flex aspect-square h-screen items-center justify-center bg-gradient-to-br from-[#FFFFFF] from-20% to-[#EEEEEE] transition-colors duration-300",
            )}
          >
            <div className="absolute left-1/2 top-1/2 z-20 h-[814px] w-[376px] -translate-x-1/2 -translate-y-1/2">
              <InnerContent />
            </div>

            <Image
              src={svgPhone}
              alt="iphone mock"
              className="pointer-events-none relative z-30"
            />
          </div>
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
