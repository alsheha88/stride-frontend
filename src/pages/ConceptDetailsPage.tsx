import { NavLink, useParams } from "react-router-dom";
import {
	useAddConceptNote,
	useDeleteConceptNote,
	useEditConceptNote,
	useGetConcept,
} from "../hooks/concepts/useConcepts";
import Button from "../components/subcomponents/Button";
import { formatDate } from "../lib/utility";
import ListRow from "../components/ListRow";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { ThreeCircles } from "react-loader-spinner";
import { ArrowBigRight, Trash, Edit2 } from "lucide-react";
import Input from "../components/subcomponents/Input";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
	createConceptNoteSchema,
	editConceptNoteSchema,
	type ConceptNote,
	type CreateConceptNoteData,
	type EditConceptNoteData,
} from "../schemas/conceptSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getApiErrorMessage } from "../lib/api";
import EditConceptModal from "../components/modals/EditConceptModal";
import DeleteConceptModal from "../components/modals/DeleteConceptModal";
import { AnimatePresence, motion } from "motion/react";
import CustomTooltip from "../components/subcomponents/CustomToolTip";

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
	{
		border: "border-danger",
		color: "bg-danger/33",
		filled: "text-danger",
		rating: "Beginner",
	},
	{
		border: "border-secondary",
		color: "bg-secondary/33",
		filled: "text-secondary",
		rating: "Learning",
	},
	{
		border: "border-primary",
		color: "bg-primary/33",
		filled: "text-primary",
		rating: "Confident",
	},
	{
		border: "border-success",
		color: "bg-success/33",
		filled: "text-success",
		rating: "Strong",
	},
	{
		border: "border-tertiary",
		color: "bg-tertiary/33",
		filled: "text-tertiary",
		rating: "Mastered",
	},
];

