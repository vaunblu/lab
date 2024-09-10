"use client";

import { motion, MotionConfig, useMotionValue, Variants } from "framer-motion";
import * as React from "react";
import { useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { Heart } from "lucide-react";

function Card(props: {
  className?: string;
  cardClassName?: string;
  index: number;
  activeCard: number;
  setActiveCard: React.Dispatch<React.SetStateAction<number>>;
  src: string;
  title: string;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const x = useMotionValue(0.5);
  const xFromCenter = useMotionValue(0);

  const rotate = useTransform(x, [0, 1], [5, -5]);
  const translateY = useTransform(xFromCenter, [0, 1], [-30, -5]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set((event.clientX - rect.left) / rect.width);
    xFromCenter.set(
      (Math.abs(event.clientX - rect.left - rect.width / 2) / rect.width) * 2,
    );
  }

  const cardVariants: Variants = {
    press: {
      rotate: rotate.get() * (props.activeCard === props.index ? -1 : 1),
      translateY:
        translateY.get() * (props.activeCard === props.index ? -1 : 1),
    },
  };

  const titleOverlayVariants: Variants = {
    press: { opacity: props.activeCard === props.index ? 0 : 0.5 },
  };

  return (
    <motion.div
      key={props.index}
      animate={
        props.activeCard === props.index
          ? { translateY: -420 + (props.index - 1) * -72 }
          : props.activeCard !== 0
            ? { translateY: 32 }
            : {}
      }
      style={{ bottom: `-${props.index * 72}px` }}
      className={cn("absolute left-0 w-full px-6", props.className)}
    >
      <motion.div
        key={props.index}
        whileTap={"press"}
        variants={cardVariants}
        onClick={() =>
          props.setActiveCard((prevState) => {
            if (prevState === props.index) return 0;
            return props.index;
          })
        }
        onMouseOver={() => videoRef.current?.play()}
        onMouseLeave={() => {
          if (props.activeCard !== props.index) {
            videoRef.current?.pause();
          }
        }}
        onMouseMove={handleMouse}
        className={cn(
          "relative aspect-square overflow-hidden rounded-2xl bg-gray-300 text-background drop-shadow-[0_0_20px_rgba(0,0,0,0.0)] grayscale first:drop-shadow-[0_-50px_100px_rgba(0,0,0,0.075)] hover:grayscale-0",
          { "grayscale-0": props.activeCard === props.index },
          props.cardClassName,
        )}
      >
        <video
          ref={videoRef}
          src={props.src}
          muted
          loop
          className="aspect-square"
        />
        <motion.div
          variants={titleOverlayVariants}
          animate={{ opacity: props.activeCard !== props.index ? 1 : 0 }}
          className="absolute top-0 h-[144px] w-full bg-gradient-to-b from-foreground/30 to-transparent"
        >
          <p className="select-none p-6 text-background">{props.title}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Cards() {
  const [activeCard, setActiveCard] = React.useState(0);
  useMousePosition();

  return (
    <MotionConfig transition={{ duration: 0.6, type: "spring", bounce: 0.1 }}>
      <div className="relative flex h-full w-full max-w-[472px] flex-col justify-between overflow-hidden bg-background p-6">
        <motion.div
          animate={{ scale: activeCard !== 0 ? 0.95 : 1 }}
          className="size-full"
        >
          <div className="mx-8 space-y-2 pt-16">
            <h1 className="text-3xl tracking-tight">July recap</h1>
            <p className="ml-1 text-sm text-muted-foreground">2024</p>
          </div>
          <div className="mx-8 mt-[96px] flex flex-col items-center justify-between gap-6 space-y-2 whitespace-pre rounded-3xl bg-background px-8 py-6 drop-shadow-[0_0_100px_rgba(0,0,0,0.075)]">
            <div className="flex w-full justify-end">
              <Heart
                fill="rgb(252 165 165)"
                className="h-auto w-9 text-red-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.05)]"
              />
            </div>
            <div className="flex w-full justify-start">
              <div className="space-y-2">
                <p className="text-3xl">Thank you</p>
                <p className="text-sm font-light">For all the support</p>
              </div>
            </div>
            <div className="flex w-full justify-start">
              <div className="rounded-full border bg-muted/80 px-8 py-2 text-[12px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.05)] backdrop-blur-md">
                480+ followers
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          animate={{ opacity: activeCard !== 0 ? 1 : 0 }}
          className="size-full absolute left-0 top-0 bg-background/20 backdrop-blur-sm"
        />
        <Card
          index={1}
          title="Love This"
          src="/love-this/9-hours.mp4"
          activeCard={activeCard}
          setActiveCard={setActiveCard}
        />
        <Card
          index={2}
          title="Figma navbar"
          src="/love-this/2.25-hours.mp4"
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          cardClassName="bg-blue-300"
        />
        <Card
          index={3}
          title="SimpleKit"
          src="/love-this/simple-kit.mp4"
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          cardClassName="bg-red-300"
        />
        <Card
          index={4}
          title="Fade away cards"
          src="/love-this/fade-away.mp4"
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          cardClassName="bg-red-300"
        />
        <Card
          index={5}
          title="Swap component"
          src="/love-this/swap-component.mp4"
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          cardClassName="bg-red-300"
        />
      </div>
    </MotionConfig>
  );
}
