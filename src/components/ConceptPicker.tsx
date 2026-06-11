import { useState } from "react";
import { useGetConcepts } from "../hooks/concepts/useConcepts";
import type { CreateProjectData } from "../schemas/projectsSchema";
import Button from "./subcomponents/Button";
import { motion } from "motion/react";

const tierColors = [
	{ dot: "bg-danger", border: "border-danger", rating: "Beginner" },
	{ dot: "bg-secondary", border: "border-secondary", rating: "Learning" },
	{ dot: "bg-primary", border: "border-primary", rating: "Confident" },
	{ dot: "bg-success", border: "border-success", rating: "Strong" },
	{ dot: "bg-tertiary", border: "border-tertiary", rating: "Mastered" },
];

type ConceptPickerProps = {
	value: CreateProjectData["conceptLinks"];
	onChange: (value: CreateProjectData["conceptLinks"]) => void;
};

const ConceptPicker = ({ value, onChange }: ConceptPickerProps) => {
	const [searchText, setSearchText] = useState("");
	const [newConceptRating, setNewConceptRating] = useState<number | null>(null);

	const { data } = useGetConcepts();
	const concepts = data?.data.concepts ?? [];

	const alreadyPickedIds = value
		.filter((link) => link.type === "existing")
		.map((link) => link.conceptId);

	const filteredConcepts = concepts
		.filter(
			(c) =>
				!alreadyPickedIds.includes(c.id) &&
				c.name.toLowerCase().includes(searchText.toLowerCase()),
		)
		.slice(0, 4);

	const exactMatch = concepts.some(
		(c) => c.name.toLowerCase() === searchText.toLowerCase(),
	);

	const resetPicker = () => {
		setSearchText("");
		setNewConceptRating(null);
	};

	const handleAddExisting = (conceptId: string) => {
		onChange([...value, { type: "existing", conceptId }]);
		resetPicker();
	};

	const handleAddNew = () => {
		if (!newConceptRating) return;
		onChange([
			...value,
			{ type: "new", name: searchText, initialRating: newConceptRating },
		]);
		resetPicker();
	};

	return (
		<div className="flex flex-col gap-2">
			{/* Pills of chosen concepts */}
			{value.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{value.map((link, i) => {
						const displayName =
							link.type === "existing"
								? concepts.find((c) => c.id === link.conceptId)?.name
								: link.name;

						return (
							<div
								key={i}
								className="bg-primary flex items-center gap-1 px-3 py-1 rounded-full">
								<span className="text-sm md:text-base text-headline">
									{displayName}
								</span>
								<button
									className="cursor-pointer text-headline hover:text-paragraph"
									type="button"
									onClick={() => onChange(value.filter((_, idx) => idx !== i))}>
									×
								</button>
							</div>
						);
					})}
				</div>
			)}

			{/* Search input */}
			<input
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				placeholder="Search or create concept..."
				className="px-4 py-2 border border-border rounded-lg w-full bg-surface text-headline text-sm md:text-base placeholder:text-muted focus:outline-none focus:border-primary"
			/>

			{/* Suggestions */}
			{searchText.length > 0 && (
				<motion.ul
					className="border border-border rounded-lg"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					exit={{ opacity: 0 }}>
					{filteredConcepts.map((c) => (
						<li
							key={c.id}
							className="px-4 py-2 text-sm md:text-base text-paragraph cursor-pointer hover:bg-surface-hover"
							onClick={() => handleAddExisting(c.id)}>
							{c.name}
						</li>
					))}

					{!exactMatch && (
						<li className="px-4 py-3 flex flex-col gap-3">
							<p className="text-primary text-sm md:text-base">
								+ Create "{searchText}" as new concept
							</p>

							<div className="flex items-center justify-between gap-2">
								{tierColors.map((item, i) => {
									const ratingValue = i + 1;
									const isSelected = newConceptRating === ratingValue;

									return (
										<button
											key={item.rating}
											type="button"
											onClick={() => setNewConceptRating(ratingValue)}
											className="flex flex-col items-center gap-2 cursor-pointer flex-1 bg-transparent">
											<span
												className={`w-4 h-4 rounded-full border-2 ${item.border} 
                          flex items-center justify-center transition-colors
                          ${isSelected ? "border-solid" : "border-dashed"}`}>
												{isSelected && (
													<span
														className={`w-2 h-2 rounded-full ${item.dot}`}
													/>
												)}
											</span>
											<span
												className={`text-xs transition-colors ${
													isSelected ? "text-headline" : "text-muted"
												}`}>
												{item.rating}
											</span>
										</button>
									);
								})}
							</div>

							<Button
								type="button"
								variant="primary"
								onClick={handleAddNew}
								disabled={!newConceptRating}>
								Add Concept
							</Button>
						</li>
					)}
				</motion.ul>
			)}
		</div>
	);
};

export default ConceptPicker;
