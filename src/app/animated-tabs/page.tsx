"use client";

import { GrainyBackground } from "@/components/grainy-background";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Variants,
  type Transition,
} from "framer-motion";
import React, { useRef, useState } from "react";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

const tabs = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function InnerContent() {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
  const previousTabRef = useRef(activeTab);

  const handleTabChange = (tabId: string) => {
    previousTabRef.current = activeTab;
    setActiveTab(tabId);
  };

  const getTabIndex = (id: string) => tabs.findIndex((tab) => tab.id === id);
  const previousTabIndex = getTabIndex(previousTabRef.current);
  const currentTabIndex = getTabIndex(activeTab);
  const indexDifference = Math.abs(currentTabIndex - previousTabIndex);

  const activeTabVariants: Variants = {
    transitioning: (indexDifference: number) => ({
      filter: `blur(${indexDifference * 2}px)`,
    }),
    idle: { filter: "blur(0px)" },
  };

  return (
    <div className="isolate flex gap-1">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className="relative px-3 py-1.5 font-mono text-sm font-medium text-[#1f1f1f] outline-2 outline-[#1f1f1f]/50 transition-colors focus-visible:outline"
        >
          <AnimatePresence mode="popLayout" custom={indexDifference}>
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-pill"
                variants={activeTabVariants}
                initial="transitioning"
                animate="idle"
                exit="transitioning"
                custom={indexDifference}
                className="absolute inset-0 bg-[#dbdbdb]"
              />
            )}
          </AnimatePresence>
          <span className="relative z-10">{tab.label}</span>
        </motion.button>
      ))}
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
        <GrainyBackground
          className="relative flex h-screen items-center justify-center"
          grainOpacity={0.12}
          grainContrast={0.7}
        >
          <InnerContent />
        </GrainyBackground>
      </MotionConfig>
    </Context.Provider>
  );
}
