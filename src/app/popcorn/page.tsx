"use client";

import Image from "next/image";
import svgPhone from "./iphone-black.svg";
import imageMesh1 from "./mesh-1.png";
import imageMesh2 from "./mesh-2.png";
import imageMesh3 from "./mesh-3.png";
import imageRegionalBackground from "./mesh-3.png";
import React from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const PopcornContext = React.createContext<{
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  pressing: boolean;
  setPressing: React.Dispatch<React.SetStateAction<boolean>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}>({
  active: "",
  setActive: () => null,
  pressing: false,
  setPressing: () => null,
  location: "",
  setLocation: () => null,
});

function Toolbar() {
  return (
    <header className="w-full p-5">
      <div className="flex h-[50px] items-center justify-between rounded-full border border-[#e7e7e7] bg-white p-2 shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.0.1)]">
        <p className="pl-3 text-3xl font-semibold tracking-tighter text-[#363636]">
          Popcorn
        </p>
        <button className="h-full rounded-full bg-[#363636] px-4 text-sm text-white">
          Get the app
        </button>
      </div>
    </header>
  );
}

function TabsList() {
  const ctx = React.useContext(PopcornContext);

  return (
    <Tabs.List asChild>
      <motion.div
        initial={{ scale: 0.9, filter: "blur(4px)", opacity: 0.8 }}
        animate={
          ctx.location
            ? { scale: 0.9, filter: "blur(4px)", opacity: 0.8 }
            : { scale: 1, filter: "blur(0px)", opacity: 1 }
        }
        transition={{ duration: 0.2 }}
        className="flex w-full justify-center"
      >
        <div className="w-fit items-center whitespace-nowrap rounded-full border-2 border-[#e2e2e2] bg-[#e2e0e1] p-px tracking-tight">
          <Tabs.Trigger value="local" disabled={!!ctx.location} asChild>
            <motion.button
              aria-label="Local"
              onMouseDown={(e) => e.preventDefault()}
              onTapStart={() => {
                if (!ctx.location && ctx.active !== "local") {
                  ctx.setPressing(true);
                }
              }}
              onTapCancel={() => ctx.setPressing(false)}
              onTap={() => {
                if (!ctx.location) {
                  ctx.setPressing(false);
                  ctx.setActive("local");
                }
              }}
              whileTap={{ scale: 1.1 }}
              className="rounded-full px-2.5 py-[5px] text-[13px] font-semibold text-[#929091] data-[state=active]:bg-white data-[state=active]:text-[#3e3e3e] data-[state=active]:shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.16)]"
            >
              Local
            </motion.button>
          </Tabs.Trigger>
          <Tabs.Trigger value="regional" disabled={!!ctx.location} asChild>
            <motion.button
              aria-label="Regional"
              onMouseDown={(e) => e.preventDefault()}
              onTapStart={() => {
                if (!ctx.location && ctx.active !== "regional") {
                  ctx.setPressing(true);
                }
              }}
              onTapCancel={() => ctx.setPressing(false)}
              onTap={() => {
                if (!ctx.location) {
                  ctx.setPressing(false);
                  ctx.setActive("regional");
                }
              }}
              whileTap={{ scale: 1.1 }}
              className="rounded-full px-2.5 py-[5px] text-[13px] font-semibold text-[#929091] data-[state=active]:bg-white data-[state=active]:text-[#3e3e3e] data-[state=active]:shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.16)]"
            >
              Regional
            </motion.button>
          </Tabs.Trigger>
          <Tabs.Trigger value="global" disabled={!!ctx.location} asChild>
            <motion.button
              aria-label="Global"
              onMouseDown={(e) => e.preventDefault()}
              onTapStart={() => {
                if (!ctx.location && ctx.active !== "global") {
                  ctx.setPressing(true);
                }
              }}
              onTapCancel={() => ctx.setPressing(false)}
              onTap={() => {
                if (!ctx.location) {
                  ctx.setPressing(false);
                  ctx.setActive("global");
                }
              }}
              whileTap={{ scale: 1.1 }}
              className="rounded-full px-2.5 py-[5px] text-[13px] font-semibold text-[#929091] data-[state=active]:bg-white data-[state=active]:text-[#3e3e3e] data-[state=active]:shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.16)]"
            >
              Global
            </motion.button>
          </Tabs.Trigger>
        </div>
      </motion.div>
    </Tabs.List>
  );
}

