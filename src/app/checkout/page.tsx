"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import React from "react";

export default function AddToCartPage() {
  const [hovered, setHovered] = React.useState(false);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.2 }}>
      <div className="flex h-screen items-center justify-center bg-[#fafafa] text-[#1f1f1f]">
        <div className="relative space-y-2">
          <motion.div
            initial={{ height: 0 }}
            animate={hovered ? { height: 56 } : {}}
            className="absolute bottom-10 left-0 z-0 flex w-full justify-center overflow-hidden rounded-t-[12px] bg-[#1f1f1f]/50 font-medium text-white/90 backdrop-blur-md"
          >
            <span className="font z-10 pt-3">3 Items in cart</span>
          </motion.div>
          <button
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            className="relative z-10 flex h-[50px] items-center justify-center rounded-[12px] bg-[#1f1f1f] px-8 font-semibold text-[#fafafa] shadow-[0_1px_1px_1px_rgba(0,0,0,0.08),0_6px_6px_-3px_rgba(0,0,0,0.06)]"
          >
            <span>Checkout</span>
            <span className="relative">
              <ShoppingCart className="size-5 ml-1.5" />
              <AnimatePresence>
                {!hovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="size-3 absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-[#1f1f1f] p-[2px] text-[10px]"
                  >
                    <span>3</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          </button>
        </div>
      </div>
    </MotionConfig>
  );
}
