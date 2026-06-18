import { motion } from "motion/react";

function Thesis() {
	return (
		<section className=" grid place-items-start gap-8 mt-20 max-w-4xl mx-auto">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0 }}
				viewport={{ once: true }}
				className="text-4xl md:text-5xl tracking-tight">
				Concepts are the tools. Projects are the proof.
			</motion.h2>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				viewport={{ once: true }}
				className="text-muted text-xl text-left">
				Learning happens in two places: understanding an idea and applying it in
				the real world. One without the other creates an incomplete picture.
				Stride links the concepts you learn to the projects you build, turning
				scattered effort into evidence of growth.
			</motion.p>
		</section>
	);
}

export default Thesis;
