import { motion } from "motion/react";
import { useDeleteProject } from "../../hooks/projects/useProjects";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import Button from "../subcomponents/Button";
import { ThreeDots } from "react-loader-spinner";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	projectId: string;
	projectName: string;
};

function DeleteProjectModal({
	isOpen,
	onClose,
	projectId,
	projectName,
}: ModalProps) {
	const { mutate: deleteProject, isPending } = useDeleteProject();
	useEscapeKey(isOpen, onClose);

	const handleDelete = () => {
		deleteProject(projectId, {
			onSuccess: () => {
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
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-2000 px-3 md:px-8">
			<div
				onClick={(e) => e.stopPropagation()}
				className="grid gap-6 md:gap-8 p-6 md:p-8 bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
				<h3 className="text-paragraph text-xl md:text-2xl font-semibold">
					Delete Project
				</h3>

				<p className="text-paragraph text-sm md:text-base">
					Are you sure you want to delete{" "}
					<span className="font-semibold">{projectName}</span>? This will also
					remove all its concept links and lessons learned. This action cannot
					be undone.
				</p>

				<div className="flex items-center gap-2.5 place-self-end">
					<Button
						variant="ghost"
						type="button"
						onClick={onClose}
						disabled={isPending}>
						Cancel
					</Button>
					<Button
						variant="danger"
						type="button"
						onClick={handleDelete}
						disabled={isPending}>
						{isPending ? <ThreeDots color="#fffffe" width={16} height={16} /> : "Edit Project"}
					</Button>
				</div>
			</div>
		</motion.div>
	);
}

export default DeleteProjectModal;
