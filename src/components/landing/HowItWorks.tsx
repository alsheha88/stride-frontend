import { motion } from "motion/react";
import { howItWorksSteps } from "./data/howItWorks.data";

function HowItWorks() {
	return (
		<section id="how-it-works" className="my-20 max-w-4xl mx-auto px-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="mb-20">
				<h2 className="text-4xl md:text-5xl tracking-tight">How it works</h2>
				<p className="mt-4 max-w-2xl text-muted text-lg">
					Turn concepts into projects. Turn projects into confidence. Watch
					progress become impossible to ignore.
				</p>
			</motion.div>

			<div className="relative space-y-10">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.6 }}
					className="absolute left-7 top-14 bottom-14 w-px bg-border -translate-x-1/2"
				/>

				<motion.div
					initial={{ height: 0 }}
					whileInView={{ height: "calc(100% - 7rem)" }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 2.2, ease: "easeInOut", delay: 0.6 }}
					className="absolute left-7 top-14 w-px bg-primary -translate-x-1/2"
				/>

				{howItWorksSteps.map((item, i) => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.7, delay: i * 0.15 }}
						className="group relative flex items-center gap-8">
						<div className="relative z-10 shrink-0">
							<div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-surface">
								<span className="font-bold text-primary">{item.id}</span>
							</div>
						</div>

						<div className="relative flex-1 overflow-hidden rounded-3xl border border-border bg-surface/25 p-8 transition-all duration-300 group-hover:border-primary/40">
							<div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,137,6,0.12)_0%,transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

							<div className="relative">
								<h3 className="text-xl md:text-2xl font-semibold">
									{item.title}
								</h3>
								<p className="mt-3 text-muted leading-relaxed">
									{item.description}
								</p>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}

export default HowItWorks;
