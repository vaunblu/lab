"use client";

import {
  useDragControls,
  motion,
  MotionConfig,
  useMotionValue,
} from "framer-motion";
import React from "react";
import MotionNumber from "motion-number";

export default function HomePage() {
  const controls = useDragControls();
  const [value, setValue] = React.useState(35);
  const timerX = useMotionValue(0);

  function startDrag(event: React.PointerEvent) {
    controls.start(event);
  }

  const amountChange = useMotionValue(0);

  timerX.on("change", (val) => {
    amountChange.set(Math.floor(val / 20) * -1);
  });

  amountChange.on("change", (val) => {
    setValue(val + 35);
  });

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
      <div className="flex h-screen items-center justify-center bg-[#ecebec]">
        <div className="relative h-[465px] w-[865px] overflow-x-hidden rounded-[80px] border-2 border-[#deddde] bg-[#f5f4f6] shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.06)]">
          <p className="absolute left-0 top-[100px] w-full text-center font-mono text-[80px] font-extralight tracking-tight text-[#131213]">
            <span>0:</span>
            <MotionNumber value={value} locales="en-US" />
          </p>

          <motion.div
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            dragElastic={{
              left: 1,
              right: 1,
            }}
            drag="x"
            dragControls={controls}
            onPointerDown={startDrag}
            style={{ touchAction: "none", x: timerX }}
            className="absolute -left-[1928px] bottom-[100px] h-20 w-fit space-x-[15px] whitespace-nowrap bg-transparent"
          >
            {Array.from(Array(200).keys()).map((item) => (
              <div
                key={item}
                className="inline-block h-full w-1 rounded-full bg-[#d5d4d5] [&:nth-child(10n)]:bg-[#bab9ba]"
              />
            ))}
          </motion.div>

          <div className="pointer-events-none absolute bottom-[100px] left-1/2 flex -translate-x-1/2 flex-col items-center">
            <div className="size-4 rounded-full bg-[#fe0008] " />
            <div className="h-[90px] w-1 rounded-b-full bg-[#fe0008]" />
          </div>

          <div className="pointer-events-none absolute bottom-[100px] left-0 h-20 w-[40%] bg-gradient-to-r from-[#f5f4f6] from-10%" />
          <div className="pointer-events-none absolute bottom-[100px] right-0 h-20 w-[40%] bg-gradient-to-l from-[#f5f4f6] from-10%" />
        </div>
      </div>
    </MotionConfig>
  );
}
