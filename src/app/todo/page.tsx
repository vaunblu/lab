"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { motion, MotionConfig, type Transition } from "framer-motion";
import React from "react";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

function InnerContent() {
  const ctx = React.useContext(Context);

  const [items, setItems] = React.useState([
    { id: "1", text: "One", checked: true },
    { id: "2", text: "Two", checked: true },
    { id: "3", text: "Three", checked: false },
    { id: "4", text: "Four", checked: true },
    { id: "5", text: "Five", checked: true },
    { id: "6", text: "Six", checked: true },
    { id: "7", text: "Seven", checked: true },
  ]);

  function handleChange(id: string) {
    const newItems = items.map((item) => ({
      ...item,
      checked: item.id === id ? !item.checked : item.checked,
    }));

    setItems(newItems);
  }

  return (
    <div className="w-72 space-y-4">
      <div className="text-xl font-semibold tracking-tight">Checklist</div>
      <div className="space-y-4">
        {items.map((item) => (
          <label
            key={item.id}
            className={`group flex w-full cursor-pointer select-none items-center gap-4 rounded text-sm font-medium transition-colors duration-300 checked:text-gray-300 ${
              item.checked ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            <Checkbox
              onClick={() => handleChange(item.id)}
              checked={item.checked}
              className="rounded-none transition-colors duration-300"
            />
            {item.text}
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
