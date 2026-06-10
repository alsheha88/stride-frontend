import { useForm, type SubmitHandler } from "react-hook-form";
import Input from "../subcomponents/Input";
import { useEditProject } from "../../hooks/projects/useProjects";
import {
	updateProjectSchema,
	type UpdateProjectData,
} from "../../schemas/projectsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../subcomponents/Button";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { motion } from "motion/react";
import { ThreeDots } from "react-loader-spinner";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	name: string;
	description?: string;
	url?: string;
	projectId: string;
};

function EditProjectModal({
	isOpen,
	onClose,
	name,
	projectId,
	description,
	url,
}: ModalProps) {
	const { mutate, isPending } = useEditProject();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateProjectData>({
		resolver: zodResolver(updateProjectSchema),
		defaultValues: {
			name: name,
			description: description ?? "",
			evidenceUrl: url ?? "",
		},
	});
	useEscapeKey(isOpen, onClose);

	const onSubmit: SubmitHandler<UpdateProjectData> = (data) => {
		mutate(
			{ data, id: projectId },
			{
				onSuccess: () => {
					reset();
					onClose();
				},
			},
		);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			exit={{ opacity: 0 }}
			onClick={onClose}
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-2000 px-3 md:px-8">
			<form
				onClick={(e) => e.stopPropagation()}
				className="grid gap-6 md:gap-8 p-6 md:p-8 bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
				onSubmit={handleSubmit(onSubmit)}>
				<h3 className="text-paragraph text-xl md:text-2xl font-semibold">
					Edit Project
				</h3>

				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<Input type="text" text="Project Name" {...register("name")} />
						{errors.name && (
							<small className="text-danger text-xs md:text-sm">
								{errors.name.message}
							</small>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<Input
							type="textarea"
							text="Description"
							{...register("description")}
						/>
						{errors.description && (
							<small className="text-danger text-xs md:text-sm">
								{errors.description.message}
							</small>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<Input
							type="text"
							text="Project Url"
							{...register("evidenceUrl")}
						/>
						{errors.evidenceUrl && (
							<small className="text-danger text-xs md:text-sm">
								{errors.evidenceUrl.message}
							</small>
						)}
					</div>
				</div>

				<div className="flex items-center gap-2.5 place-self-end">
					<Button
						variant="ghost"
						type="button"
						onClick={onClose}
						disabled={isPending}>
						Cancel
					</Button>
					<Button variant="primary" type="submit" disabled={isPending}>
						{isPending ? <ThreeDots color="#0f0e17" width={16} height={16} /> : "Edit Project"}
					</Button>
				</div>
			</form>
		</motion.div>
	);
}

export default EditProjectModal;
