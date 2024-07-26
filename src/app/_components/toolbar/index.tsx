"use client";

import * as React from "react";
import {
  ChevronDown,
  MousePointer2,
  Frame,
  Square,
  PenTool,
  Type,
  MessageCircle,
  Blocks,
  Ruler,
  SquarePen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DevSwitch } from "./dev-switch";

export function Toolbar() {
  const [devMode, setDevMode] = React.useState(false);
  const [activeOption, setActiveOption] = React.useState("pointer");

  return (
    <div className="flex gap-2 divide-x rounded-xl border shadow-lg">
      {devMode ? (
        <div className="flex items-center gap-2 p-2.5">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant={activeOption === "pointer" ? "default" : "ghost"}
              onClick={() => setActiveOption("pointer")}
              className="rounded-lg p-2.5"
            >
              <MousePointer2 className="size-6" />
            </Button>
            <ChevronDown className="size-3" />
          </div>

          <Button
            size="icon"
            variant={activeOption === "ruler" ? "default" : "ghost"}
            onClick={() => setActiveOption("ruler")}
            className="rounded-lg p-2.5"
          >
            <Ruler className="size-6" />
          </Button>

          <Button
            size="icon"
            variant={activeOption === "square-pen" ? "default" : "ghost"}
            onClick={() => setActiveOption("square-pen")}
            className="rounded-lg p-2.5"
          >
            <SquarePen className="size-6" />
          </Button>

          <Button
            size="icon"
            variant={activeOption === "message" ? "default" : "ghost"}
            onClick={() => setActiveOption("message")}
            className="rounded-lg p-2.5"
          >
            <MessageCircle className="size-6" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-2.5">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant={activeOption === "pointer" ? "default" : "ghost"}
              onClick={() => setActiveOption("pointer")}
              className="rounded-lg p-2.5"
            >
              <MousePointer2 className="size-6" />
            </Button>
            <ChevronDown className="size-3" />
          </div>

          <div className="r flex items-center gap-2">
            <Button
              size="icon"
              variant={activeOption === "frame" ? "default" : "ghost"}
              onClick={() => setActiveOption("frame")}
              className="rounded-lg p-2.5"
            >
              <Frame className="size-6" />
            </Button>
            <ChevronDown className="size-3" />
          </div>

          <div className="r flex items-center gap-2">
            <Button
              size="icon"
              variant={activeOption === "square" ? "default" : "ghost"}
              onClick={() => setActiveOption("square")}
              className="rounded-lg p-2.5"
            >
              <Square className="size-6" />
            </Button>
            <ChevronDown className="size-3" />
          </div>

          <div className="r flex items-center gap-2">
            <Button
              size="icon"
              variant={activeOption === "pen-tool" ? "default" : "ghost"}
              onClick={() => setActiveOption("pen-tool")}
              className="rounded-lg p-2.5"
            >
              <PenTool className="size-6" />
            </Button>
            <ChevronDown className="size-3" />
          </div>

          <Button
            size="icon"
            variant={activeOption === "type" ? "default" : "ghost"}
            onClick={() => setActiveOption("type")}
            className="rounded-lg p-2.5"
          >
            <Type className="size-6" />
          </Button>

          <Button
            size="icon"
            variant={activeOption === "message" ? "default" : "ghost"}
            onClick={() => setActiveOption("message")}
            className="rounded-lg p-2.5"
          >
            <MessageCircle className="size-6" />
          </Button>

          <Button
            size="icon"
            variant={activeOption === "more" ? "default" : "ghost"}
            onClick={() => setActiveOption("more")}
            className="rounded-lg p-2.5"
          >
            <Blocks className="size-6" />
          </Button>
        </div>
      )}
      <div className="flex items-center justify-center p-2.5">
        <DevSwitch checked={devMode} onCheckedChange={setDevMode} />
      </div>
    </div>
  );
}
