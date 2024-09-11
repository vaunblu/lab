"use client";
import { ArrowRight, Music, Bird, Disc, CreditCard, PlusCircle, Compass, Heart, Wand2, Sparkles, Smartphone, Headphones, Popcorn, Zap, Timer, FileSpreadsheet, } from 'lucide-react'

import { motion, MotionConfig, type Transition } from "framer-motion";
import Link from "next/link";
import React from "react";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });
const items = [
  { id: 6, title: 'Album', slug: 'album', icon: Music, color: 'bg-red-100', size: 'md:col-span-1 md:row-span-1' },
  { id: 7, title: 'Bird', slug: 'bird', icon: Bird, color: 'bg-blue-200', size: 'md:col-span-1 md:row-span-1' },
  { id: 8, title: 'Carousel', slug: 'carousel', icon: PlusCircle, color: 'bg-orange-100', size: 'md:col-span-2 md:row-span-1' },
  { id: 9, title: 'CD', slug: 'cd', icon: Disc, color: 'bg-green-200', size: 'md:col-span-1 md:row-span-1' },
  { id: 10, title: 'Checkout', slug: 'checkout', icon: CreditCard, color: 'bg-yellow-200', size: 'md:col-span-1 md:row-span-1' },
  { id: 11, title: 'Create New', slug: 'create-new', icon: PlusCircle, color: 'bg-blue-300', size: 'md:col-span-1 md:row-span-1' },
  { id: 12, title: 'Explore', slug: 'explore', icon: Compass, color: 'bg-purple-200', size: 'md:col-span-1 md:row-span-1' },
  { id: 13, title: 'Happy Cards', slug: 'happy-cards', icon: Heart, color: 'bg-pink-200', size: 'md:col-span-1 md:row-span-1' },
  { id: 14, title: 'Love This', slug: 'love-this', icon: Heart, color: 'bg-red-200', size: 'md:col-span-1 md:row-span-1' },
  { id: 15, title: 'Magic Button', slug: 'magic-button', icon: Wand2, color: 'bg-blue-400', size: 'md:col-span-2 md:row-span-1' },
  { id: 16, title: 'Neu', slug: 'neu', icon: Sparkles, color: 'bg-gray-100', size: 'md:col-span-1 md:row-span-1' },
  { id: 17, title: 'Northern Lights', slug: 'northern-lights', icon: Sparkles, color: 'bg-green-300', size: 'md:col-span-2 md:row-span-2' },
  { id: 18, title: 'Phone Glow', slug: 'phone-glow', icon: Smartphone, color: 'bg-yellow-300', size: 'md:col-span-1 md:row-span-1' },
  { id: 19, title: 'Podcasts', slug: 'podcasts', icon: Headphones, color: 'bg-purple-300', size: 'md:col-span-1 md:row-span-1' },
  { id: 20, title: 'Popcorn', slug: 'popcorn', icon: Popcorn, color: 'bg-orange-200', size: 'md:col-span-1 md:row-span-1' },
  { id: 21, title: 'Slingshot', slug: 'slingshot', icon: PlusCircle, color: 'bg-red-300', size: 'md:col-span-1 md:row-span-1' },
  { id: 22, title: 'Thunder Airdrop', slug: 'thunder-airdrop', icon: Zap, color: 'bg-blue-500', size: 'md:col-span-2 md:row-span-1' },
  { id: 23, title: 'Thunder Speed', slug: 'thunder-speed', icon: Zap, color: 'bg-green-400', size: 'md:col-span-1 md:row-span-1' },
  { id: 24, title: 'Timer', slug: 'timer', icon: Timer, color: 'bg-yellow-400', size: 'md:col-span-1 md:row-span-1' },
  { id: 25, title: 'Toast', slug: 'toast', icon: PlusCircle, color: 'bg-purple-400', size: 'md:col-span-1 md:row-span-1' },
  { id: 26, title: 'UI Course Form', slug: 'ui-course-form', icon: FileSpreadsheet, color: 'bg-pink-300', size: 'md:col-span-2 md:row-span-1' },
  { id: 27, title: 'Vinyl', slug: 'vinyl', icon: PlusCircle, color: 'bg-red-400', size: 'md:col-span-1 md:row-span-1' },
]

function InnerContent() {
  const ctx = React.useContext(Context);

  return (
    <div className="min-h-screen w-full bg-gray-100 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Discover Amazing Topics
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <Link key={item.id} href={`/${item.slug}`} className={`${item.size} ${item.color} rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group`}>
              <div className="flex flex-col h-full">
                <item.icon className="w-8 h-8 mb-4 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                  {item.title}
                </h2>
                <div className="mt-auto flex items-center text-sm text-gray-600 group-hover:text-gray-800">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
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
    <Context.Provider value={{ status, setStatus }}>
      <MotionConfig transition={transition}>
        <main className="relative flex h-screen items-center justify-center">
          <InnerContent />
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
