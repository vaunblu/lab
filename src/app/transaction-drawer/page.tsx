"use client";

import { GrainyBackground } from "@/components/grainy-background";
import { atom, useAtom } from "jotai";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Transition,
} from "framer-motion";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import svgPhone from "@/assets/iphone-black.svg";
import { nanoid } from "nanoid";
import NumberFlow from "@number-flow/react";
import { Plus } from "lucide-react";
import { transactionsData } from "./transactions";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

type Transaction = {
  id: string;
  title: string;
  cost: number;
  date: string;
};

const activeTransactionAtom = atom<Transaction | null>(null);

function InnerContent() {
  let [transactions, setTransactions] = useState<Array<Transaction>>([
    { id: nanoid(), ...transactionsData[0] },
    { id: nanoid(), ...transactionsData[1] },
    { id: nanoid(), ...transactionsData[2] },
  ]);
  const [open, setOpen] = useState(false);
  const [activeTransaction, setActiveTransaction] = useAtom(
    activeTransactionAtom,
  );

  const transactionTotal = useMemo(() => {
    let total = 0;
    for (const transaction of transactions) {
      total += transaction.cost;
    }
    return total;
  }, [transactions]);

  function addTodo() {
    let newId = nanoid();
    const randomIndex = Math.floor(Math.random() * 95) + 3;
    const randomTransaction = transactionsData[randomIndex];
    setTransactions([{ id: newId, ...randomTransaction }, ...transactions]);
  }

  function removeTodo(transaction: Transaction) {
    setTransactions((transactions) =>
      transactions.filter((t) => t.id !== transaction.id),
    );
  }

  return (
    <div className="grid h-full w-full place-items-center rounded-3xl bg-gradient-to-t from-[#53828c]/40 to-[#e5e6e8] to-70% px-2 py-[58px] pb-2.5">
      <div className="relative grid h-full w-full grid-rows-3 overflow-hidden rounded-[48px] bg-[#fafafa]">
        <div className="row-span-1 grid place-items-center">
          <div className="flex flex-col items-center">
            <p className="px-3.5 font-light">Total balance</p>
            <NumberFlow
              value={transactionTotal}
              format={{
                style: "currency",
                currency: "USD",
                trailingZeroDisplay: "stripIfInteger",
              }}
              className="text-5xl font-medium"
            />
          </div>
        </div>
        <div className="row-span-2 h-full space-y-2">
          <div className="flex items-center justify-between px-3.5">
            <p className="font-medium">Transactions</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={addTodo}
              className="grid place-items-center rounded-full bg-[#1f1f1f] px-3 py-1 font-medium"
            >
              <Plus strokeWidth={3} className="size-4 text-[#fafafa]" />
            </motion.button>
          </div>
          <ul className="px-2">
            <AnimatePresence initial={false}>
              {transactions.map((transaction) => (
                <motion.li
                  onClick={() => {
                    setActiveTransaction(transaction);
                    setOpen(true);
                  }}
                  key={transaction.id}
                  initial={{ height: 0, scale: 0.9, filter: "blur(4px)" }}
                  animate={{ height: "auto", scale: 1, filter: "blur(0px)" }}
                  exit={{ height: 0, scale: 0.9, filter: "blur(4px)" }}
                  style={{ overflow: "hidden", zIndex: 1000 }}
                >
                  <div className="mb-2 flex w-full items-center justify-between rounded-xl bg-[#f1f3f4] p-3 text-left">
                    <div>
                      <p className="text-xs font-light">{transaction.date}</p>
                      <p className="text-sm font-medium">{transaction.title}</p>
                    </div>
                    <p className="font-medium">${transaction.cost}</p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        <div
          className={cn(
            "absolute bottom-0 left-0 h-1/5 w-full bg-gradient-to-t from-[#fafafa] transition-all duration-300 ease-out",
            open && "h-full",
          )}
        />
        <div
          className={cn(
            "absolute bottom-0 left-0 h-1/4 w-full bg-transparent backdrop-blur-lg transition-all duration-300 ease-out [mask:linear-gradient(0deg,rgba(0,0,0,1)_30%,rgba(0,0,0,0)_100%)]",
            open && "h-full",
          )}
        />

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="absolute border-0 bg-transparent p-4 pt-2 shadow-none">
            <DrawerTitle className="sr-only">Transaction Info</DrawerTitle>
            <DrawerDescription className="sr-only">{`More info for the ${activeTransaction?.title} transaction`}</DrawerDescription>
            <div className="rounded-[41px] border border-border bg-[#e5e6e8] p-6">
              <p>{activeTransaction?.title}</p>
              <p>{activeTransaction?.date}</p>
              <Button className="w-full rounded-full">Delete</Button>
            </div>
          </DrawerContent>
        </Drawer>
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
        <main className="flex h-screen select-none items-center justify-center overflow-hidden">
          <GrainyBackground
            className="relative flex aspect-square h-screen items-center justify-center transition-colors duration-300"
            grainOpacity={0.12}
            grainContrast={0.7}
          >
            <div className="absolute left-1/2 top-1/2 z-20 h-[814px] w-[376px] -translate-x-1/2 -translate-y-1/2">
              <InnerContent />
            </div>

            {/* <div className="fixed bottom-[72px] left-1/2 z-50 h-1.5 w-[360px] -translate-x-1/2 px-28"> */}
            {/* <div className="fixed bottom-[76px] left-1/2 z-50 h-1.5 w-[360px] -translate-x-1/2 px-28"> */}
            {/*   <div className="size-full rounded-3xl bg-black" /> */}
            {/* </div> */}

            <Image
              src={svgPhone}
              alt="iphone mock"
              className="pointer-events-none relative z-30"
            />
          </GrainyBackground>
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
