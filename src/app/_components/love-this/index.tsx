"use client";

import * as React from "react";
import { Check, Send, ThumbsDown, ThumbsUp, X } from "lucide-react";
import {
  RatePopover as RatePopoverRoot,
  RatePopoverContent,
  RatePopoverTrigger,
} from "./rate-popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const RatePopoverContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => null,
});

function RatePopover() {
  const ctx = React.useContext(RatePopoverContext);

  return (
    <RatePopoverRoot open={ctx.open} onOpenChange={ctx.setOpen}>
      <RatePopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-14 rounded-full p-2"
        >
          <ThumbsUp
            className={cn(
              "size-8 cursor-pointer transition-opacity",
              ctx.open ? "opacity-0" : "opacity-100",
            )}
          />
        </Button>
      </RatePopoverTrigger>
      <RatePopoverContent
        side="top"
        sideOffset={20}
        onInteractOutside={(e) => e.preventDefault()}
        className="flex items-end gap-4 font-semibold"
      >
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-16 rounded-full p-2"
          >
            <ThumbsDown className="size-10" />
          </Button>
          <p className="text-nowrap">Not for me</p>
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-16 rounded-full p-2"
          >
            <ThumbsUp className="size-10" />
          </Button>
          <p className="text-nowrap">I like this</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-16 rounded-full p-2"
          >
            <ThumbsUp className="size-10" />
          </Button>
          <p className="text-nowrap">Love this!</p>
        </div>
      </RatePopoverContent>
    </RatePopoverRoot>
  );
}

export function LoveThis() {
  const [open, setOpen] = React.useState(false);

  return (
    <RatePopoverContext.Provider value={{ open, setOpen }}>
      <div className="flex items-end gap-14 font-semibold">
        <div className="flex flex-col items-center gap-2">
          <Button variant="ghost" size="icon" className="size-14 rounded-full">
            <Check className="size-8" />
          </Button>
          <p>My List</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <RatePopover />
          <p
            className={cn(
              "transition-opacity",
              open ? "opacity-0" : "opacity-100",
            )}
          >
            Rate
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-14 rounded-full p-2"
          >
            <Send className="size-7 translate-y-0.5" />
          </Button>
          <p>Share</p>
        </div>
      </div>
    </RatePopoverContext.Provider>
  );
}
