"use client";

import imageInterstellar from "./interstellar.jpg";
import imageMurph from "./murph.jpg";

import { cn } from "@/lib/utils";
import { motion, MotionConfig, Transition, Variants } from "framer-motion";
import React from "react";
import Image from "next/image";
import svgPhone from "@/assets/iphone-black.svg";
import {
  Bolt,
  ChevronUp,
  Globe,
  History,
  Home,
  SquarePen,
  Star,
  SwatchBook,
} from "lucide-react";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.8 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

function DropdownItem(props: {
  className?: string;
  children: React.ReactNode;
}) {
  const dropdownItemVariants: Variants = {
    closed: { y: -190, filter: "blur(0.5px)" },
    open: { y: 0, filter: "blur(0px)" },
  };

  return (
    <motion.div
      variants={dropdownItemVariants}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-full px-2 py-1 transition-colors duration-500 hover:bg-muted",
        props.className,
      )}
    >
      {props.children}
    </motion.div>
  );
}

function InnerContent() {
  const ctx = React.useContext(Context);

  const isOpen = ctx.status === "open";

  function handleMenuToggle() {
    if (isOpen) {
      ctx.setStatus("idle");
    } else {
      ctx.setStatus("open");
    }
  }

  const dropdownVariants: Variants = {
    closed: {
      height: 0,
      borderColor: "rgba(225, 225, 225, 0)",
      marginBottom: 0,
    },
    open: {
      height: "auto",
      borderColor: "rgba(225, 225, 225, 0.5)",
      marginBottom: 32,
    },
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[51px] bg-[#FAFAFA] font-medium text-[#1F1F1F]">
      <div className="flex w-full items-center justify-between px-6 pt-16">
        <History strokeWidth={2.1} className="size-6" />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleMenuToggle}
          className="flex items-center gap-1.5 text-lg font-medium"
        >
          menu
          <motion.span
            initial={{ rotate: 0 }}
            animate={isOpen ? { rotate: 180 } : {}}
            transition={{ ...transition, type: "ease-out" }}
          >
            <ChevronUp
              strokeWidth={3}
              className="size-4 text-muted-foreground/80"
            />
          </motion.span>
        </motion.button>
        <SquarePen strokeWidth={2.1} className="size-6" />
      </div>

      <motion.div
        variants={dropdownVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{
          ...transition,
          staggerChildren: isOpen ? 0.08 : 0,
          staggerDirection: -1,
        }}
        className="z-10 mx-4 mt-4 border-t"
      >
        <div className="relative space-y-1 overflow-hidden pt-4">
          <DropdownItem>
            <Home
              strokeWidth={2.5}
              className="size-5 text-muted-foreground/80"
            />
            Return home
          </DropdownItem>
          <DropdownItem className="justify-between pr-1">
            <div className="flex items-center gap-3">
              <Star
                strokeWidth={2.5}
                className="size-5 text-muted-foreground/80"
              />
              Rating
            </div>
            <div className="rounded-full bg-primary px-2 py-0.5 text-sm text-primary-foreground">
              5 stars
            </div>
          </DropdownItem>
          <DropdownItem>
            <Globe
              strokeWidth={2.5}
              className="size-5 text-muted-foreground/80"
            />
            Language
          </DropdownItem>
          <DropdownItem className="justify-between pr-1">
            <div className="flex items-center gap-3">
              <SwatchBook
                strokeWidth={2.5}
                className="size-5 text-muted-foreground/80"
              />
              Appearance
            </div>
            <div className="flex items-center rounded-full bg-muted-foreground/20 p-0.5 text-sm">
              <div className="rounded-full bg-background px-2 py-0.5 ">
                Light
              </div>
              <div className="rounded-full px-2 py-0.5 ">Dark</div>
            </div>
          </DropdownItem>
          <DropdownItem>
            <Bolt
              strokeWidth={2.5}
              className="size-5 text-muted-foreground/80"
            />
            Settings
          </DropdownItem>
        </div>
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
        animate={isOpen ? { height: "80%" } : {}}
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
  const [status, setStatus] = React.useState("open");
  // const [status, setStatus] = React.useState("idle");

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
              "relative flex aspect-square h-screen items-center justify-center bg-gradient-to-br from-[#FFFFFF] from-20% to-[#EEEEEE] transition-colors duration-200",
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
