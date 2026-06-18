import { NavLink } from "react-router-dom";
import Button from "../subcomponents/Button";
import { motion } from "motion/react";

const MotionButton = motion.create(Button);

function Hero() {
	return (
		<section className="grid place-items-start gap-8 mt-20 max-w-4xl mx-auto">
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0 }}
				className="text-headline/92 text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight">
				Built for self-taught devs who want to prove — to themselves — that
				they're growing
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className="text-muted text-xl">
				Track what you learn, what you build, and how far you’ve come — so your
				progress is impossible to ignore.
			</motion.p>
			<MotionButton
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				variant={"primary"}
				type={"button"}
				className="font-bold mt-4">
				<NavLink to={"/signup"} className={"font-bold"}>Try Stride</NavLink>
			</MotionButton>
			<motion.span
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className="text-muted">
				It's totally free. Built by a self-taught dev, for self-taught devs.
			</motion.span>
		</section>
	);
}

export default Hero;
