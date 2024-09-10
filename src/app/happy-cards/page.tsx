"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import imageBird from "@/assets/bird.jpg";
import imageTiger from "@/assets/tiger.jpg";
import imageFish from "@/assets/fish.jpg";
import imageMonkey from "@/assets/monkey.jpg";
import Image from "next/image";
import React from "react";
import { X } from "lucide-react";
import svgPhone from "./iphone-black.svg";
import { cn } from "@/lib/utils";

const cards = [
  {
    id: "bird",
    image: imageBird,
    title: `Freedom Has\nNo Bounds\nFor You`,
    color: "#374a36",
  },
  {
    id: "tiger",
    image: imageTiger,
    title: `Fierce Beyond\nComprehension`,
    color: "#fff",
  },
  {
    id: "fish",
    image: imageFish,
    title: `Tranquility Fills\nYour Heart`,
    color: "#666",
  },
  {
    id: "monkey",
    image: imageMonkey,
    title: `Wisdom Triumphs\nOver Trivialities`,
    color: "#000",
  },
];

type Card = (typeof cards)[0];

function AnimalCard(props: { card: Card }) {
  const ctx = React.useContext(HappyCardsContext);

  return (
    <motion.div
      key={props.card.id}
      layoutId={`container-${props.card.id}`}
      onTapStart={() => ctx.setPressing(true)}
      onTapCancel={() => ctx.setPressing(false)}
      onTap={() => ctx.setPressing(false)}
      custom={{ open: ctx.active }}
      data-open={ctx.active}
      onClick={() => ctx.setActive(props.card)}
      whileHover={{ scale: 1.05 }}
      animate={
        ctx.pressing
          ? {
              filter: "blur(4px)",
              scale: 0.95,
            }
          : {}
      }
      whileTap={{ scale: 1.05, filter: "blur(0px)" }}
      className={cn(
        "relative h-[150px] w-[150px] overflow-hidden rounded-[24px] data-[open=false]:shadow-[-16px_-16px_64px_-32px_rgba(56,76,55,1),0_32px_64px_-32px_rgba(53,113,201,0.8),32px_0_64px_-32px_rgba(153,170,4,0.6)]",
      )}
    >
      <motion.div
        key={props.card.id}
        layoutId={`image-${props.card.id}`}
        className="size-full"
      >
        <Image
          src={props.card.image}
          alt={props.card.id}
          className="size-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

function InnerContent() {
  const ctx = React.useContext(HappyCardsContext);
  const [closeHovered, setCloseHovered] = React.useState(false);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}>
      <div className="relative flex h-full flex-col items-center justify-center rounded-[51px] bg-[#FFFCFC]">
        <AnimatePresence>
          {ctx.active && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, y: 5 }}
              className="fixed left-0 top-4 z-50 flex w-full justify-end px-8"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={
                    closeHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 5 }
                  }
                >
                  <p className="rounded-full bg-white px-2 py-0.5 text-[12px] font-medium text-[#1a1a1a]">
                    Close
                  </p>
                </motion.div>
                <motion.div
                  onHoverStart={() => setCloseHovered(true)}
                  onHoverEnd={() => setCloseHovered(false)}
                  onTapStart={() => setCloseHovered(true)}
                  onTapCancel={() => setCloseHovered(false)}
                  onTap={() => {
                    ctx.setActive(null);
                    setCloseHovered(false);
                    ctx.setPressing(false);
                  }}
                  onClick={() => {
                    ctx.setActive(null);
                    setCloseHovered(false);
                    ctx.setPressing(false);
                  }}
                >
                  <X className="size-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {ctx.active && (
            <motion.div
              key={`container-${ctx.active.id}`}
              layoutId={`container-${ctx.active.id}`}
              animate={
                closeHovered
                  ? {
                      scaleX: 0.95,
                      scaleY: 0.975,
                    }
                  : {}
              }
              custom={{ open: ctx.active }}
              data-open={ctx.active}
              className="size-full relative z-40 overflow-hidden rounded-[51px] data-[open=false]:shadow-[-16px_-16px_64px_-32px_rgba(56,76,55,1),0_32px_64px_-32px_rgba(53,113,201,0.8),32px_0_64px_-32px_rgba(153,170,4,0.6)]"
            >
              <motion.div
                key={`image-${ctx.active.id}`}
                layoutId={`image-${ctx.active.id}`}
                className="size-full"
              >
                <Image
                  src={ctx.active.image}
                  alt={ctx.active.id}
                  className="size-full object-cover"
                />
              </motion.div>

              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 top-0 h-1/5 w-full rounded-t-[24px] bg-transparent backdrop-blur-md [mask:linear-gradient(180deg,rgba(0,0,0,1)_30%,rgba(0,0,0,0)_100%)]"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-0 top-0 h-full w-1/5 rounded-l-[24px] bg-transparent backdrop-blur-md [mask:linear-gradient(270deg,rgba(0,0,0,1)_30%,rgba(0,0,0,0)_100%)]"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-0 left-0 h-1/2 w-full rounded-b-[24px] bg-transparent backdrop-blur-md [mask:linear-gradient(0deg,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_100%)]"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 top-0 h-full w-1/5 rounded-l-[24px] bg-transparent backdrop-blur-md [mask:linear-gradient(90deg,rgba(0,0,0,1)_30%,rgba(0,0,0,0)_100%)]"
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  custom={{ open: ctx.active }}
                  className={cn(
                    "absolute left-0 top-0 h-1/4 w-full bg-gradient-to-b",
                    {
                      "from-[#2b392a]": ctx.active.id === "bird",
                      "from-[#5a4002]": ctx.active.id === "tiger",
                      "from-[#05104e]": ctx.active.id === "fish",
                      "from-[#1f2931]": ctx.active.id === "monkey",
                    },
                  )}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  custom={{ open: ctx.active }}
                  className={cn(
                    "absolute bottom-0 left-0 h-1/4 w-full bg-gradient-to-t",
                    {
                      "from-[#cc5929]": ctx.active.id === "bird",
                      "from-[#ae9463]": ctx.active.id === "tiger",
                      "from-[#12376a]": ctx.active.id === "fish",
                      "from-[#b99a62]": ctx.active.id === "monkey",
                    },
                  )}
                />

                <div className="absolute bottom-24 left-6 space-y-3">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="whitespace-pre-wrap text-2xl font-medium leading-tight text-white"
                  >
                    {ctx.active.title}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-sm font-medium uppercase tracking-wider text-white/60"
                  >
                    Discover who you truly are
                  </motion.p>
                </div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={
            ctx.pressing
              ? {
                  filter: "blur(4px)",
                  scale: 0.95,
                }
              : {}
          }
          className="absolute left-0 top-0 w-full space-y-8 p-6 pt-20"
        >
          <h1 className="whitespace-pre-wrap font-serif text-3xl">
            {`Discover who\nyou truly are`}
          </h1>
          <div className="space-y-4">
            <p>
              There’s a reason so many human cultures ponder the question, ”
              What animal am I?” You’ve probably wondered yourself. Native
              Americans asked, ” What is my spirit animal?” and went to find
              their guardian in the forest, while Asian cultures relied on the
              animal zodiac and Europeans turned to astrology.
            </p>
            <p>
              How can you determine your inner animal? Fortunately it’s 2018, so
              you don’t have to venture into the woods to find your spirit
              animal or decipher ancient star charts. The Animal in You fuses
              ancient traditions with modern psychological and biological
              concepts and its nine question personality quiz has almost fifty
              possible animal results. It’s eerily accurate, and best of all…
              it’s free!
            </p>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 h-full w-full rounded-b-[24px] bg-gradient-to-t from-[#fafafa] from-45% to-60%" />

        <div className="absolute bottom-8 flex w-full flex-wrap gap-6 px-6">
          {cards.map((card) => (
            <AnimalCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}

const HappyCardsContext = React.createContext<{
  pressing: boolean;
  setPressing: React.Dispatch<React.SetStateAction<boolean>>;
  active: Card | null;
  setActive: React.Dispatch<React.SetStateAction<Card | null>>;
}>({
  pressing: false,
  setPressing: () => null,
  active: null,
  setActive: () => null,
});

export default function HappyCardsPage() {
  const [active, setActive] = React.useState<Card | null>(null);
  const [pressing, setPressing] = React.useState(false);

  React.useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPressing(false);
        setActive(null);
      }
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setActive, setPressing]);

  return (
    <HappyCardsContext.Provider
      value={{ active, setActive, pressing, setPressing }}
    >
      <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.5 }}>
        <main className="flex h-screen select-none items-center justify-center overflow-hidden">
          <div
            className={cn(
              "relative flex aspect-square h-screen items-center justify-center bg-[#fafafa] transition-colors duration-300",
              {
                "bg-[#344132]/40": active?.id === "bird",
                "bg-[#6b4806]/20": active?.id === "tiger",
                "bg-[#87ceda]/30": active?.id === "fish",
                "bg-[#35414e]/30": active?.id === "monkey",
              },
            )}
          >
            <div className="absolute left-1/2 top-1/2 z-20 h-[813px] w-[376px] -translate-x-1/2 -translate-y-1/2">
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
      </MotionConfig>
    </HappyCardsContext.Provider>
  );
}
