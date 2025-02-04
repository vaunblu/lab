"use client";

import imageInterstellar from "./interstellar.jpg";
import imageMurph from "./murph.jpg";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Transition,
  Variants,
} from "framer-motion";
import React from "react";
import Image from "next/image";
import svgPhone from "@/assets/iphone-black.svg";
import { History, SquarePen } from "lucide-react";
import useMeasure from "react-use-measure";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

function InnerContent() {
  const ctx = React.useContext(Context);
  const [ref, bounds] = useMeasure();

  const isOpen = ctx.status === "open";

  function handleMenuToggle() {
    if (isOpen) {
      ctx.setStatus("idle");
    } else {
      ctx.setStatus("open");
    }
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[51px] bg-[#FAFAFA] font-medium text-[#1F1F1F]">
      <div className="flex w-full items-center justify-between px-6 pt-16">
        <History className="size-5" />
        <button onClick={handleMenuToggle}>menu</button>
        <SquarePen className="size-5" />
      </div>
      <motion.div animate={{ height: bounds.height }}>
        <div ref={ref}></div>
      </motion.div>

      <div className="relative flex h-screen flex-col bg-background px-6 py-4 leading-relaxed">
        <Image
          src={imageInterstellar}
          alt="Interstellar cover"
          placeholder="blur"
          className="h-auto w-32 rounded-3xl drop-shadow-[0_0px_35px_rgba(141,172,177,0.4)]"
        />

        <div className="space-y-1 text-sm">
          <h1 className="pt-6 text-2xl">Interstellar</h1>
          <div className="flex items-center gap-2">
            <Image
              src={imageMurph}
              alt="Murph"
              className="size-6 rounded-full object-cover object-top"
            />
            <p className="font-medium">Murph</p>
            <p className="text-muted-foreground">@jessicachastain</p>
          </div>
          <p className="text-muted-foreground">October 26, 2014</p>
        </div>

        <div className="max-w-md space-y-8 py-6">
          <p>
            {
              "Watching Interstellar was nothing short of an extraordinary journey that left me in awe long after the credits rolled. Directed by Christopher Nolan, this film transcends the boundaries of conventional cinema, taking us on a profound voyage through space and time that is as visually stunning as it is intellectually stimulating."
            }
          </p>
          <p>
            {
              "From the moment Interstellar begins, you are thrust into a future Earth on the brink of ecological collapse. The desperation and urgency are palpable, setting the stage for an epic quest to save humanity. What struck me immediately was the film's ability to blend grandiose science fiction with deeply personal storytelling. The relationship between Cooper, played masterfully by Matthew McConaughey, and his daughter Murph is the emotional heart of the film, grounding the cosmic adventure in a relatable human experience."
            }
          </p>
          <p>
            {
              "The visuals in Interstellar are nothing short of breathtaking. Nolan and his team have created a universe that feels both vast and intimate, filled with awe-inspiring imagery that ranges from the serene beauty of distant planets to the haunting isolation of space. The scenes involving the wormhole and black hole, in particular, are mesmerizing and showcase some of the best visual effects I’ve ever seen. These moments are not just eye candy; they are integral to the story, making the science of the film accessible and thrilling."
            }
          </p>
          <p>
            {
              "Hans Zimmer’s score is another standout element that elevates Interstellar to a whole new level. The music is powerful and haunting, perfectly complementing the film's themes of exploration and sacrifice. Zimmer’s use of the organ adds a unique, almost spiritual dimension to the soundtrack, making certain scenes resonate even more deeply."
            }
          </p>
        </div>
      </div>

      <motion.div
        initial={{ height: "20%" }}
        animate={isOpen ? { height: "50%" } : {}}
        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#FAFAFA]"
      />
      <motion.div
        initial={{ height: "30%" }}
        animate={isOpen ? { height: "80%" } : {}}
        className="absolute bottom-0 left-0 w-full backdrop-blur [mask:linear-gradient(0deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]"
      />
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
    </Context.Provider>
  );
}
