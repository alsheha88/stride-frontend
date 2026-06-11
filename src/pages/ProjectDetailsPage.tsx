import Card from "../components/subcomponents/Card";
import Button from "../components/subcomponents/Button";
import RatingDots from "../components/RatingDots";
import { NavLink, useParams } from "react-router-dom";
import { useGetProject } from "../hooks/projects/useProjects";
import { ThreeCircles } from "react-loader-spinner";
import { formatDate } from "../lib/utility";
import { ArrowBigRight } from "lucide-react";
import ListRow from "../components/ListRow";
import EditProjectModal from "../components/modals/EditProjectModal";
import { useState } from "react";
import DeleteProjectModal from "../components/modals/DeleteProjectModal";
import CompleteProjectModal from "../components/modals/CompleteProjectModal";
import { AnimatePresence } from "motion/react";

const statusMap = {
	NOT_STARTED: { label: "Not Started", style: "text-muted" },
	IN_PROGRESS: { label: "In Progress", style: "text-primary" },
	COMPLETED: { label: "Completed", style: "text-success" },
} as const;

function ProjectDetailsPage() {
	const { id } = useParams();
	const { data, isError, isLoading } = useGetProject(id ?? "");
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [isCompleteOpen, setIsCompleteOpen] = useState(false);

	if (isLoading)
		return (
			<div className="h-dvh flex items-center justify-center">
				<ThreeCircles color="#ff8906" />
			</div>
		);

	if (isError)
		return (
			<div className="h-dvh grid place-items-center">
				<p className="text-2xl text-danger">Something went wrong</p>
			</div>
		);

	if (!id || !data?.data.project)
		return <div className="text-danger">Page Not Found</div>;

	const project = data.data.project;

	const linkedConcepts = project.conceptLinks.map((item) => ({
		conceptId: item.conceptId,
		name: item.concept.name,
		currentRating: item.concept.ratings[0]?.rating ?? null,
	}));

	const isCompleted = project.status === "COMPLETED";

	return (
		<main className="min-h-dvh flex px-3 pt-4 pb-10 max-w-6xl mx-auto">
			<Card>
				<div className="grid gap-10 h-full">
					<div className="flex items-center justify-between pb-8">
						<h3 className="text-paragraph sm:text-2xl text-xl font-semibold">
							{project.name}
						</h3>
						<Button
							variant="primary"
							type="button"
							onClick={() => setIsEditOpen(true)}>
							Edit Project
						</Button>
					</div>

					<div className="flex items-center gap-4 justify-between flex-wrap">
						<p className="flex items-center gap-1 font-semibold">
							<span className="text-paragraph font-medium">Created At:</span>{" "}
							{formatDate(project.createdAt)}
						</p>
						<p
							className={`flex items-center gap-1 font-semibold ${statusMap[project.status].style}`}>
							<span className="text-paragraph font-medium">Status:</span>{" "}
							{statusMap[project.status].label}
						</p>
						{isCompleted && project.completedAt && (
							<p className="flex items-center gap-1 font-semibold">
								<span className="text-paragraph font-medium">
									Completed At:
								</span>{" "}
								{formatDate(project.completedAt)}
							</p>
						)}
					</div>

					<div className="flex flex-col gap-4">
						<h4 className="text-muted sm:text-xl text-lg font-semibold">
							Description
						</h4>
						{project.description ? (
							<p className="text-paragraph text-lg">{project.description}</p>
						) : (
							<p className="text-muted text-lg italic">
								No description provided
							</p>
						)}
					</div>

					<div className="flex flex-col gap-4">
						<h4 className="text-muted sm:text-xl text-lg font-semibold">
							Project URL
						</h4>
						{project.evidenceUrl ? (
							<a href={project.evidenceUrl} className="text-paragraph">{project.evidenceUrl}</a>
						) : (
							<p className="text-muted italic">No project link provided</p>
						)}
					</div>

					<div className="flex flex-col gap-4">
						<h4 className="text-muted sm:text-xl text-lg font-semibold">
							Linked Concepts
						</h4>
						{project.conceptLinks.length > 0 ? (
							project.conceptLinks.map((link, i) => {
								const ratingToShow = isCompleted
									? link.ratingAtCompletion
									: link.concept.ratings[0]?.rating;
								return (
									<ListRow
										key={link.concept.id}
										className="grid grid-cols-3"
										index={i}>
										<p className="md:text-lg text-sm font-normal">
											{link.concept.name}
										</p>
										<RatingDots rating={ratingToShow ?? 0} />
										<NavLink
											to={`/concepts/${link.concept.id}`}
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
							<p className="text-muted italic">
								No concepts linked to this project
							</p>
						)}
					</div>

					{isCompleted && (
						<div className="flex flex-col gap-4">
							<h4 className="text-muted sm:text-xl text-lg font-semibold">
								Lessons Learnt
							</h4>
							{project.lessonsLearned ? (
								<p className="text-paragraph text-lg">
									{project.lessonsLearned}
								</p>
							) : (
								<p className="text-muted italic">No lessons recorded</p>
							)}
						</div>
					)}

					<div className="w-full flex justify-between items-center">
						{!isCompleted ? (
							<Button
								onClick={() => setIsCompleteOpen(true)}
								variant="primary"
								type="button">
								Mark as completed
							</Button>
						) : (
							<div />
						)}
						<Button
							variant="danger"
							type="button"
							onClick={() => setIsDeleteOpen(true)}>
							Delete Project
						</Button>
					</div>
				</div>
			</Card>

			<AnimatePresence>
				{isEditOpen && <EditProjectModal
					isOpen={isEditOpen}
					onClose={() => setIsEditOpen(false)}
					name={project.name}
					description={project.description ?? undefined}
					url={project.evidenceUrl ?? undefined}
					projectId={project.id}
				/>}
				{isDeleteOpen && <DeleteProjectModal
					isOpen={isDeleteOpen}
					onClose={() => setIsDeleteOpen(false)}
					projectId={project.id}
					projectName={project.name}
				/>}
				{isCompleteOpen && <CompleteProjectModal
					isOpen={isCompleteOpen}
					onClose={() => setIsCompleteOpen(false)}
					projectId={project.id}
					linkedConcepts={linkedConcepts}
				/>}
			</AnimatePresence>
		</main>
	);
}

export default ProjectDetailsPage;
