const tierColors = [
	{ filled: "bg-danger", rating: "Beginner" }, // 1: Beginner
	{ filled: "bg-secondary", rating: "Learning" }, // 2: Learning
	{ filled: "bg-primary", rating: "Confident" }, // 3: Confident
	{ filled: "bg-success", rating: "Strong" }, // 4: Strong
	{ filled: "bg-tertiary", rating: "Mastered" }, // 5: Mastered
];

function Legend() {
	return (
		<div className="min-w-0  grid place-items-center">
			<div className="flex sm:flex-col sm:gap-3 gap-6 flex-wrap">
				{tierColors.map((i) => (
					<div className="flex gap-1 items-center" key={i.rating}>
						<span className={`sm:w-4 sm:h-4 w-2 h-2 rounded-[50%] ${i.filled}`}></span>
						<p className="text-muted text-sm">{i.rating}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Legend;
