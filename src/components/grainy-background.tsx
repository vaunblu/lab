"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GrainyBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  baseColor?: string;
  grainOpacity?: number;
  grainDensity?: number;
  grainContrast?: number;
  animate?: boolean;
}

export function GrainyBackground({
  baseColor = "#ffffff",
  grainOpacity = 0.12,
  grainDensity = 0.9,
  grainContrast = 0.7,
  animate = false,
  className,
  children,
  ...props
}: GrainyBackgroundProps) {
  // Generate a unique ID for the filter
  const filterId = React.useId();

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor: baseColor }}
      {...props}
    >
      {/* SVG filter definition */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-0">
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={grainDensity}
            numOctaves="3"
            stitchTiles="stitch"
            seed={animate ? undefined : Math.random() * 100}
          >
            {animate && (
              <animate
                attributeName="seed"
                from="0"
                to="100"
                dur="8s"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                   0 0 0 0 0
                   0 0 0 0 0
                   0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0 1" />
            <feFuncG type="table" tableValues="0 1" />
            <feFuncB type="table" tableValues="0 1" />
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncR type="gamma" exponent={grainContrast} />
            <feFuncG type="gamma" exponent={grainContrast} />
            <feFuncB type="gamma" exponent={grainContrast} />
          </feComponentTransfer>
        </filter>
      </svg>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          filter: `url(#${filterId})`,
          opacity: grainOpacity,
          mixBlendMode: "multiply",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
