"use client";

import {motion, MotionConfig, type Transition} from "framer-motion";
import React from "react";

const transition: Transition = {type: "spring", bounce: 0, duration: 0.4};

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({status: "", setStatus: () => null});

function InnerContent() {
  const ctx = React.useContext(Context);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Lab</h1>
      <p className="mb-4">This is the main page of our UI component laboratory.</p>
      <p>Select an example from the sidebar to explore different UI components and experiments.</p>
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
    <Context.Provider value={{status, setStatus}}>
      <MotionConfig transition={transition}>
        <main className="relative h-full">
          <InnerContent />
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}