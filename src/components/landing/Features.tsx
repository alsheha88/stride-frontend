import { BarChart2, Link, Sparkle, TrendingUp } from "lucide-react";
import Card from "../subcomponents/Card";
import { motion } from "motion/react";

const features = [
	{
		id: 1,
		icon: <TrendingUp size={24} className="stroke-primary" />,
		heading: "Track your real confidence",
		description:
			"Rate concepts on a 5-point scale from Beginner to Mastered. Watch the curve over time so growth becomes undeniable.",
	},
	{
		id: 2,
		icon: <Link size={24} className="stroke-primary" />,
		heading: "Connect projects to skills",
		description:
			"Every project you complete shows which concepts you used. The patterns reveal themselves: what you've practiced, what you've mastered, what's next.",
	},
	{
		id: 3,
		icon: <Sparkle size={24} className="stroke-primary" />,
		heading: "Never lose an insight",
		description:
			"Notes per concept capture the realizations that usually disappear. Three months later, you'll thank yourself.",
	},
	{
		id: 4,
		icon: <BarChart2 size={24} className="stroke-primary" />,
		heading: "Watch the growth chart fill in",
		description:
			"Visual proof of your trajectory. The line goes up because YOU went up.",
	},
];

function Features() {
	return (
		<section id="features" className="grid gap-8 mt-20 max-w-4xl mx-auto">
			<h2 className="text-2xl sm:text-4xl md:text-5xl tracking-tight">What Stride does</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{features.map((item, i) => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: i * 0.15 }}
						viewport={{ once: true }}>
						<Card className="h-full">
							<div className="flex flex-col gap-3">
								<div className="w-12 h-12 rounded-lg bg-primary/33 flex items-center justify-center">
									{item.icon}
								</div>
								<h3 className="text-paragraph text-lg md:text-xl font-semibold">
									{item.heading}
								</h3>
								<p className="text-muted">{item.description}</p>
							</div>
						</Card>
					</motion.div>
				))}
			</div>
		</section>
	);
}

export default Features;
