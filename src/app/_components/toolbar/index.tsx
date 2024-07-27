"use client";

import * as React from "react";
import {
  ChevronDown,
  MousePointer2,
  Frame,
  Square,
  PenTool,
  Type,
  MessageCircle,
  Blocks,
  Ruler,
  SquarePen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DevSwitch } from "./dev-switch";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";

export function Toolbar() {
  const [toolbarRef, toolbarBounds] = useMeasure();
  const [devMode, setDevMode] = React.useState(false);
  const [labelActive, setLabelActive] = React.useState(false);
  const [enableLabel, setEnableLabel] = React.useState(false);
  const [activeOption, setActiveOption] = React.useState("pointer");

  React.useEffect(() => {
    if (enableLabel) {
      setTimeout(() => {
        setLabelActive(true);
      }, 200);

      const closeTimeout = setTimeout(() => {
        setLabelActive(false);
      }, 1300);

      return () => clearTimeout(closeTimeout);
    }
  }, [setLabelActive, devMode, enableLabel]);

  function handleSwitchClick() {
    if (!enableLabel) setEnableLabel(true);
    setDevMode((prevState) => !prevState);
  }

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
      <div className="relative flex divide-x rounded-xl border shadow-md">
        {labelActive && (
          <div className="absolute -top-20 left-1/2 flex h-14 -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-xl border px-5 font-semibold shadow-md">
            <p>{`Switched to ${devMode ? "dev mode" : "design mode"}`}</p>
          </div>
        )}

        <motion.div
          transition={{ delay: 0.05 }}
          animate={{ width: toolbarBounds.width }}
          className="relative flex gap-2 divide-x overflow-hidden"
        >
          <div ref={toolbarRef}>
            <AnimatePresence initial={false} mode="popLayout">
              {devMode ? (
                <motion.div
                  key="dev-mode"
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  exit={{ y: 50 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 p-2.5"
                >
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant={
                        activeOption === "pointer" ? "secondary" : "ghost"
                      }
                      onClick={() => setActiveOption("pointer")}
                      className="rounded-lg p-2.5"
                    >
                      <MousePointer2 className="size-6" />
                    </Button>
                    <ChevronDown className="size-3" />
                  </div>
                  <Button
                    size="icon"
                    variant={activeOption === "ruler" ? "secondary" : "ghost"}
                    onClick={() => setActiveOption("ruler")}
                    className="rounded-lg p-2.5"
                  >
                    <Ruler className="size-6" />
                  </Button>
                  <Button
                    size="icon"
                    variant={
                      activeOption === "square-pen" ? "secondary" : "ghost"
                    }
                    onClick={() => setActiveOption("square-pen")}
                    className="rounded-lg p-2.5"
                  >
                    <SquarePen className="size-6" />
                  </Button>
                  <Button
                    size="icon"
                    variant={activeOption === "message" ? "secondary" : "ghost"}
                    onClick={() => setActiveOption("message")}
                    className="rounded-lg p-2.5"
                  >
                    <MessageCircle className="size-6" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="design-mode"
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  exit={{ y: -50 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 p-2.5"
                >
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant={activeOption === "pointer" ? "default" : "ghost"}
                      onClick={() => setActiveOption("pointer")}
                      className="rounded-lg p-2.5"
                    >
                      <MousePointer2 className="size-6" />
                    </Button>
                    <ChevronDown className="size-3" />
                  </div>
                  <div className="r flex items-center gap-2">
                    <Button
                      size="icon"
                      variant={activeOption === "frame" ? "default" : "ghost"}
                      onClick={() => setActiveOption("frame")}
                      className="rounded-lg p-2.5"
                    >
                      <Frame className="size-6" />
                    </Button>
                    <ChevronDown className="size-3" />
                  </div>
                  <div className="r flex items-center gap-2">
                    <Button
                      size="icon"
                      variant={activeOption === "square" ? "default" : "ghost"}
                      onClick={() => setActiveOption("square")}
                      className="rounded-lg p-2.5"
                    >
                      <Square className="size-6" />
                    </Button>
                    <ChevronDown className="size-3" />
                  </div>
                  <div className="r flex items-center gap-2">
                    <Button
                      size="icon"
                      variant={
                        activeOption === "pen-tool" ? "default" : "ghost"
                      }
                      onClick={() => setActiveOption("pen-tool")}
                      className="rounded-lg p-2.5"
                    >
                      <PenTool className="size-6" />
                    </Button>
                    <ChevronDown className="size-3" />
                  </div>
                  <Button
                    size="icon"
                    variant={activeOption === "type" ? "default" : "ghost"}
                    onClick={() => setActiveOption("type")}
                    className="rounded-lg p-2.5"
                  >
                    <Type className="size-6" />
                  </Button>
                  <Button
                    size="icon"
                    variant={activeOption === "message" ? "default" : "ghost"}
                    onClick={() => setActiveOption("message")}
                    className="rounded-lg p-2.5"
                  >
                    <MessageCircle className="size-6" />
                  </Button>
                  <Button
                    size="icon"
                    variant={activeOption === "more" ? "default" : "ghost"}
                    onClick={() => setActiveOption("more")}
                    className="rounded-lg p-2.5"
                  >
                    <Blocks className="size-6" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          transition={{ delay: 0.1 }}
          layout
          className="flex items-center justify-center p-2.5"
        >
          <DevSwitch checked={devMode} onCheckedChange={handleSwitchClick} />
        </motion.div>
      </div>
    </MotionConfig>
  );
}
