"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, Send, Star, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./styles.module.css";

export const RatePopoverContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => null,
  active: false,
  setActive: () => null,
});

const loveThisVariants = {
  press: (custom: { y: number; rotate: number }) => ({
    y: custom.y,
    rotate: custom.rotate,
    transition: { duration: 0.1 },
  }),
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: (custom: {
    animateX: number;
    animateY: number;
    animateRotate?: number;
  }) => ({
    opacity: 1,
    scale: 1,
    x: custom.animateX,
    y: custom.animateY,
    rotate: custom.animateRotate ?? 0,
  }),
  exit: (custom: { exitX: number; exitY: number; exitRotate?: number }) => ({
    opacity: 0.5,
    scale: 0.5,
    x: custom.exitX,
    y: custom.exitY,
    rotate: custom.exitRotate ?? 0,
  }),
};

const loveThisBaseTransition = {
  type: "spring",
  stiffness: 600,
  damping: 100,
  duration: 0.48,
};

function Particles() {
  return (
    <>
      <motion.div
        variants={loveThisVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{
          animateX: 7,
          animateY: -9,
          exitX: 18,
          exitY: -12,
        }}
        transition={{
          ...loveThisBaseTransition,
          stiffness: 600,
        }}
        className="size-1.5 absolute bottom-4 right-3 rounded-full bg-foreground"
      />
      <motion.div
        variants={loveThisVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{
          animateX: 15,
          animateY: -20,
          exitX: 35,
          exitY: -15,
        }}
        transition={{
          ...loveThisBaseTransition,
          stiffness: 500,
        }}
        className="size-2.5 absolute bottom-5 right-2 rounded-full bg-foreground"
      />
      <motion.div
        variants={loveThisVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{
          animateX: 5,
          animateY: -15,
          exitX: 10,
          exitY: -12,
        }}
        transition={{
          ...loveThisBaseTransition,
          stiffness: 800,
        }}
        className="size-2 absolute -top-2 right-2 rounded-full bg-foreground"
      />
      <motion.div
        variants={loveThisVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{
          animateX: -15,
          animateY: -9,
          exitX: -20,
          exitY: -12,
        }}
        transition={{
          ...loveThisBaseTransition,
          stiffness: 600,
        }}
        className="size-1.5 absolute left-3 top-2 rounded-full bg-foreground"
      />
      <motion.div
        variants={loveThisVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{
          animateX: -17,
          animateY: -15,
          exitX: -21,
          exitY: -10,
          animateRotate: -30,
          exitRotate: -80,
        }}
        transition={{
          ...loveThisBaseTransition,
          stiffness: 600,
        }}
        className="absolute -top-2 left-6"
      >
        <Star
          className="size-3.5 text-foreground"
          fill="hsl(var(--foreground))"
        />
      </motion.div>
      <motion.div
        variants={loveThisVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{
          animateX: 20,
          animateY: -12,
          exitX: 25,
          exitY: -10,
          animateRotate: 30,
          exitRotate: 80,
        }}
        transition={{
          ...loveThisBaseTransition,
          stiffness: 600,
        }}
        className="absolute right-2 top-1"
      >
        <Star
          className="size-3.5 text-foreground"
          fill="hsl(var(--foreground))"
        />
      </motion.div>
    </>
  );
}

function ThumbsUpIcon(props: { active: boolean; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill={props.active ? "hsl(var(--foreground))" : "currentColor"}
      stroke="hsl(var(--foreground))"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      className={cn(
        "lucide lucide-thumbs-up text-background transition-all group-hover:text-muted",
        styles.child,
        props.className,
      )}
      viewBox="0 0 25 25"
    >
      <path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 011.92 2.56l-2.33 8A2 2 0 0117.5 22H4a2 2 0 01-2-2v-8a2 2 0 012-2h2.76a2 2 0 001.79-1.11L12 2a3.13 3.13 0 013 3.88z"></path>
    </svg>
  );
}

