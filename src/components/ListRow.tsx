import { motion } from "motion/react";

type ListRowProps = {
	children: React.ReactNode;
	className?: string;
	index?: number;
};

const ListRow = ({
	children,
	className = "grid grid-cols-4",
	index,
}: ListRowProps) => {
	const shouldAnimate = index !== undefined;
	return (
		<motion.div
			initial={shouldAnimate ? { y: 30, opacity: 0 } : false}
			animate={shouldAnimate ? { y: 0, opacity: 1 } : undefined}
			transition={
				shouldAnimate ? { duration: 0.5, delay: index * 0.05 } : undefined
			}
			className={`py-4 border-b border-border last:border-b-0`}>
			<div
				className={`${className} max-w-6xl mx-auto place-items-center text-center  `}>
				{children}
			</div>
		</motion.div>
	);
};

export default ListRow;
