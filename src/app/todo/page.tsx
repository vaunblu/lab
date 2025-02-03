"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  motion,
  MotionConfig,
  stagger,
  useAnimate,
  type Transition,
} from "framer-motion";
import React from "react";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

function InnerContent() {
  const ctx = React.useContext(Context);

  const [items, setItems] = React.useState([
    { id: "1", text: "60 mins practice", checked: true },
    { id: "2", text: "Coffee", checked: true },
    { id: "3", text: "Work", checked: false },
    { id: "4", text: "Walk pupper", checked: true },
    { id: "5", text: "Climb", checked: true },
    { id: "6", text: "Wind down", checked: true },
  ]);

  const [ref, animate] = useAnimate();

  function handleChange(id: string) {
    const newItems = items.map((item) => ({
      ...item,
      checked: item.id === id ? !item.checked : item.checked,
    }));

    setItems(newItems);

    if (newItems.every((item) => item.checked)) {
      const lastCompletedItemIndex = items.findIndex((item) => !item.checked);
      const random = Math.random();

      if (random < 1 / 3) {
        // bounce
        animate(
          '[data-slot="checkbox"]',
          {
            scale: [1, 1.25, 1],
            filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
          },
          {
            duration: 0.4,
            delay: stagger(0.1, { from: lastCompletedItemIndex }),
          },
        );
      } else if (random < 2 / 3) {
        // shimmy
        animate(
          '[data-slot="checkbox"]',
          {
            x: [0, 2, -2, 0],
            filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
          },
          {
            duration: 0.4,
            delay: stagger(0.1, { from: lastCompletedItemIndex }),
          },
        );
      } else {
        // shake
        animate(
          '[data-slot="checkbox"]',
          {
            rotate: [0, 12, -12, 0],
            filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
          },
          {
            duration: 0.5,
            delay: stagger(0.1, { from: lastCompletedItemIndex }),
          },
        );
      }
    }
  }

  return (
    <div className="w-72 space-y-6">
      <div className="text-xl">My day</div>
      <div ref={ref} className="space-y-3">
        {items.map((item) => (
          <label
            key={item.id}
            className={`group flex w-full cursor-pointer select-none items-center gap-4 rounded text-sm font-medium transition-colors duration-300 checked:text-foreground/40 ${
              item.checked ? "text-foreground/30 line-through" : "text-gray-800"
            }`}
          >
            <motion.span
              whileTap={{
                scale: 0.9,
                filter: "blur(0.5px)",
              }}
              className="size-4"
            >
              <Checkbox
                data-slot="checkbox"
                onClick={() => handleChange(item.id)}
                checked={item.checked}
                className="rounded-none transition-colors duration-300"
              />
            </motion.span>
            <span>{item.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function TodoPage() {
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
        <main className="relative flex h-screen items-center justify-center">
          <InnerContent />
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