function LoveThisButton() {
  const ctx = React.useContext(RatePopoverContext);
  const [loveThis, setLoveThis] = React.useState(false);

  React.useEffect(() => {
    if (loveThis) {
      const timeout = setTimeout(() => {
        setLoveThis(false);
      }, 500);

      setTimeout(() => {
        ctx.setOpen(false);
      }, 600);

      setTimeout(() => {
        ctx.setActive(false);
      }, 1500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loveThis, setLoveThis, ctx.setOpen]);

  const allowTap = !loveThis && !ctx.active;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-16 relative rounded-full"
      onClick={() => {
        if (allowTap) {
          setLoveThis((prevState) => !prevState);
          ctx.setActive((prevState) => !prevState);
        }
      }}
    >
      <motion.div
        whileTap={allowTap ? "press" : ""}
        tabIndex={-1}
        className={cn("size-full group", styles.border)}
      >
        <motion.div
          variants={loveThisVariants}
          custom={{ y: 7, rotate: 2 }}
          animate={
            loveThis
              ? {
                y: -25,
                x: -3,
                rotate: -2,
              }
              : {}
          }
          transition={{
            ...loveThisBaseTransition,
            stiffness: 800,
          }}
          className="absolute bottom-3.5 left-3.5 z-20"
        >
          <ThumbsUpIcon active={ctx.active} />
        </motion.div>
        <motion.div
          variants={loveThisVariants}
          custom={{ y: 5, rotate: -2 }}
          animate={
            loveThis
              ? {
                y: -27,
                x: 3,
                rotate: 2,
              }
              : {}
          }
          transition={{ ...loveThisBaseTransition, delay: 0.05 }}
          className="absolute right-2.5 top-[12px] z-10"
        >
          <ThumbsUpIcon active={ctx.active} />
        </motion.div>
      </motion.div>
      <AnimatePresence>{loveThis && <Particles />}</AnimatePresence>
    </Button>
  );
}

function RatePopover() {
  const ctx = React.useContext(RatePopoverContext);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
      <Popover.Root open={ctx.open} onOpenChange={ctx.setOpen}>
        <Popover.Trigger className="rounded-full">
          <AnimatePresence initial={false}>
            {!ctx.open ? (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="size-14 inline-flex items-center justify-center whitespace-nowrap rounded-full p-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  <ThumbsUp
                    className="size-8 cursor-pointer"
                    fill={ctx.active ? "currentColor" : "none"}
                  />
                </div>
                <p>{ctx.active ? "Rated" : "Rate"}</p>
              </motion.div>
            ) : (
              <div className="h-[88px] w-[56px]" />
            )}
          </AnimatePresence>
        </Popover.Trigger>

        <AnimatePresence initial={false}>
          {ctx.open && (
            <Popover.Portal forceMount>
              <>
                <Popover.Content side="top" sideOffset={20} asChild>
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    className="relative z-50 flex items-end gap-4 rounded-full border bg-popover px-8 pb-4 pt-3 font-semibold text-popover-foreground shadow-md outline-none"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-16 rounded-full p-2"
                      >
                        <ThumbsDown className="size-10" />
                      </Button>
                      <p className="text-nowrap">Not for me</p>
                    </div>
                    <div className="flex flex-col items-center gap-2.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-16 rounded-full p-2"
                      >
                        <ThumbsUp className="size-10" />
                      </Button>
                      <p className="text-nowrap">I like this</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <LoveThisButton />
                      <p className="text-nowrap">Love this!</p>
                    </div>
                    <Popover.Close className="absolute -bottom-[68px] left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full bg-white p-1.5 shadow-md">
                      <X className="size-7" />
                    </Popover.Close>
                  </motion.div>
                </Popover.Content>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  className="size-full absolute left-0 top-0 z-40 bg-black"
                />
              </>
            </Popover.Portal>
          )}
        </AnimatePresence>
      </Popover.Root>
    </MotionConfig>
  );
}

export function LoveThis() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(false);

  return (
    <RatePopoverContext.Provider value={{ open, setOpen, active, setActive }}>
      <div className="flex items-end gap-14 font-semibold">
        <div className="flex flex-col items-center gap-2">
          <Button variant="ghost" size="icon" className="size-14 rounded-full">
            <Check className="size-8" />
          </Button>
          <p>My List</p>
        </div>

        <RatePopover />

        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-14 rounded-full p-2"
          >
            <Send className="size-7 translate-y-0.5" />
          </Button>
          <p>Share</p>
        </div>
      </div>
    </RatePopoverContext.Provider>
  );
}
