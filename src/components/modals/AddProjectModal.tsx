import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useAddProject } from "../../hooks/projects/useProjects";
import Button from "../subcomponents/Button";
import Input from "../subcomponents/Input";
import {
	createProjectSchema,
	type CreateProjectData,
} from "../../schemas/projectsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ConceptPicker from "../ConceptPicker";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { motion } from "motion/react";
import { ThreeDots } from "react-loader-spinner";

type AddProjectModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
	const { mutate: addProject, isPending } = useAddProject();
	const [step, setStep] = useState(1);

	const {
		register,
		handleSubmit,
		reset,
		control,
		trigger,
		formState: { errors },
	} = useForm<CreateProjectData>({
		resolver: zodResolver(createProjectSchema),
		defaultValues: {
			name: "",
			description: "",
			evidenceUrl: "",
			conceptLinks: [],
		},
	});
	useEscapeKey(isOpen, onClose);

	const handleNext = async () => {
		const isValid = await trigger(["name", "description", "evidenceUrl"]);
		if (isValid) setStep(2);
	};

	const onSubmit: SubmitHandler<CreateProjectData> = (data) => {
		if (step !== 2) return;
		addProject(data, {
			onSuccess: () => {
				reset();
				setStep(1);
				onClose();
			},
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			exit={{ opacity: 0 }}
			onClick={onClose}
			className="fixed inset-0 bg-black/50 flex items-start md:items-center justify-center z-2000 px-3 md:px-8 py-8 overflow-y-auto">
			<form
				className="grid gap-6 md:gap-8 p-6 md:p-8 bg-surface border border-border rounded-lg w-full max-w-md"
				onSubmit={handleSubmit(onSubmit)}
				onKeyDown={(e) => {
					if (e.key === "Enter" && step === 1) {
						e.preventDefault();
					}
				}}
				onClick={(e) => e.stopPropagation()}>
				<div className="flex items-center justify-between">
					<h3 className="text-paragraph text-xl md:text-2xl font-semibold">
						Add Project
					</h3>
					<span className="text-muted text-xs md:text-sm">
						Step {step} of 2
					</span>
				</div>

				{step === 1 && (
					<motion.div
						className="flex flex-col gap-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}>
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
					</motion.div>
				)}

				{step === 2 && (
					<motion.div
						className="flex flex-col gap-2"
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3 }}>
						<p className="text-sm md:text-base text-paragraph">
							Linked Concepts
						</p>
						<Controller
							name="conceptLinks"
							control={control}
							render={({ field }) => (
								<ConceptPicker value={field.value} onChange={field.onChange} />
							)}
						/>
					</motion.div>
				)}

				<div className="flex items-center gap-2.5 place-self-end">
					{step === 1 ? (
						<>
							<Button
								variant="ghost"
								type="button"
								onClick={onClose}
								disabled={isPending}>
								Cancel
							</Button>
							<button
								type="button"
								className="bg-primary flex items-center justify-center font-bold gap-1.5 min-w-20 md:min-w-24 px-4 md:px-6 py-2 md:py-3 text-center text-sm disabled:cursor-not-allowed rounded-lg cursor-pointer "
								onClick={handleNext}>
								Next
							</button>
						</>
					) : (
						<>
							<Button
								variant="ghost"
								type="button"
								onClick={() => setStep(1)}
								disabled={isPending}>
								Back
							</Button>
							<Button variant="primary" type="submit" disabled={isPending}>
								{isPending ? (
									<ThreeDots color="#0f0e17" width={16} height={16} />
								) : (
									"Add Project"
								)}
							</Button>
						</>
					)}
				</div>
			</form>
		</motion.div>
	);
}

export default AddProjectModal;
