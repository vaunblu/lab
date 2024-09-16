"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const examples = [
  "love-folder",
  "tooltip-nav",
  "audiobooks",
  "folder",
  "affirmations",
  "album",
  "bird",
  "carousel",
  "cd",
  "checkout",
  "create-new",
  "explore",
  "happy-cards",
  "love-this",
  "magic-button",
  "neu",
  "northern-lights",
  "phone-glow",
  "podcasts",
  "popcorn",
  "slingshot",
  "thunder-airdrop",
  "thunder-speed",
  "timer",
  "toast",
  "ui-course-form",
  "vinyl",
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Examples
          </h2>
          <div className="space-y-1">
            {examples.map((example) => (
              <Button
                key={example}
                variant={pathname === `/${example}` ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={`/${example}`}>
                  {example.charAt(0).toUpperCase() + example.slice(1)}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
