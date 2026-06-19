import { NavLink } from "react-router-dom";
import { useGetDashboard } from "../hooks/dashboard/useDashboard";
import Card from "../components/subcomponents/Card";
import ListRow from "../components/ListRow";
import { ArrowBigRight } from "lucide-react";
import RatingDots from "../components/RatingDots";
import { formatDate } from "../lib/utility";
import Legend from "../components/subcomponents/Legend";
import { ThreeCircles } from "react-loader-spinner";
import DashboardEmptyState from "../components/DashboardEmptyState";
import { getApiErrorMessage } from "../lib/api";
import { motion } from "motion/react";

const statusMap = {
	NOT_STARTED: {
		label: "Not Started",
		style: "text-muted py-1 px-2 bg-muted/33 border border-muted",
	},
	IN_PROGRESS: {
		label: "In Progress",
		style: "text-primary py-1 px-2 bg-primary/33 border border-primary",
	},
	COMPLETED: {
		label: "Completed",
		style: "text-success py-1 px-2 bg-success/33 border border-success",
	},
} as const;

const tierColors = [
	{ filled: "bg-danger", rating: "Beginner" },
	{ filled: "bg-secondary", rating: "Learning" },
	{ filled: "bg-primary", rating: "Confident" },
	{ filled: "bg-success", rating: "Strong" },
	{ filled: "bg-tertiary", rating: "Mastered" },
];

const DashboardPage = () => {
	const { data, isError, isLoading, error } = useGetDashboard();

	const dashboardStats = data?.data;
	const confidenceOverview = data?.data.confidenceOverview;
	const recentConcepts = data?.data.recentConcepts;
	const recentProjects = data?.data.recentProjects;
	const visibleCount = 3;
	const isEmpty = recentConcepts?.length === 0 && recentProjects?.length === 0;

	if (isLoading)
		return (
			<div className="h-dvh flex items-center justify-center">
				<ThreeCircles color="#ff8906" />
			</div>
		);
	if (isError)
		return (
			<div className="h-dvh grid place-items-center">
				<p className="text-2xl text-danger">{getApiErrorMessage(error)}</p>
			</div>
		);
	if (isEmpty) return <DashboardEmptyState />;

	return (
		<main className="min-h-dvh flex flex-col gap-10 px-3 md:px-8 pt-4 pb-16 max-w-6xl mx-auto">
			<section className="flex flex-col gap-4">
				<h1 className="text-2xl md:text-3xl text-paragraph">
					Confidence Overview
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
					<Card>
						<h4 className="text-muted text-base md:text-lg">
							Concepts Mastered
						</h4>
						<p className="text-paragraph text-lg md:text-xl">
							{`${dashboardStats?.stats.conceptsMastered.current} of ${dashboardStats?.stats.conceptsMastered.total}`}
						</p>
					</Card>
					<Card>
						<h4 className="text-muted text-base md:text-lg">
							Projects Completed
						</h4>
						<p className="text-paragraph text-lg md:text-xl">
							{dashboardStats?.stats.projectsCompleted}
						</p>
					</Card>
				</div>

				{confidenceOverview && confidenceOverview.length === 0 && (
					<p className="text-muted italic text-base md:text-lg py-8 text-center">
						Add concepts to track how your confidence grows.
					</p>
				)}
				<div className="grid sm:grid-cols-[1fr_0.2fr] gap-8 sm:gap-4">
					<div className="flex flex-col gap-4 min-w-0">
						{confidenceOverview?.map((concept, i) => {
							const rating = concept.ratings[0]?.rating ?? 0;
							const percentage = (rating / 5) * 100;
							return (
								<div key={concept.id} className="flex flex-col gap-1">
									<p className="text-sm md:text-base text-paragraph">
										{concept.name}
									</p>
									<div className="h-2 bg-border rounded-full">
										<motion.div
											initial={{ width: 0 }}
											animate={{ width: `${percentage}%` }}
											transition={{ duration: 1, delay: i * 0.02 }}
											className={`h-full rounded-full ${tierColors[rating - 1].filled}`}
										/>
									</div>
								</div>
							);
						})}
					</div>
					{confidenceOverview && confidenceOverview?.length > 0 && <Legend />}
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl md:text-3xl text-paragraph">
						Recent Concepts
					</h2>
					<NavLink
						to="/concepts"
						className="text-muted text-xs md:text-sm underline">
						View all
					</NavLink>
				</div>
				<div>
					{recentConcepts?.map((concept, i) => (
						<ListRow
							key={concept.id}
							className="grid grid-cols-3 sm:grid-cols-4"
							index={i}>
							<p className="text-sm md:text-base text-paragraph">
								{concept.name}
							</p>
							<p className="text-xs md:text-sm text-muted text-center hidden sm:block">
								{formatDate(concept.createdAt)}
							</p>
							<RatingDots rating={concept.ratings[0]?.rating ?? 0} />
							<NavLink
								to={`/concepts/${concept.id}`}
								aria-label={`View ${concept.name}`}
								className="place-self-center">
								<ArrowBigRight
									fill="#fffffe"
									className="hover:fill-primary hover:stroke-primary"
								/>
							</NavLink>
						</ListRow>
					))}
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl md:text-3xl text-paragraph">
						Recent Projects
					</h2>
					<NavLink
						to="/projects"
						className="text-muted text-xs md:text-sm underline">
						View all
					</NavLink>
				</div>
				{recentProjects && recentProjects.length > 0 ? (
					recentProjects.map((project, i) => {
						const totalLinks = project.conceptLinks.length;
						const { label, style } = statusMap[project.status];

						return (
							<ListRow
								key={project.id}
								className="grid grid-cols-3 sm:grid-cols-4"
								index={i}>
								<p className="text-sm md:text-base text-paragraph">
									{project.name}
								</p>

								<div className="hidden sm:block">
									<p className="text-xs md:text-sm text-muted">
										{project.conceptLinks
											.slice(0, visibleCount)
											.map((item) => item.concept.name)
											.join(", ")}
										{totalLinks > visibleCount && (
											<NavLink
												className="underline ml-2"
												to={`/projects/${project.id}`}>
												+{totalLinks - visibleCount} more
											</NavLink>
										)}
									</p>
								</div>

								<p className={`${style} text-sm md:text-base text-center`}>
									{label}
								</p>

								<NavLink
									to={`/projects/${project.id}`}
									className="place-self-center">
									<ArrowBigRight
										fill="#fffffe"
										className="hover:fill-primary hover:stroke-primary"
									/>
								</NavLink>
							</ListRow>
						);
					})
				) : (
					<p className="text-muted italic text-base md:text-lg text-center py-12">
						No projects added yet
					</p>
				)}
			</section>
		</main>
	);
};

export default DashboardPage;
