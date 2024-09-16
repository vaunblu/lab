"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Transition,
} from "framer-motion";
import React from "react";
import Image from "next/image";
import svgPhone from "@/assets/iphone-black.svg";
import imageShopDollar from "./shop-dollar.jpg";
import imageShop from "./shop.png";
import imageShopify from "./shopify.png";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

function InnerContent() {
  const ctx = React.useContext(Context);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[51px] bg-white p-2.5 text-[#1F1F1F]">
      <div className="flex justify-center pb-4 pt-12">
        <Image src={imageShop} alt="shop logo" className="h-auto w-14" />
      </div>
      <div className="relative isolate flex flex-1 flex-col justify-end overflow-hidden rounded-[46px] p-2.5">
        <Image
          src={imageShopDollar}
          alt="shop background"
          className="size-full absolute left-0 top-0 object-cover brightness-110"
        />

        <div className="z-10 flex w-full flex-col items-center space-y-6 rounded-[41px] bg-[#cccccc]/30 px-6 py-5 text-center backdrop-blur-xl">
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
            <div className="h-14 w-full rounded-full bg-[#5533ea]"></div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-[550]">Powered by</p>
              <Image
                src={imageShopify}
                alt="shopify logo"
                className="h-5 w-auto brightness-75 grayscale"
              />
            </div>
          </div>
        </div>
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
