import ListRow from "../components/ListRow";
import Button from "../components/subcomponents/Button";
import RatingDots from "../components/RatingDots";
import { useGetConcepts } from "../hooks/concepts/useConcepts";
import { ArrowBigRight, ArrowUpDown, Search } from "lucide-react";
import { formatDate } from "../lib/utility";
import { NavLink } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import AddConceptModal from "../components/modals/AddConceptModal";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

const ConceptOverviewPage = () => {
	const { data, isLoading, isError, error } = useGetConcepts();
	const [isOpen, setIsOpen] = useState(false);
	const [searchText, setSearchText] = useState("");

	const allConcepts = data?.data.concepts;
	const concepts = allConcepts?.filter((concept) =>
		concept.name.toLowerCase().includes(searchText.toLowerCase()),
	);

	if (isError)
		return (
			<div className="h-dvh grid place-items-center">
				<p className="text-2xl text-danger">{error.message}</p>
			</div>
		);
	if (isLoading)
		return (
			<div className="h-dvh flex items-center justify-center">
				<ThreeCircles color="#ff8906" />
			</div>
		);

	return (
		<main className="min-h-dvh flex flex-col gap-10 px-3 md:px-8 pt-4 pb-16 max-w-6xl mx-auto">
			<h1 className="text-2xl md:text-3xl text-paragraph">Concepts Overview</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
				<div className="relative">
					<Search
						className="absolute top-1/2 -translate-y-1/2 left-6"
						color="#6b6a78"
					/>
					<input
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						placeholder="Search Concepts"
						className="px-14 py-3 h-full w-full border placeholder:text-muted text-headline border-border rounded-lg bg-surface focus:outline-none focus:border-primary shadow-[0px_1px_2px_rgba(10,13,18,0.05)] text-sm md:text-base"
					/>
				</div>
				<div className="flex items-center justify-center gap-4 lg:justify-end">
					<Button
						variant="primary"
						type="button"
						onClick={() => setIsOpen(true)}>
						Add Concept
					</Button>
					<Button variant="secondary" type="button">
						Sort <ArrowUpDown size={18} />
					</Button>
				</div>
			</div>

			<div>
				{concepts && concepts.length > 0 ? (
					concepts.map((concept, i) => (
						<ListRow
							key={concept.id}
							className="grid grid-cols-3 sm:grid-cols-4"
							index={i}>
							<p className="text-sm md:text-base text-paragraph">
								{concept.name}
							</p>
							<RatingDots rating={concept.ratings[0]?.rating ?? 0} />
							<p className="text-xs md:text-sm text-muted text-center hidden sm:block">
								{formatDate(concept.createdAt)}
							</p>
							<NavLink
								to={`/concepts/${concept.id}`}
								className="place-self-center"
								aria-label={`View ${concept.name}`}>
								<ArrowBigRight
									fill="#fffffe"
									className="hover:fill-primary hover:stroke-primary"
								/>
							</NavLink>
						</ListRow>
					))
				) : searchText ? (
					<p className="text-muted italic text-base md:text-lg text-center py-12">
						No concepts match "{searchText}"
					</p>
				) : (
					<p className="text-muted italic text-base md:text-lg text-center py-12">
						No concepts yet. Add your first one to start tracking.
					</p>
				)}
			</div>

			<AnimatePresence>
				{isOpen && (
					<AddConceptModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
				)}
			</AnimatePresence>
		</main>
	);
};

export default ConceptOverviewPage;
