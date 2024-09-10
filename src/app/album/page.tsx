"use client";

import Image, { type StaticImageData } from "next/image";
import imageCase from "./case.png";
import imageSaltFlats from "./salt-flats.jpg";
import imageMexico from "./mexico.jpg";
import imageCouple from "./couple.jpg";
import imageBeach from "./beach.jpg";
import svgPhone from "@/assets/iphone-gold.svg";
import React from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import {
  Ellipsis,
  Heart,
  Images,
  Pause,
  Play,
  Search,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.css";
import { Progress } from "@/components/ui/progress";

const albums = [
  {
    time: "12:28",
    year: "2022",
    title: "Salt Lake City, Utah",
    image: imageSaltFlats,
  },
  {
    time: "14:58",
    year: "2022",
    title: "Tulum, Mexico",
    image: imageMexico,
  },
  {
    time: "09:10",
    year: "2023",
    title: "San Diego, California",
    image: imageCouple,
  },
  {
    time: "10:40",
    year: "2023",
    title: "Santorini, Greece",
    image: imageBeach,
  },
];

function AlbumCard(props: {
  image: StaticImageData;
  year: string;
  title: string;
  time: string;
}) {
  const ctx = React.useContext(StagingContext);

  return (
    <div
      onMouseOver={() => ctx.setActiveCard(props.title)}
      onClick={() => {
        if (ctx.activeCard === props.title) {
          ctx.setFocusedCard(props.title);
          return;
        }
        ctx.setActiveCard(props.title);
      }}
      onMouseLeave={() => ctx.setActiveCard("")}
      className="group rounded p-4 pb-5 transition-colors duration-500 hover:bg-[#ececec] hover:shadow-[0_24px_24px_-12px_rgba(0,0,0,0.06)]"
    >
      <div className="space-y-3 font-mono text-[8px] font-medium uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div>
          <p>
            Album travelling time{" "}
            <span className="font-black">{props.time}</span>
          </p>
          <p>
            Photos take on family trip in{" "}
            <span className="font-black">May 2023</span>
          </p>
        </div>
        <div>
          <p>
            Taken on <span className="font-black">Konica AF3</span>
          </p>
          <p>
            Shot on <span className="font-black">35 MM</span>
          </p>
        </div>
        <div>
          <p>Currated by gabbi @glyphg0rl</p>
        </div>
      </div>

      <motion.div
        layoutId={props.title + "album-wrapper"}
        className="relative -mt-1 aspect-square w-full"
      >
        <div className="relative translate-y-4">
          <Image src={imageCase} alt="CD case" className="relative z-10" />
          <div className="absolute left-[42px] top-[14px] z-40 aspect-square w-4/5 overflow-hidden rounded-full drop-shadow-md">
            <Image
              src={props.image}
              alt={props.title}
              className="size-full object-cover object-right shadow-[0_6px_6px_-3px_rgba(0,0,0,0.1)]"
            />
            <div className="size-full absolute left-0 top-0 flex items-center justify-center backdrop-blur-[0.5px]">
              <div className="size-6 rounded-full bg-[#241b16] shadow" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-7 left-1/2 h-12 w-2/3 -translate-x-1/2 rounded-t-lg bg-white/30 shadow-[0_-6px_6px_3px_rgba(0,0,0,0.06)] backdrop-blur-sm" />
        <div className="absolute bottom-0 left-0 h-6 w-full rounded-[2px] bg-gradient-to-br from-[#c1c1c1] from-20% to-[#929292] shadow-[0_-3px_8px_4px_rgba(0,0,0,0.15)] blur-[0.3px]" />
      </motion.div>

      <h3 className="pt-4 text-xl tracking-tight opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="pr-[1ch] font-bold">{props.year}</span>
        {props.title}
      </h3>
    </div>
  );
}

function InnerContent() {
  const ctx = React.useContext(StagingContext);
  const focusedCard = albums.find(
    (album) => album.title === ctx.focusedCardTitle,
  );
  const controls = useDragControls();
  const albumY = useMotionValue(0);
  const [albumStatus, setAlbumStatus] = React.useState<
    "idle" | "inserted" | "loading" | "done"
  >("idle");
  const playerX = useMotionValue(0);
  const playerY = useMotionValue(0);
  const [playerProgress, setPlayerProgress] = React.useState(0);
  const [playerStep, setPlayerStep] = React.useState(0);

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        ctx.setFocusedCard("");
        setAlbumStatus("idle");
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [ctx.setFocusedCard, setAlbumStatus]);

  React.useEffect(() => {
    if (albumStatus === "inserted") {
      const timeout = setTimeout(() => setAlbumStatus("loading"), 1000);
      return () => clearTimeout(timeout);
    }
    if (albumStatus === "loading") {
      const timeout = setTimeout(() => setAlbumStatus("done"), 2500);
      return () => clearTimeout(timeout);
    }
  }, [albumStatus, setAlbumStatus]);

  React.useEffect(() => {
    if (playerProgress <= 0 && playerProgress < 45) setPlayerStep(0);
    else if (playerProgress <= 45 && playerProgress < 90) setPlayerStep(1);
    else if (playerProgress <= 90 && playerProgress < 135) setPlayerStep(2);
    else if (playerProgress <= 135 && playerProgress < 180) setPlayerStep(3);
    else if (playerProgress <= 180 && playerProgress < 225) setPlayerStep(4);
    else if (playerProgress <= 225 && playerProgress < 270) setPlayerStep(5);
    else if (playerProgress <= 270 && playerProgress < 315) setPlayerStep(6);
    else if (playerProgress <= 315 && playerProgress < 360) setPlayerStep(7);

    return () => setPlayerStep(0);
  }, [playerProgress, setPlayerStep]);

  function getAngle(x: number, y: number) {
    if (x < 0 && y > 0) {
      return 180 + (Math.atan(y / x) * 180) / Math.PI;
    }
    if (x > 0 && y < 0) {
      return 360 + (Math.atan(y / x) * 180) / Math.PI;
    }
    if (x < 0 && y < 0) {
      return 180 + (Math.atan(y / x) * 180) / Math.PI;
    }
    return (Math.atan(y / x) * 180) / Math.PI;
  }

  return (
    <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0 }}>
      <AnimatePresence initial={false}>
        {ctx.focusedCardTitle !== "" && focusedCard && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layoutId={ctx.focusedCardTitle + "container"}
              className="size-full fixed left-0 top-0 z-10 flex items-center justify-center overflow-hidden rounded-[44px] bg-[#ececec]"
            />
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="absolute bottom-[310px] z-40 h-[400px] w-full px-12"
            >
              <AnimatePresence>
                {(albumStatus === "loading" || albumStatus === "done") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-8 left-0 flex w-full justify-center font-mono text-[12px] font-bold uppercase text-foreground/70"
                  >
                    {`${focusedCard.year} ${focusedCard.title}`}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="size-full flex flex-col space-y-2 rounded-lg border border-background/20 bg-gradient-to-br from-[#ffffff] via-[#dcdcdc] to-[#ffffff] p-2 shadow-[0_12px_24px_-12px_rgba(0,0,0,0.2)] blur-[0.3px]">
                <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded bg-[#2c2c2c] shadow-[inset_0_6px_12px_rgba(0,0,0,1)]">
                  <AnimatePresence mode="popLayout">
                    {albumStatus === "loading" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4"
                      >
                        <div className="relative p-2">
                          <div className="size-full absolute left-0 top-0 z-20 flex items-center justify-center rounded-full bg-gradient-to-br from-[#6a6a6e] from-10% via-[#ecedec] to-[#6a6a6e] shadow-[0_6px_6px_-3px_rgba(0,0,0,0.2)] blur-[0.3px]" />
                          <Image
                            src={focusedCard.image}
                            alt={focusedCard.title}
                            className="size-full relative z-30 aspect-square animate-[spin_3s_linear_infinite] rounded-full object-cover object-right shadow-[0_6px_6px_-3px_rgba(0,0,0,0.2)]"
                          />
                          <div className="size-full absolute left-0 top-0 z-30 flex items-center justify-center backdrop-blur-[0.5px]">
                            <div className="size-6 rounded-full bg-[#241b16] shadow" />
                          </div>
                        </div>
                        <div className="size-full absolute left-0 top-0 z-40 bg-gradient-to-b from-[#dbdbdb]/60 to-[#dbdbdb]/10" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence mode="popLayout">
                    {albumStatus === "done" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="size-full relative"
                      >
                        <Image
                          src={`/albums/${playerStep}.jpg`}
                          width={600}
                          height={400}
                          alt={focusedCard.title}
                          className="size-full object-cover contrast-[0.7] saturate-50"
                        />

                        <div className="size-full absolute left-0 top-0 rounded shadow-[inset_0_6px_12px_rgba(0,0,0,0.2)]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div
                  className={cn(
                    "flex h-1/5 w-full items-center justify-center rounded bg-[#cecece] p-3 text-sm shadow-[inset_0_3px_6px_rgba(0,0,0,0.2)]",
                    {
                      "items-start": albumStatus === "done",
                    },
                  )}
                >
                  <AnimatePresence>
                    {albumStatus === "loading" ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-1.5 font-mono text-[12px] font-bold uppercase text-foreground/70"
                      >
                        Loading
                        <div className="flex items-center gap-1">
                          <div className="size-[3px] rounded-full bg-foreground" />
                          <div className="size-[3px] rounded-full bg-foreground" />
                          <div className="size-[3px] rounded-full bg-foreground" />
                        </div>
                      </motion.div>
                    ) : albumStatus === "done" ? (
                      <div className="flex w-full flex-col">
                        <div className="flex w-full items-start justify-between">
                          <div className="leading-none">
                            <p className="font-semibold">Breathless</p>
                            <p>Forester</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="size-3" />
                            <Ellipsis className="size-3" />
                          </div>
                        </div>

                        <Progress
                          value={33}
                          className="mt-2 h-1 bg-[#b1afb1]"
                        />

                        <div className="flex w-full items-center justify-between text-[8px]">
                          <p>0 : 35</p>
                          <p>-2 : 44</p>
                        </div>
                      </div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="size-full fixed left-0 top-0 z-10 flex items-center justify-center overflow-hidden rounded-[44px]"
            >
              <AnimatePresence>
                {albumStatus === "done" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="size-[200px] absolute bottom-16 z-30 flex flex-col items-center justify-center rounded-full border border-background bg-gradient-to-bl from-[#cdcacb] to-[#b1b2b2] p-4 text-sm font-semibold text-background shadow-inner blur-[0.3px]"
                  >
                    <motion.div
                      drag
                      style={{ x: playerX, y: playerY }}
                      dragControls={controls}
                      dragConstraints={{
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                      }}
                      dragElastic={{
                        bottom: 0.4,
                        top: 0.4,
                        left: 0.4,
                        right: 0.4,
                      }}
                      onDrag={() => {
                        setPlayerProgress(
                          getAngle(playerX.get(), playerY.get()),
                        );
                      }}
                      className="size-full absolute left-0 top-0 z-30 rounded-full"
                    />
                    <p className="absolute left-1/2 top-4 -translate-x-1/2">
                      SHARE
                    </p>
                    <div className="absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-between px-4">
                      <SkipBack
                        className="size-4"
                        fill="hsl(var(--background))"
                      />
                      <SkipForward
                        className="size-4"
                        fill="hsl(var(--background))"
                      />
                    </div>
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center">
                      <Play className="size-4" fill="hsl(var(--background))" />
                      <Pause className="size-4" fill="hsl(var(--background))" />
                    </div>
                    <div className="size-20 z-50 rounded-full border border-background/20 bg-[#e4e1e4] shadow-[0_12px_12px_-6px_rgba(0,0,0,0.06)]" />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                layoutId={ctx.focusedCardTitle + "album-wrapper"}
                transition={{ delay: 0 }}
                initial={{ filter: "blur(4px)" }}
                exit={{ filter: "blur(6px)" }}
                animate={
                  albumStatus !== "idle"
                    ? {
                      bottom: 320,
                      filter: "blur(2px)",
                      transition: { duration: 0.8 },
                    }
                    : {
                      bottom: 80,
                      filter: "blur(0px)",
                    }
                }
                style={{ y: albumY }}
                drag="y"
                dragControls={controls}
                dragConstraints={{
                  top: 0,
                  bottom: 0,
                }}
                dragElastic={{
                  bottom: 0,
                  top: 0.35,
                }}
                dragListener={false}
                onDragEnd={() => {
                  if (albumY.get() <= -80) {
                    setAlbumStatus("inserted");
                  }
                }}
                className="size-[240px] absolute bottom-20 z-30 flex flex-col items-center border border-background/20 bg-gradient-to-br from-[#cacaca] from-10% via-[#eeeeee] to-[#dfdfdf] p-4 shadow-inner blur-[0.3px] drop-shadow-md"
              >
                <motion.div
                  animate={
                    albumStatus !== "idle"
                      ? { rotate: 180, transition: { duration: 1 } }
                      : {}
                  }
                  className="relative p-2"
                >
                  <div className="size-full absolute left-0 top-0 z-20 flex items-center justify-center rounded-full bg-gradient-to-br from-[#6a6a6e] from-10% via-[#ecedec] to-[#6a6a6e] shadow-[0_6px_6px_-3px_rgba(0,0,0,0.2)] blur-[0.3px]" />
                  <Image
                    src={focusedCard.image}
                    alt={focusedCard.title}
                    className="size-full relative z-30 aspect-square rounded-full object-cover object-right shadow-[0_6px_6px_-3px_rgba(0,0,0,0.2)]"
                  />
                  <div className="size-full absolute left-0 top-0 z-30 flex items-center justify-center backdrop-blur-[0.5px]">
                    <div className="size-6 rounded-full bg-[#241b16] shadow" />
                  </div>
                </motion.div>
                <div
                  onPointerDown={(e) => controls.start(e)}
                  style={{ touchAction: "none" }}
                  className="absolute -bottom-3 z-50 flex h-7 w-10 cursor-pointer items-start pt-2"
                >
                  <div className="h-1 w-10 rounded-full bg-[#bbbbbb] shadow-md" />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="size-full text no-scrollbar relative space-y-8 overflow-y-scroll rounded-[44px] bg-[#dbdbdb] px-4 pb-40 pt-24 text-[#1b1b1b]">
        {albums.map((album) => (
          <AlbumCard
            key={album.title}
            time={album.time}
            year={album.year}
            title={album.title}
            image={album.image}
          />
        ))}
      </div>
    </MotionConfig>
  );
}

const StagingContext = React.createContext<{
  activeCard: string;
  setActiveCard: React.Dispatch<React.SetStateAction<string>>;
  focusedCardTitle: string;
  setFocusedCard: React.Dispatch<React.SetStateAction<string>>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  activeCard: "",
  setActiveCard: () => null,
  focusedCardTitle: "",
  setFocusedCard: () => null,
  showMenu: false,
  setShowMenu: () => null,
});

export default function StagingPage() {
  const [activeCard, setActiveCard] = React.useState("");
  const [focusedCardTitle, setFocusedCard] = React.useState("");
  // const [focusedCardTitle, setFocusedCard] = React.useState(
  //   "Salt Lake City, Utah",
  // );
  const [showMenu, setShowMenu] = React.useState(false);

  React.useEffect(() => {
    if (activeCard !== "") {
      const showTimeout = setTimeout(() => setShowMenu(true), 1000);
      return () => clearTimeout(showTimeout);
    }

    const hideTimeout = setTimeout(() => setShowMenu(false), 1000);
    return () => clearTimeout(hideTimeout);
  }, [activeCard, setShowMenu]);

  return (
    <StagingContext.Provider
      value={{
        activeCard,
        setActiveCard,
        focusedCardTitle,
        setFocusedCard,
        showMenu,
        setShowMenu,
      }}
    >
      <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.5 }}>
        <main className="flex h-screen select-none items-center justify-center overflow-hidden">
          <div className="relative flex aspect-square h-screen items-center justify-center bg-gradient-to-br from-[#FAF9F2]/70 to-[#F2F0E7]">
            <div className="absolute left-1/2 top-1/2 z-10 h-[810px] w-[375px] -translate-x-1/2 -translate-y-1/2">
              <div className="pointer-events-none absolute -top-px z-40 h-28 w-full rounded-t-[44px] bg-gradient-to-b from-[#dbdbdb]/80 to-transparent" />
              <div
                className={cn(
                  styles["blur-down"],
                  "pointer-events-none absolute -top-px z-40 h-20 w-full rounded-t-[44px]",
                )}
              />

              <InnerContent />

              <AnimatePresence>
                {showMenu && focusedCardTitle === "" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: "-50%",
                      y: 10,
                      filter: "blur(6px)",
                    }}
                    animate={{
                      opacity: 1,
                      x: "-50%",
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      x: "-50%",
                      y: 10,
                      filter: "blur(6px)",
                    }}
                    className="absolute bottom-12 left-1/2 z-20 flex w-4/5 justify-between rounded-full bg-[#848484]/60 px-8 py-2 text-[12px] text-background shadow-[0_24px_24px_-12px_rgba(0,0,0,0.3)] backdrop-blur-md"
                  >
                    <div className="flex w-full flex-col items-center gap-1">
                      <Heart className="size-5" />
                      <p>From Friends</p>
                    </div>
                    <div className="flex w-full flex-col items-center gap-1">
                      <Images className="size-5" />
                      <p>My Albums</p>
                    </div>
                    <div className="flex w-full flex-col items-center gap-1">
                      <Search className="size-5" />
                      <p>Search</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={cn(
                  styles["blur-up"],
                  "pointer-events-none absolute -bottom-px z-10 h-20 w-full rounded-b-[44px]",
                )}
              />
              <div className="pointer-events-none absolute -bottom-px z-10 h-28 w-full rounded-b-[44px] bg-gradient-to-t from-[#dbdbdb]/80 from-10% to-transparent" />
            </div>

            <div className="fixed bottom-[72px] left-1/2 z-50 h-1.5 w-[360px] -translate-x-1/2 px-28">
              <div className="size-full rounded-3xl bg-black" />
            </div>

            <Image
              src={svgPhone}
              alt="iphone mock"
              className="pointer-events-none relative z-50"
            />
          </div>
        </main>
      </MotionConfig>
    </StagingContext.Provider>
  );
}
