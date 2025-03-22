"use client";

import { GrainyBackground } from "@/components/grainy-background";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { motion, MotionConfig, type Transition } from "framer-motion";
import React, { useState } from "react";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

function InnerContent() {
  const ctx = React.useContext(Context);
  const [checked, setChecked] = useState(false);

  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={setChecked}
      className="flex w-48 rounded-[30px] bg-[#1f1f1f]/80 p-2 shadow-mixed transition-colors data-[state=checked]:justify-end data-[state=checked]:bg-[#53828c]"
    >
      <SwitchPrimitive.Thumb asChild>
        <motion.div
          key={checked ? "checked" : "unchecked"}
          layoutId="switch-thumb"
          whileTap={{
            width: 110,
            height: 72,
            margin: 4,
            borderRadius: 20,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: checked ? 1 : 0.8 }}
          style={{ borderRadius: 22 }}
          className="size-20 bg-[#fafafa] shadow-mixed"
        />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
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
          grainOpacity={0.15}
          grainContrast={0.7}
        >
          <InnerContent />
        </GrainyBackground>
      </MotionConfig>
    </Context.Provider>
  );
}