function RegionalTabContent() {
  const ctx = React.useContext(PopcornContext);

  React.useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") ctx.setLocation("");
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [ctx.setLocation]);

  return (
    <Tabs.Content value="regional" className="pt-16">
      <motion.div
        initial={{ scale: 0.95, filter: "blur(4px)", opacity: 0.8 }}
        animate={
          ctx.pressing
            ? { scale: 0.95, filter: "blur(4px)", opacity: 0.8 }
            : { scale: 1, filter: "blur(0px)", opacity: 1 }
        }
        className="relative h-[517px] space-y-9"
      >
        <motion.h1
          animate={
            ctx.location
              ? { scale: 0.9, filter: "blur(4px)", opacity: 0.8 }
              : { scale: 1, filter: "blur(0px)", opacity: 1 }
          }
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-1 text-center font-serif text-4xl font-medium"
        >
          <span>Fixed price,</span>
          <span>No hidden costs,</span>
          <span>Regional roaming,</span>
          <span>Efficient support</span>
        </motion.h1>

        <div className="absolute bottom-0 w-full space-y-9">
          <div
            className={cn(
              "w-full divide-y divide-[#e7e7e7] rounded-[25px] border border-[#e7e7e7] bg-[#f7f7f7] shadow-[0_6px_6px_-3px_rgba(0,0,0,0.0.16)] transition-shadow duration-200",
              { "shadow-[0_6px_36px_-12px_rgba(0,0,0,0.0.6)]": ctx.location },
            )}
          >
            <motion.div
              onClick={() => ctx.setLocation("united-states")}
              animate={
                ctx.location === "united-states"
                  ? { height: 200, borderTopRightRadius: 25 }
                  : { height: 81 }
              }
              transition={{ duration: 0.3, delay: 0.05 }}
              className="relative flex cursor-pointer items-center justify-between overflow-hidden px-5 py-4"
            >
              <AnimatePresence>
                {ctx.location === "united-states" ? (
                  <>
                    <motion.div
                      layoutId="united-states-title"
                      className="absolute left-5 top-5 z-50"
                    >
                      <p className="font-serif leading-5 tracking-tight">
                        United States
                      </p>
                      <p className="text-[12px] tracking-tight text-[#9b9a96]">
                        700 MB remaining
                      </p>
                    </motion.div>
                    <motion.div
                      layoutId="united-states-gradient"
                      className="size-[350px] absolute -bottom-[130px] -right-[70px] rounded-full"
                    >
                      <Image
                        src={imageMesh1}
                        alt="Mesh 1"
                        className="size-full absolute rounded-full p-px"
                      />
                      <div className="size-full absolute bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,#f7f7f7_70%)] backdrop-blur-lg [mask:radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_60%)]" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                      transition={{ delay: 0.1 }}
                      className="absolute bottom-5 left-5 z-50 text-foreground/70"
                    >
                      <p>3 GB Bandwidth</p>
                      <p>23 Locations</p>
                      <p>0 Downtime</p>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      layoutId="united-states-title"
                      className="absolute left-5 top-5 z-50"
                    >
                      <p className="font-serif leading-5 tracking-tight">
                        United States
                      </p>
                      <p className="text-[12px] tracking-tight text-[#9b9a96]">
                        700 MB remaining
                      </p>
                    </motion.div>
                    <motion.div
                      layoutId="united-states-gradient"
                      className="size-12 absolute right-5 top-4 rounded-full"
                    >
                      <Image
                        src={imageMesh1}
                        alt="Mesh 1"
                        className="size-full absolute rounded-full p-px"
                      />
                      <div className="size-full absolute bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,#f7f7f7_70%)] backdrop-blur-lg [mask:radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_70%)]" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              onClick={() => ctx.setLocation("germany")}
              animate={
                ctx.location === "germany" ? { height: 200 } : { height: 81 }
              }
              transition={{ duration: 0.3, delay: 0.05 }}
              className="relative flex cursor-pointer items-center justify-between overflow-hidden px-5 py-4"
            >
              <AnimatePresence>
                {ctx.location === "germany" ? (
                  <>
                    <motion.div
                      layoutId="germany-title"
                      className="absolute left-5 top-5 z-50"
                    >
                      <p className="font-serif leading-5 tracking-tight">
                        Germany
                      </p>
                      <p className="text-[12px] tracking-tight text-[#9b9a96]">
                        1.2GB remaining
                      </p>
                    </motion.div>
                    <motion.div
                      layoutId="germany-gradient"
                      className="size-[400px] absolute -bottom-[170px] -right-[130px] rounded-full"
                    >
                      <Image
                        src={imageMesh2}
                        alt="Mesh 2"
                        className="size-full absolute rotate-90 rounded-full p-px"
                      />
                      <div className="size-full absolute bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,#f7f7f7_70%)] backdrop-blur-lg [mask:radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_70%)]" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                      transition={{ delay: 0.1 }}
                      className="absolute bottom-5 left-5 z-50 text-foreground/70"
                    >
                      <p>2.8 GB Bandwidth</p>
                      <p>15 Locations</p>
                      <p>0 Downtime</p>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      layoutId="germany-title"
                      className="absolute left-5 top-5 z-50"
                    >
                      <p className="font-serif leading-5 tracking-tight">
                        Germany
                      </p>
                      <p className="text-[12px] tracking-tight text-[#9b9a96]">
                        1.2GB remaining
                      </p>
                    </motion.div>
                    <motion.div
                      layoutId="germany-gradient"
                      className="size-12 absolute right-5 top-4 rounded-full"
                    >
                      <Image
                        src={imageMesh2}
                        alt="Mesh 2"
                        className="size-full absolute rounded-full p-px"
                      />
                      <div className="size-full absolute bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,#f7f7f7_70%)] backdrop-blur-lg [mask:radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_70%)]" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              onClick={() => ctx.setLocation("japan")}
              animate={
                ctx.location === "japan" ? { height: 200 } : { height: 81 }
              }
              transition={{ duration: 0.3, delay: 0.05 }}
              className="relative flex cursor-pointer items-center justify-between overflow-hidden rounded-br-[25px] px-5 py-4"
            >
              <AnimatePresence>
                {ctx.location === "japan" ? (
                  <>
                    <motion.div
                      layoutId="japan-title"
                      className="absolute left-5 top-5 z-50"
                    >
                      <p className="font-serif leading-5 tracking-tight">
                        Japan
                      </p>
                      <p className="text-[12px] tracking-tight text-[#9b9a96]">
                        1.45GB remaining
                      </p>
                    </motion.div>
                    <motion.div
                      layoutId="japan-gradient"
                      className="size-[350px] absolute -bottom-[130px] -right-[70px] rounded-full"
                    >
                      <Image
                        src={imageMesh3}
                        alt="Mesh 3"
                        className="size-full absolute rounded-full p-px"
                      />
                      <div className="size-full absolute bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,#f7f7f7_70%)] backdrop-blur-lg [mask:radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_70%)]" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                      transition={{ delay: 0.1 }}
                      className="absolute bottom-5 left-5 z-50 text-foreground/70"
                    >
                      <p>1 GB Bandwidth</p>
                      <p>8 Locations</p>
                      <p>0 Downtime</p>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      layoutId="japan-title"
                      className="absolute left-5 top-5 z-50"
                    >
                      <p className="font-serif leading-5 tracking-tight">
                        Japan
                      </p>
                      <p className="text-[12px] tracking-tight text-[#9b9a96]">
                        1.45GB remaining
                      </p>
                    </motion.div>
                    <motion.div
                      layoutId="japan-gradient"
                      className="size-12 absolute right-5 top-4 rounded-full"
                    >
                      <Image
                        src={imageMesh3}
                        alt="Mesh 3"
                        className="size-full absolute rounded-full p-px"
                      />
                      <div className="size-full absolute bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,#f7f7f7_70%)] backdrop-blur-lg [mask:radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_70%)]" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="flex w-full justify-center">
            <button
              aria-label="See More"
              type="button"
              onClick={() => {
                if (ctx.location) ctx.setLocation("");
              }}
              className="rounded-full bg-white px-2.5 py-[5px] text-[13px] font-semibold text-[#3e3e3e] shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.16)]"
            >
              {ctx.location ? (
                <span>
                  <X className="size-5" />
                </span>
              ) : (
                <span>See More</span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </Tabs.Content>
  );
}

function InnerContent() {
  const [active, setActive] = React.useState("regional");
  const [location, setLocation] = React.useState("");
  const [pressing, setPressing] = React.useState(false);

  return (
    <PopcornContext.Provider
      value={{
        active,
        setActive,
        pressing,
        setPressing,
        location,
        setLocation,
      }}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[51px]">
        <div className="size-full absolute top-0 z-30 bg-gradient-to-b from-[#efefef] from-45% to-transparent to-60%" />

        <div className="z-40 w-full space-y-16">
          <Toolbar />

          <Tabs.Root value={active} onValueChange={setActive} className="px-5">
            <TabsList />

            <Tabs.Content value="local" className="pt-16">
              <motion.div
                initial={{ scale: 0.95, filter: "blur(4px)", opacity: 0.8 }}
                animate={
                  pressing
                    ? { scale: 0.95, filter: "blur(4px)", opacity: 0.8 }
                    : { scale: 1, filter: "blur(0px)", opacity: 1 }
                }
                className="space-y-9"
              >
                <h1 className="flex flex-col gap-1 text-center font-serif text-4xl font-medium">
                  <span>Fixed price,</span>
                  <span>No hidden costs,</span>
                  <span>Local roaming,</span>
                  <span>Efficient support</span>
                </h1>

                <div className="w-full divide-y divide-[#e7e7e7] rounded-[25px] border border-[#e7e7e7] bg-[#f7f7f7] shadow-[0_6px_6px_-3px_rgba(0,0,0,0.0.16)]">
                  <div className="flex cursor-pointer items-center justify-between px-5 py-4">
                    <div>
                      <p className="font-serif leading-5 tracking-tight">
                        N. Virginia
                      </p>
                      <p className="text-[12px] tracking-tight text-[#9b9a96]">
                        324 MB remaining
                      </p>
                    </div>
                    <div className="size-12 relative rounded-full">
                      <Image
                        src={imageMesh1}
                        alt="Mesh 1"
                        className="size-full absolute rotate-90 rounded-full p-px"
                      />
                      <div className="size-full absolute bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,#f7f7f7_70%)] backdrop-blur-lg [mask:radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_70%)]" />
                    </div>
                  </div>
                  <div className="flex cursor-pointer items-center justify-between px-5 py-4">
                    <div>
                      <p className="font-serif leading-5 tracking-tight">
                        Oregon
                      </p>
                      <p className="text-[12px] tracking-tight text-[#9b9a96]">
                        1.1 GB remaining
                      </p>
                    </div>

                    <div className="size-12 relative rounded-full">
                      <Image
                        src={imageMesh3}
                        alt="Mesh 3"
                        className="size-full absolute rotate-180 rounded-full p-px"
                      />
                      <div className="size-full absolute bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,#f7f7f7_70%)] backdrop-blur-lg [mask:radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_70%)]" />
                    </div>
                  </div>
                  <div className="flex cursor-pointer items-center justify-between px-5 py-4">
                    <div>
                      <p className="font-serif leading-5 tracking-tight">
                        Ohio
                      </p>
                      <p className="text-[12px] tracking-tight text-[#9b9a96]">
                        78 MB remaining
                      </p>
                    </div>
                    <div className="size-12 relative rounded-full">
                      <Image
                        src={imageMesh2}
                        alt="Mesh 2"
                        className="size-full absolute rounded-full p-px"
                      />
                      <div className="size-full absolute bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,#f7f7f7_70%)] backdrop-blur-lg [mask:radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_70%)]" />
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-center">
                  <button
                    aria-label="See More"
                    type="button"
                    className="rounded-full bg-white px-2.5 py-[5px] text-[13px] font-semibold text-[#3e3e3e] shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.16)]"
                  >
                    See More
                  </button>
                </div>
              </motion.div>
            </Tabs.Content>

            <RegionalTabContent />

            <Tabs.Content value="global" className="pt-16">
              <motion.div
                initial={{ scale: 0.95, filter: "blur(4px)", opacity: 0.8 }}
                animate={
                  pressing
                    ? { scale: 0.95, filter: "blur(4px)", opacity: 0.8 }
                    : { scale: 1, filter: "blur(0px)", opacity: 1 }
                }
                className="space-y-9"
              >
                <h1 className="flex flex-col gap-1 text-center font-serif text-4xl font-medium">
                  <span>Fixed price,</span>
                  <span>No hidden costs,</span>
                  <span>Global roaming,</span>
                  <span>Efficient support</span>
                </h1>

                <div className="w-full divide-y divide-[#e7e7e7] rounded-[25px] border border-[#e7e7e7] bg-[#f7f7f7] shadow-[0_6px_6px_-3px_rgba(0,0,0,0.0.16)]">
                  <div className="flex cursor-pointer items-center justify-between px-5 py-4">
                    <div>
                      <p className="font-serif leading-5 tracking-tight">
                        North America
                      </p>
                      <p className="text-[12px] tracking-tight text-[#9b9a96]">
                        7.43 GB remaining
                      </p>
                    </div>
                    <div className="size-12 relative rounded-full">
                      <Image
                        src={imageMesh3}
                        alt="Mesh 3"
                        className="size-full absolute rounded-full p-px"
                      />
                      <div className="size-full absolute bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,#f7f7f7_70%)] backdrop-blur-lg [mask:radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_70%)]" />
                    </div>
                  </div>
                  <div className="flex cursor-pointer items-center justify-between px-5 py-4">
                    <div>
                      <p className="font-serif leading-5 tracking-tight">
                        Europe
                      </p>
                      <p className="text-[12px] tracking-tight text-[#9b9a96]">
                        6 GB remaining
                      </p>
                    </div>
                    <div className="size-12 relative rounded-full">
                      <Image
                        src={imageMesh2}
                        alt="Mesh 2"
                        className="size-full absolute rotate-90 rounded-full p-px"
                      />
                      <div className="size-full absolute bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,#f7f7f7_70%)] backdrop-blur-lg [mask:radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_70%)]" />
                    </div>
                  </div>
                  <div className="flex cursor-pointer items-center justify-between px-5 py-4">
                    <div>
                      <p className="font-serif leading-5 tracking-tight">
                        Asia
                      </p>
                      <p className="text-[12px] tracking-tight text-[#9b9a96]">
                        10.24 GB remaining
                      </p>
                    </div>
                    <div className="size-12 relative rounded-full">
                      <Image
                        src={imageMesh1}
                        alt="Mesh 1"
                        className="size-full absolute rotate-180 rounded-full p-px"
                      />
                      <div className="size-full absolute bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,#f7f7f7_70%)] backdrop-blur-lg [mask:radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_70%)]" />
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-center">
                  <button
                    aria-label="See More"
                    type="button"
                    className="rounded-full bg-white px-2.5 py-[5px] text-[13px] font-semibold text-[#3e3e3e] shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.16)]"
                  >
                    See More
                  </button>
                </div>
              </motion.div>
            </Tabs.Content>
          </Tabs.Root>
        </div>

        {active === "local" && (
          <motion.div
            initial={{ height: "50vh" }}
            animate={pressing ? { height: "50vh" } : { height: "57vh" }}
            className="absolute bottom-0 z-20 h-[57vh] w-auto"
          >
            <Image
              src={imageMesh1}
              alt="Local background"
              className="size-full"
            />
          </motion.div>
        )}
        {active === "regional" && (
          <motion.div
            initial={{ height: "50vh" }}
            animate={pressing ? { height: "50vh" } : { height: "57vh" }}
            className="absolute bottom-0 z-20 h-[57vh] w-auto"
          >
            <Image
              src={imageRegionalBackground}
              alt="Regional background"
              className="size-full"
            />
          </motion.div>
        )}
        {active === "global" && (
          <motion.div
            initial={{ height: "50vh" }}
            animate={pressing ? { height: "50vh" } : { height: "57vh" }}
            className="absolute bottom-0 z-20 h-[57vh] w-auto"
          >
            <Image
              src={imageMesh2}
              alt="Regional background"
              className="size-full"
            />
          </motion.div>
        )}
      </div>
    </PopcornContext.Provider>
  );
}

export default function StagingPage() {
  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.5 }}>
      <main className="flex h-screen select-none items-center justify-center overflow-hidden">
        <div className="relative flex aspect-square h-screen items-center justify-center bg-gradient-to-br from-[#eae8eb]/70 to-[#dde1eb]">
          <div className="absolute left-1/2 top-1/2 z-20 h-[813px] w-[376px] -translate-x-1/2 -translate-y-1/2">
            <InnerContent />
          </div>

          <div className="fixed left-1/2 top-[70px] z-10 h-9 w-[345px] -translate-x-1/2 px-28">
            <div className="size-full rounded-3xl bg-[#efefef]" />
          </div>

          <div className="fixed bottom-[72px] left-1/2 z-50 h-1.5 w-[360px] -translate-x-1/2 px-28">
            <div className="size-full rounded-3xl bg-black" />
          </div>

          <Image
            src={svgPhone}
            alt="iphone mock"
            className="pointer-events-none relative z-0"
          />
        </div>
      </main>
    </MotionConfig>
  );
}