const ConceptDetailPage = () => {
	const { id } = useParams();
	const { data, isError, isLoading } = useGetConcept(id ?? "");
	const [showNoteForm, setShowNoteForm] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

	const {
		mutate: addConceptNote,
		isError: isAddNoteError,
		error: addNoteError,
		isPending: isAddNotePending,
	} = useAddConceptNote();
	const {
		mutate: editConceptNote,
		isError: isEditNoteError,
		isPending: isEditNotePending,
		error: editNoteError,
	} = useEditConceptNote();
	const { mutate: deleteConceptNote } = useDeleteConceptNote();

	const { handleSubmit, register, reset } = useForm<CreateConceptNoteData>({
		resolver: zodResolver(createConceptNoteSchema),
	});
	const {
		handleSubmit: handleEdit,
		register: record,
		reset: resetEdit,
	} = useForm<EditConceptNoteData>({
		resolver: zodResolver(editConceptNoteSchema),
	});

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

	if (!id || !data?.data.concept)
		return <div className="text-danger">Page Not Found</div>;

	const concept = data.data.concept;
	const latestRating = concept.ratings[concept.ratings.length - 1]?.rating;
	const tier = latestRating ? tierColors[latestRating - 1] : null;

	const onSubmit: SubmitHandler<CreateConceptNoteData> = (note) => {
		addConceptNote(
			{ id: concept.id, data: note },
			{
				onSuccess: () => {
					reset();
					setShowNoteForm(false);
				},
			},
		);
	};

	const onEdit: SubmitHandler<EditConceptNoteData> = (note) => {
		editConceptNote(
			{
				id: concept.id,
				data: { note: note.note },
				noteId: editingNoteId!,
			},
			{
				onSuccess: () => {
					resetEdit();
					setEditingNoteId(null);
				},
			},
		);
	};

	const handleCancel = () => {
		reset();
		setShowNoteForm(false);
		setEditingNoteId(null);
	};

	const handleEditClick = (note: ConceptNote) => {
		setEditingNoteId(note.id);
		resetEdit({ note: note.content });
	};

	return (
		<main className="min-h-dvh px-3 md:px-8 pt-4 pb-16 max-w-6xl mx-auto">
			<div className="w-full grid items-start gap-10 border border-border bg-surface/25 rounded-lg px-4 py-8 shadow-lg shadow-black/40 h-full">
				<div className="flex items-center justify-between">
					<h1 className="text-paragraph text-xl md:text-3xl">
						{concept.name}
					</h1>
					<Button
						variant="primary"
						type="button"
						onClick={() => setIsEditOpen(true)}>
						Edit Concept
					</Button>
				</div>

				<div className="flex items-center gap-6 flex-wrap">
					<p className="flex items-center gap-1 text-sm md:text-base">
						<span className="text-muted">Created At:</span>{" "}
						<span className="text-paragraph">
							{formatDate(concept.createdAt)}
						</span>
					</p>
					<p className="flex items-center gap-1 text-sm md:text-base">
						<span className="text-muted">Rating:</span>{" "}
						<span
							className={
								tier?.filled
									? `${tier.filled} ${tier.color} border ${tier.border} rounded-xs py-1 px-2`
									: "text-paragraph"
							}>
							{tier?.rating ?? "—"}
						</span>
					</p>
					<p className="flex items-center gap-1 text-sm md:text-base">
						<span className="text-muted">Last Updated:</span>{" "}
						<span className="text-paragraph">
							{formatDate(concept.updatedAt)}
						</span>
					</p>
				</div>

				{concept.projectLinks.length > 0 && (
					<div className="flex flex-col gap-4">
						<h4 className="text-muted sm:text-xl text-lg font-semibold">
							Linked Projects
						</h4>
						{concept.projectLinks.map((project) => (
							<ListRow key={project.projectId} className="grid grid-cols-3">
								<p className="text-paragraph text-sm md:text-base">
									{project.project.name}
								</p>
								<p
									className={`${statusMap[project.project.status].style} text-sm md:text-base`}>
									{statusMap[project.project.status].label}
								</p>
								<NavLink
									to={`/projects/${project.projectId}`}
									aria-label={`View ${project.project.name}`}
									className="place-self-center">
									<ArrowBigRight
										fill="#fffffe"
										className="hover:fill-primary hover:stroke-primary"
									/>
								</NavLink>
							</ListRow>
						))}
					</div>
				)}

				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<h4 className="text-muted sm:text-xl text-lg font-semibold">
							Notes
						</h4>
						{!showNoteForm && (
							<Button
								type="button"
								variant="secondary"
								onClick={() => setShowNoteForm(true)}>
								+ Add Note
							</Button>
						)}
					</div>

					{concept.notes.length > 0 ? (
						<ol className="text-paragraph text-sm md:text-base list-decimal mx-4">
							{concept.notes.map((note) => (
								<li
									key={note.id}
									className="leading-loose flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 group">
									<span className="flex-1">{note.content}</span>
									<div className="flex items-center gap-1 self-end sm:self-start opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
										<button
											type="button"
											className="cursor-pointer p-3 -m-3"
											aria-label="Edit note"
											onClick={() => handleEditClick(note)}>
											<Edit2 size={16} className="hover:stroke-primary-hover" />
										</button>
										<button
											type="button"
											className="cursor-pointer p-3 -m-3"
											aria-label="Delete note"
											onClick={() =>
												deleteConceptNote({ id: concept.id, noteId: note.id })
											}>
											<Trash size={16} className="hover:stroke-danger" />
										</button>
									</div>
								</li>
							))}
						</ol>
					) : (
						!showNoteForm && (
							<p className="text-muted italic text-base md:text-lg">
								No notes added yet
							</p>
						)
					)}

					{showNoteForm && (
						<motion.form
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
							className="flex flex-col gap-2"
							onSubmit={handleSubmit(onSubmit)}>
							<Input type="textarea" placeholder="Note" {...register("note")} />
							{isAddNoteError && (
								<p className="text-danger text-xs md:text-sm">
									{getApiErrorMessage(addNoteError)}
								</p>
							)}
							<div className="flex items-center gap-2 place-self-start">
								<Button
									type="submit"
									variant="secondary"
									disabled={isAddNotePending}>
									Add
								</Button>
								<Button
									type="button"
									variant="ghost"
									onClick={handleCancel}
									disabled={isAddNotePending}>
									Cancel
								</Button>
							</div>
						</motion.form>
					)}
					{editingNoteId && (
						<motion.form
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
							className="flex flex-col gap-2"
							onSubmit={handleEdit(onEdit)}>
							<Input type="textarea" placeholder="Note" {...record("note")} />
							{isEditNoteError && (
								<p className="text-danger text-xs md:text-sm">
									{getApiErrorMessage(editNoteError)}
								</p>
							)}
							<div className="flex items-center gap-2 place-self-start">
								<Button
									type="submit"
									variant="secondary"
									disabled={isEditNotePending}>
									Edit
								</Button>
								<Button
									type="button"
									variant="ghost"
									onClick={handleCancel}
									disabled={isEditNotePending}>
									Cancel
								</Button>
							</div>
						</motion.form>
					)}
				</div>

				<div className="pb-4">
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={concept.ratings}>
							<CartesianGrid stroke="#6b6a78" strokeDasharray="5 5" />
							<XAxis
								dataKey="createdAt"
								tickFormatter={(d) =>
									new Date(d).toLocaleDateString("en-GB", {
										day: "numeric",
										month: "short",
										year: "2-digit",
									})
								}
								stroke="#6b6a78"
								tickMargin={5}
							/>
							<YAxis
								stroke="#6b6a78"
								label={{
									value: "Rating",
									position: "insideLeft",
									angle: -90,
									stroke: "#6b6a78",
								}}
								domain={[0, 5]}
								ticks={[1, 2, 3, 4, 5]}
							/>
							<Tooltip
								content={<CustomTooltip />}
								cursor={{ stroke: "#6b6a78", strokeDasharray: "5 5" }}
							/>
							<Line
								type="monotone"
								dataKey="rating"
								stroke="#ff8906"
								strokeWidth={2}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				<div className="w-full flex justify-end">
					<Button
						variant="danger"
						type="button"
						onClick={() => setIsOpen(true)}>
						Delete Concept
					</Button>
				</div>
			</div>

			<AnimatePresence>
				{isEditOpen && (
					<EditConceptModal
						isOpen={isEditOpen}
						onClose={() => setIsEditOpen(false)}
						currentName={concept.name}
						conceptId={concept.id}
					/>
				)}
				{isOpen && (
					<DeleteConceptModal
						isOpen={isOpen}
						onClose={() => setIsOpen(false)}
						conceptId={concept.id}
						conceptName={concept.name}
					/>
				)}
			</AnimatePresence>
		</main>
	);
};

export default ConceptDetailPage;
