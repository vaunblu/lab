"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import {
  MessageSquare,
  Send,
  Star,
  Sun,
  ALargeSmall,
  Text,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./styles.module.css";
import useMeasure from "react-use-measure";

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
      stroke={
        props.active ? "hsl(var(--foreground))" : "hsl(var(--foreground))"
      }
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      className={cn(
        "lucide lucide-thumbs-up text-background transition-all",
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
    <button
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
    </button>
  );
}

const triggerVariants = {
  press: {
    scale: 0.9,
  },
};

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
                whileTap={"press"}
                variants={triggerVariants}
                className="flex flex-col items-center gap-2"
              >
                <div className="size-14 inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  <ThumbsUp
                    className={cn(
                      "size-7 cursor-pointer text-muted-foreground",
                      { "text-primary": ctx.active },
                    )}
                    fill={ctx.active ? "currentColor" : "none"}
                  />
                </div>
              </motion.div>
            ) : (
              <div className="h-[56px] w-[56px]" />
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
                    className="relative z-50 flex items-end gap-4 rounded-full border bg-muted px-12 pb-5 pt-3 font-medium text-foreground outline-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
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
                    <Popover.Close className="absolute -bottom-[68px] left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full bg-background p-1.5 shadow-md">
                      <X className="size-7" />
                    </Popover.Close>
                  </motion.div>
                </Popover.Content>

                {ctx.open && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed bottom-0 left-0 z-40 h-[300px] w-full bg-gradient-to-t from-background/80 from-25% to-transparent"
                  />
                )}
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
  const [ref, bounds] = useMeasure();

  return (
    <RatePopoverContext.Provider value={{ open, setOpen, active, setActive }}>
      <div className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 rounded-full border border-foreground/10 bg-muted p-1 px-4 font-semibold drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] sm:w-fit">
        <div className="flex flex-col items-center gap-2">
          <Button variant="ghost" size="icon" className="size-14 rounded-full">
            <MessageSquare className="size-7 text-muted-foreground" />
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-14 rounded-full p-2"
          >
            <Send className="size-7 text-muted-foreground" />
          </Button>
        </div>
        <RatePopover />

        <div className="px-2">
          <div className="h-8 w-px rounded bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-14 rounded-full p-2"
          >
            <Text className="size-7 text-muted-foreground" />
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-14 rounded-full p-2"
          >
            <ALargeSmall className="size-7 text-muted-foreground" />
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-14 rounded-full p-2"
          >
            <Sun className="size-7 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <motion.div
        animate={{
          height: bounds.height,
        }}
        className="absolute bottom-0 left-0 z-0 w-full bg-gradient-to-t from-background/95 from-35% to-background/0"
      >
        <motion.div ref={ref} className={cn(open ? "h-[60vh]" : "h-[280px]")} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        className="size-full fixed -top-[48px] left-0 z-0 bg-background/30 backdrop-blur-sm"
      />
    </RatePopoverContext.Provider>
  );
}
