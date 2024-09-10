"use client";

import { cn } from "@/lib/utils";
import styles from "./styles.module.css";
import { Italic, Underline } from "@/components/icons";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";

export default function NeuToolbarPage() {
  const [value, setValue] = React.useState("Heading 1");
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState("");
  const [ref, bounds] = useMeasure();

  const tabs = [
    {
      id: "bold",
      label: <span className="text-2xl font-extralight">B</span>,
    },
    {
      id: "italic",
      label: <Italic />,
    },
    {
      id: "underline",
      label: <Underline />,
    },
    {
      id: "color",
      label: (
        <div className="size-6 rounded-full border-[0.7px] border-[#4c4c4c] bg-gradient-to-br from-[#d8d8d8] to-[#767676] shadow-[0_6px_6px_-3px_rgba(0,0,0,0.15)]" />
      ),
    },
    {
      id: "align-left",
      label: <AlignLeft />,
    },
    {
      id: "align-center",
      label: <AlignCenter />,
    },
    {
      id: "align-right",
      label: <AlignRight />,
    },
  ];

  const selectItem = {
    hidden: {
      opacity: 0,
      filter: "blur(4px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      filter: "blur(4px)",
    },
  };

  return (
    <main
      onClick={() => setHovered("")}
      className="flex h-screen items-center justify-center space-x-6 bg-[#fafafa] text-[hsl(0,0%,69%)]"
    >
      <div className="flex flex-col items-center gap-8">
        <div
          className={cn(
            styles.toolbar,
            "relative flex w-full items-center gap-2 rounded-3xl border-l-2 border-t-2 border-[#4c4c4c]/60 p-2",
          )}
        >
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
              <motion.button
                data-open={open}
                onClick={() => setOpen((prevState) => !prevState)}
                className={cn(
                  styles["drop-down-trigger"],
                  "z-10 flex h-12 w-36 items-center justify-center rounded-2xl px-8 font-semibold transition-all",
                )}
              >
                {value}
              </motion.button>
            </DropdownMenu.Trigger>

            <MotionConfig transition={{ duration: 0.4 }}>
              <DropdownMenu.Portal forceMount>
                <DropdownMenu.Content sideOffset={-48} align="start" asChild>
                  <AnimatePresence initial={false}>
                    <motion.div
                      animate={{ height: bounds.height }}
                      className={cn(
                        styles["drop-down"],
                        "z-0 w-36 rounded-2xl",
                      )}
                    >
                      <motion.div
                        ref={ref}
                        className="flex flex-col gap-2 px-2 pb-2 pt-2"
                      >
                        <AnimatePresence initial={false}>
                          {open && (
                            <>
                              <div className="h-10 w-full" />
                              <DropdownMenu.Item asChild>
                                <motion.div
                                  initial={{
                                    opacity: 0,
                                    filter: "blur(4px)",
                                  }}
                                  animate={{
                                    opacity: 1,
                                    filter: "blur(0px)",
                                  }}
                                  exit={{
                                    opacity: 0,
                                    filter: "blur(4px)",
                                    transition: { delay: 0.2, duration: 0.2 },
                                  }}
                                  onClick={() => setValue("Heading 1")}
                                  className={cn(
                                    styles["drop-down-button"],
                                    "flex h-10 w-full cursor-pointer items-center justify-center rounded-lg font-semibold text-[#fafafa] transition-all",
                                  )}
                                >
                                  Heading 1
                                </motion.div>
                              </DropdownMenu.Item>
                              <DropdownMenu.Item asChild>
                                <motion.div
                                  initial={{
                                    opacity: 0,
                                    filter: "blur(4px)",
                                  }}
                                  animate={{
                                    opacity: 1,
                                    filter: "blur(0px)",
                                  }}
                                  exit={{
                                    opacity: 0,
                                    filter: "blur(4px)",
                                    transition: { delay: 0.1, duration: 0.2 },
                                  }}
                                  transition={{ delay: 0.1 }}
                                  onClick={() => setValue("Heading 2")}
                                  className={cn(
                                    styles["drop-down-button"],
                                    "flex h-10 w-full cursor-pointer items-center justify-center rounded-lg font-semibold text-[#fafafa] transition-all",
                                  )}
                                >
                                  Heading 2
                                </motion.div>
                              </DropdownMenu.Item>
                              <DropdownMenu.Item asChild>
                                <motion.div
                                  transition={{ delay: 0.2 }}
                                  initial={{
                                    opacity: 0,
                                    filter: "blur(4px)",
                                  }}
                                  animate={{
                                    opacity: 1,
                                    filter: "blur(0px)",
                                  }}
                                  exit={{
                                    opacity: 0,
                                    filter: "blur(4px)",
                                    transition: { delay: 0, duration: 0.2 },
                                  }}
                                  onClick={() => setValue("Heading 3")}
                                  className={cn(
                                    styles["drop-down-button"],
                                    "flex h-10 w-full cursor-pointer items-center justify-center rounded-lg font-semibold text-[#fafafa] transition-all",
                                  )}
                                >
                                  Heading 3
                                </motion.div>
                              </DropdownMenu.Item>
                            </>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </MotionConfig>
          </DropdownMenu.Root>

          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onHoverStart={() => setHovered(tab.id)}
              className={cn(
                styles.button,
                "size-12 group relative flex items-center justify-center rounded-2xl transition-all duration-500",
              )}
            >
              <AnimatePresence>
                {hovered === tab.id && (
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    layoutId="nav-item"
                    className="size-full absolute inset-0 z-0 rounded-2xl bg-[rgba(60,60,60,0.8)]"
                    transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                  />
                )}
              </AnimatePresence>
              <div className="relative z-10">{tab.label}</div>
            </motion.button>
          ))}
        </div>

        <div className="relative max-w-xl px-12 text-xl leading-relaxed text-[#393b3a]">
          <p>
            Been playing with neumorphism design after seeing some of the
            talented work of @tranmautritam. You should go check out his work.
            This tool bar was inspired by one of his designs. I liked it so much
            that I decided to add some framer motion flare to it. The drop down
            menu is a Radix UI component and everything is styled with a mix of
            CSS and Tailwind.
          </p>
          <div className="size-full absolute left-0 top-0 bg-gradient-to-t from-[#fafafa]/90 to-transparent" />
        </div>
      </div>
    </main>
  );
}
