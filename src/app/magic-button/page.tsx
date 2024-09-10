"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Sparkle } from "lucide-react";
import React from "react";

export default function HomePage() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [loading, setLoading]);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.8 }}>
      <div className="relative flex h-screen items-center justify-center">
        <button
          type="button"
          aria-label="Generate"
          disabled={loading}
          onClick={() => setLoading(true)}
          className={cn(
            "flex h-10 w-[145px] items-center justify-center rounded-full bg-gradient-to-b from-[#8D22E1] to-[#F043FF] text-white shadow-[0_-4px_6px_2px_#8D22E1_inset,0_0_0_2px_#AF3DFF_inset,0_5px_11px_0_rgba(114,22,123,0.5)] transition-[box-shadow,opacity,transform] duration-200 active:scale-[0.99] active:shadow-[0_-4px_6px_2px_#8D22E1_inset,0_0_0_2px_#AF3DFF_inset,0_5px_11px_0_rgba(114,22,123,0.2)]",
            { "opacity-90": loading },
          )}
        >
          <motion.div
            initial={{ width: 100 }}
            animate={{ width: loading ? 113 : 100 }}
            className="flex items-center justify-between gap-1"
          >
            <div className="size-6 relative shrink-0">
              <motion.div
                initial={{ y: 0, scale: 1 }}
                animate={loading ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  repeatType: "mirror",
                  repeat: loading ? Infinity : 0,
                }}
              >
                <Sparkle
                  fill="currentColor"
                  strokeWidth={1}
                  className="size-2.5 absolute right-0"
                />
              </motion.div>
              <motion.div
                initial={{ y: 2.5 }}
                animate={
                  loading ? { y: -0.5, scale: 1.1 } : { y: 2.5, scale: 1 }
                }
                transition={{
                  delay: 0,
                  duration: 0.8,
                  repeatType: "mirror",
                  repeat: loading ? Infinity : 0,
                }}
              >
                <Sparkle
                  fill="currentColor"
                  strokeWidth={1}
                  className="size-4 absolute left-0"
                />
              </motion.div>
              <motion.div
                initial={{ y: 14 }}
                animate={loading ? { y: 11, scale: 1.1 } : { y: 14, scale: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  repeatType: "mirror",
                  repeat: loading ? Infinity : 0,
                }}
              >
                <Sparkle
                  fill="currentColor"
                  strokeWidth={1}
                  className="size-2 absolute right-1"
                />
              </motion.div>
            </div>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={loading ? "generating" : "generate"}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
              >
                {loading ? "Generating" : "Generate"}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </button>
      </div>
    </MotionConfig>
  );
}
