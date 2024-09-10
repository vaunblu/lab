"use client";

import { AnimatePresence, motion } from "framer-motion";

export function Morph(props: { children: string | string[]; id?: string }) {
  function generateKeys(text: string) {
    const charCount: { [key: string]: number } = {};

    return text.split("").map((char) => {
      if (!charCount[char]) {
        charCount[char] = 0;
      }
      const key = `${props.id ?? ""}-${char}-${charCount[char]}`;
      charCount[char]++;
      return { char, key };
    });
  }

  const textToDisplay = generateKeys(props.children as string);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {textToDisplay.map(({ char, key }) => (
        <motion.span
          key={key}
          layoutId={key}
          className="inline-block text-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.25,
            type: "spring",
            bounce: 0,
            opacity: {
              duration: 0.6,
              type: "spring",
              bounce: 0,
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </AnimatePresence>
  );
}
