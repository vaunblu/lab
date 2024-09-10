"use client";

import { cn } from "@/lib/utils";
import {
	AnimatePresence,
	motion,
	MotionConfig,
	Transition,
	useDragControls,
	useMotionValue,
	useMotionValueEvent,
	useTransform,
} from "framer-motion";
import React from "react";
import Image from "next/image";
import svgPhone from "@/assets/iphone-black.svg";
import logoVaun from "@/assets/vaun-logo.png";
import imageBg from "@/assets/bird.jpg";
import { Check } from "lucide-react";

const Context = React.createContext<{
	status: string;
	setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

function InnerContent() {
	const ctx = React.useContext(Context);
	const [yIsPositive, setYIsPositive] = React.useState(false);
	const isSending = ctx.status === "sending";
	const isSent = ctx.status === "sent";
	const isReady = ctx.status === "ready";
	const isConfirmation = ctx.status === "confirmation";
	const controls = useDragControls();
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const numberX = useTransform(x, [-100, 0, 0, 100], [-80, 0, 0, 80]);
	const numberY = useTransform(y, [-230, 0, 0, 550], [-150, 0, 0, 700]);
	const numberShadow = useTransform(
		y,
		[-230, 0, 0, 250],
		["none", "none", "0 0 0 rgba(0,0,0,0.3)", "0 12px 16px rgba(0,0,0,0.7)"],
	);
	const numberRotate = useTransform(
		x,
		[-100, 0, 0, 150],
		["30deg", "0deg", "0deg", "-30deg"],
	);

	const textScale = useTransform(x, [-100, 0, 0, 100], [0.8, 1, 1, 0.8]);
	const textRotateNegative = useTransform(
		x,
		[-100, 0, 0, 150],
		["-10deg", "0deg", "0deg", "10deg"],
	);
	const textRotatePositive = useTransform(
		x,
		[-100, 0, 0, 150],
		["30deg", "0deg", "0deg", "-30deg"],
	);

	const bgY = useTransform(y, [-230, 0, 0, 250], [0, 0, 0, 50]);
	const bgGradient = useTransform(
		y,
		[-230, 0, 0, 250],
		[
			"radial-gradient(circle,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 50%)",
			"radial-gradient(circle,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 50%)",
			"radial-gradient(circle,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 50%)",
			"radial-gradient(circle,rgba(74, 124, 137,0.7) 0%,rgba(0,0,0,0) 60%)",
		],
	);

	useMotionValueEvent(y, "change", (yValue) => {
		if (yValue > 0) {
			setYIsPositive(true);
		} else {
			setYIsPositive(false);
		}
	});

	React.useEffect(() => {
		if (isSending) {
			const timeout = setTimeout(() => ctx.setStatus("sent"), 600);
			return () => clearTimeout(timeout);
		}
		if (isSent) {
			const timeout = setTimeout(() => ctx.setStatus("confirmation"), 600);
			return () => clearTimeout(timeout);
		}
	}, [isSending, isSent, isConfirmation, ctx.setStatus]);

	return (
		<div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[51px] bg-[#FAFAFA] text-[#FAFAFA]">
			<Image
				src={imageBg}
				alt="Background"
				className="size-full absolute left-0 top-0 object-cover grayscale"
			/>
			<div className="size-full absolute left-0 top-0 bg-black/30 backdrop-blur-xl" />
			<div className="absolute left-0 top-0 h-1/3 w-full bg-gradient-to-b from-black/80" />
			<div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-black/80" />
			<motion.div
				style={{ y: bgY, x: "-50%", background: bgGradient }}
				className="absolute -top-1/2 left-1/2 h-[100vh] w-[150vw] -translate-x-1/2"
			/>

			<motion.div
				initial={{ y: 0, translateX: "-50%" }}
				animate={isConfirmation ? { y: 200 } : {}}
				className="absolute left-1/2 top-16 z-10 flex flex-col items-center gap-2"
			>
				<motion.div
					initial={{ scale: 1 }}
					animate={
						isSending
							? {
								scale: 1.1,
								transition: { ...transition, delay: 0.4, duration: 0.2 },
							}
							: {}
					}
					className={cn(
						"size-16 overflow-hidden rounded-full shadow-[0_24px_24px_-12px_rgba(0,0,0,0.4)] transition-[background-color,padding]",
						{
							"bg-[#8fdb24]/70 p-2 pt-3": isConfirmation,
						},
					)}
				>
					{isConfirmation ? (
						<Check className="size-full text-white" strokeWidth={3} />
					) : (
						<Image
							src={logoVaun}
							alt="Vaun"
							className="size-full object-cover"
						/>
					)}
				</motion.div>
				<AnimatePresence mode="popLayout" initial={false}>
					<motion.p
						key={isConfirmation ? "true" : "false"}
						initial={{ y: -10, opacity: 0, filter: "blur(4px)" }}
						animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
						exit={{ y: -10, opacity: 0, filter: "blur(4px)" }}
						transition={{ ...transition, delay: 0.1 }}
						className="font-semibold"
					>
						{isConfirmation ? "Sent" : "Vaun"}
					</motion.p>
				</AnimatePresence>
			</motion.div>

			<div className="space-y-24 text-center">
				<motion.h3
					initial={{ translateY: 0, scale: 1, opacity: 1 }}
					animate={
						isSending
							? {
								translateY: -250,
								scale: 0.3,
								opacity: 0.5,
								transition: { ...transition, duration: 0.15 },
							}
							: isSent || isConfirmation
								? { translateY: -250, scale: 0.3, opacity: 0 }
								: {}
					}
					style={{
						x: numberX,
						y: numberY,
						rotate: numberRotate,
						textShadow: numberShadow,
					}}
					className="text-5xl font-bold drop-shadow-sm"
				>
					$4.50
				</motion.h3>
				<motion.p
					key={isReady ? "ready" : "not-ready"}
					initial={{ opacity: 1, filter: "blur(4px)", translateY: 0 }}
					animate={
						isSending || isSent || isConfirmation
							? { opacity: 0, translateY: -100 }
							: { filter: "blur(0px)" }
					}
					style={{
						x,
						y,
						scale: textScale,
						rotate: yIsPositive ? textRotatePositive : textRotateNegative,
					}}
					className="cursor-pointer text-xl font-medium uppercase tracking-[0.3em] text-white/50"
				>
					{isReady || isSending ? "Release to send" : "Swipe down"}
				</motion.p>

				<AnimatePresence>
					{isConfirmation && (
						<motion.button
							initial={{
								y: -10,
								opacity: 0,
								scale: 0.8,
								filter: "blur(4px)",
								translateX: "-50%",
							}}
							animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
							whileTap={{ scale: 0.95 }}
							onTap={() => ctx.setStatus("idle")}
							className="absolute bottom-12 left-1/2 z-10 flex flex-col items-center gap-2 rounded-full bg-white/40 px-16 py-2.5 font-medium text-white shadow-[0_24px_24px_-12px_rgba(0,0,0,0.4)] backdrop-blur-md"
						>
							Done
						</motion.button>
					)}
				</AnimatePresence>
			</div>

			<motion.div
				dragControls={controls}
				drag
				dragConstraints={{
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
				}}
				dragElastic={{
					top: 0.3,
					right: 0.3,
					bottom: 0.7,
					left: 0.3,
				}}
				onDragStart={() => ctx.setStatus("dragging")}
				onDragEnd={() => {
					if (isReady) {
						ctx.setStatus("sending");
						return;
					}
					ctx.setStatus("idle");
				}}
				onDrag={() => {
					setYIsPositive(y.get() > 0);
					if (y.get() >= 150) {
						ctx.setStatus("ready");
					} else {
						ctx.setStatus("dragging");
					}
				}}
				style={{ x: x, y: y, touchAction: "none" }}
				className="size-full absolute left-0 top-0"
			/>
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
					<div
						className={cn(
							"relative flex aspect-square h-screen items-center justify-center bg-gradient-to-br from-[#FFFFFF] from-20% to-[#838fad]/60 transition-colors duration-300",
						)}
					>
						<div className="absolute left-1/2 top-1/2 z-20 h-[814px] w-[376px] -translate-x-1/2 -translate-y-1/2">
							<InnerContent />
						</div>

						<div className="fixed bottom-[72px] left-1/2 z-50 h-1.5 w-[360px] -translate-x-1/2 px-28">
							<div className="size-full rounded-3xl bg-white" />
						</div>

						<Image
							src={svgPhone}
							alt="iphone mock"
							className="pointer-events-none relative z-30"
						/>
					</div>
				</main>
			</MotionConfig>
		</Context.Provider>
	);
}
