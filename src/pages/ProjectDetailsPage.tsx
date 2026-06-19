import Button from "../components/subcomponents/Button";
import RatingDots from "../components/RatingDots";
import { NavLink, useParams } from "react-router-dom";
import {
	useEditProjectLessons,
	useEditProjectStatus,
	useGetProject,
} from "../hooks/projects/useProjects";
import { ThreeCircles } from "react-loader-spinner";
import { formatDate } from "../lib/utility";
import { ArrowBigRight, Edit2 } from "lucide-react";
import ListRow from "../components/ListRow";
import EditProjectModal from "../components/modals/EditProjectModal";
import { useState } from "react";
import DeleteProjectModal from "../components/modals/DeleteProjectModal";
import CompleteProjectModal from "../components/modals/CompleteProjectModal";
import { AnimatePresence, motion } from "motion/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
	lessonsLearntSchema,
	type UpdateProjectLessonsData,
} from "../schemas/projectsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/subcomponents/Input";
import { getApiErrorMessage } from "../lib/api";

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

function ProjectDetailsPage() {
	const { id } = useParams();
	const { data, isError, isLoading } = useGetProject(id ?? "");
	const { mutate: editProjectStatus } = useEditProjectStatus();
	const {
		mutate: editProjectLessons,
		isError: isEditLessonError,
		isPending: isEditLessonPending,
		error: editLessonError,
	} = useEditProjectLessons();

	const { handleSubmit, register, reset } = useForm<UpdateProjectLessonsData>({
		resolver: zodResolver(lessonsLearntSchema),
		defaultValues: {
			lessonsLearned: data?.data.project.lessonsLearned ?? "",
		},
	});

	const [isEditOpen, setIsEditOpen] = useState(false);
	const [showLessonsForm, setShowLessonsForm] = useState(false);
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

	const handleClick = () => {
		editProjectStatus({ id, data: { status: "IN_PROGRESS" } });
	};

	const handleCancel = () => {
		setShowLessonsForm(false);
	};

	const onSubmit: SubmitHandler<UpdateProjectLessonsData> = (
		lessonsLearned,
	) => {
		editProjectLessons(
			{ id: project.id, data: lessonsLearned },
			{
				onSuccess: () => {
					reset();
					setShowLessonsForm(false);
				},
			},
		);
	};

	return (
		<main className="min-h-dvh px-3 pt-4 pb-10 max-w-6xl mx-auto">
			<div className="w-full grid items-start gap-10 border border-border bg-surface/25 rounded-lg px-4 py-8 shadow-lg shadow-black/40 h-full">
				<div className="flex items-center justify-between">
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

				<div className="flex items-center gap-6 flex-wrap">
					<p className="flex items-center gap-1 font-semibold">
						<span className="text-paragraph font-medium">Created At:</span>{" "}
						{formatDate(project.createdAt)}
					</p>
					<p className="flex items-center gap-1 font-semibold">
						<span className="text-paragraph font-medium">Status:</span>{" "}
						{project.status === "NOT_STARTED" ? (
							<button
								className={`${statusMap[project.status].style} cursor-pointer hover:bg-surface hover:text-paragraph`}
								onClick={handleClick}>
								Start Project
							</button>
						) : (
							<span className={`${statusMap[project.status].style}`}>
								{statusMap[project.status].label}
							</span>
						)}
					</p>
					{isCompleted && project.completedAt && (
						<p className="flex items-center gap-1 font-semibold">
							<span className="text-paragraph font-medium">Completed At:</span>{" "}
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
						<p className="text-muted text-lg italic">No description provided</p>
					)}
				</div>

				<div className="flex flex-col gap-4">
					<h4 className="text-muted sm:text-xl text-lg font-semibold">
						Project URL
					</h4>
					{project.evidenceUrl ? (
						<a href={project.evidenceUrl} className="text-paragraph underline">
							{project.evidenceUrl}
						</a>
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
										aria-label={`View ${link.concept.name}`}
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
						<div className="flex items-center justify-between">
							<h4 className="text-muted sm:text-xl text-lg font-semibold">
								Lessons Learnt
							</h4>
							{!showLessonsForm && (
								<button
									type="button"
									className="cursor-pointer"
									aria-label="Edit lessons learned"
									onClick={() => setShowLessonsForm(true)}>
									<Edit2
										size={20}
										className="hover:stroke-primary-hover stroke-paragraph"
									/>
								</button>
							)}
						</div>

						{showLessonsForm ? (
							<motion.form
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.2 }}
								className="flex flex-col gap-2"
								onSubmit={handleSubmit(onSubmit)}>
								<Input
									type="textarea"
									placeholder="Lessons learned"
									{...register("lessonsLearned")}
								/>
								{isEditLessonError && (
									<p className="text-danger text-xs md:text-sm">
										{getApiErrorMessage(editLessonError)}
									</p>
								)}
								<div className="flex items-center gap-2 place-self-start">
									<Button
										type="submit"
										variant="secondary"
										disabled={isEditLessonPending}>
										Save
									</Button>
									<Button
										type="button"
										variant="ghost"
										onClick={handleCancel}
										disabled={isEditLessonPending}>
										Cancel
									</Button>
								</div>
							</motion.form>
						) : project.lessonsLearned ? (
							<p className="text-paragraph text-lg">{project.lessonsLearned}</p>
						) : (
							<p className="text-muted italic">No lessons recorded</p>
						)}
					</div>
				)}

				<div className="w-full flex justify-end items-center gap-2">
					{!isCompleted && (
						<Button
							onClick={() => setIsCompleteOpen(true)}
							variant="primary"
							type="button">
							Mark as completed
						</Button>
					)}
					<Button
						variant="danger"
						type="button"
						onClick={() => setIsDeleteOpen(true)}>
						Delete Project
					</Button>
				</div>
			</div>

			<AnimatePresence>
				{isEditOpen && (
					<EditProjectModal
						isOpen={isEditOpen}
						onClose={() => setIsEditOpen(false)}
						name={project.name}
						description={project.description ?? undefined}
						url={project.evidenceUrl ?? undefined}
						projectId={project.id}
					/>
				)}
				{isDeleteOpen && (
					<DeleteProjectModal
						isOpen={isDeleteOpen}
						onClose={() => setIsDeleteOpen(false)}
						projectId={project.id}
						projectName={project.name}
					/>
				)}
				{isCompleteOpen && (
					<CompleteProjectModal
						isOpen={isCompleteOpen}
						onClose={() => setIsCompleteOpen(false)}
						projectId={project.id}
						linkedConcepts={linkedConcepts}
					/>
				)}
			</AnimatePresence>
		</main>
	);
}

export default ProjectDetailsPage;
