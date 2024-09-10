"use client";

import { MotionConfig } from "framer-motion";
import React from "react";

export default function HomePage() {
  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.8 }}>
      <div className="relative flex h-screen items-center justify-center">
        <div className="size-[520px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-200" />
        <div className="size-[400px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300" />
        <div className="size-[260px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400" />
        <div className="size-[200px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500" />
        <div className="size-[90px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-600" />
        <div className="size-[60px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-700" />
        <div className="size-[25px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-800" />
        <div className="size-[15px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-900" />
      </div>
    </MotionConfig>
  );
}
