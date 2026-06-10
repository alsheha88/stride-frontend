import { zodResolver } from "@hookform/resolvers/zod";
import { useEditConcept } from "../../hooks/concepts/useConcepts";
import {
	type updateConceptData,
	updateConceptSchema,
} from "../../schemas/conceptSchema";
import { useForm, type SubmitHandler } from "react-hook-form";
import Input from "../subcomponents/Input";
import Button from "../subcomponents/Button";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { motion } from "motion/react";
import { ThreeDots } from "react-loader-spinner";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	currentName: string;
	conceptId: string;
};

function EditConceptModal({
	isOpen,
	onClose,
	currentName,
	conceptId,
}: ModalProps) {
	const { mutate, isPending } = useEditConcept();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<updateConceptData>({
		resolver: zodResolver(updateConceptSchema),
		defaultValues: {
			name: currentName,
		},
	});
	useEscapeKey(isOpen, onClose);

	const onSubmit: SubmitHandler<updateConceptData> = (data) =>
		mutate(
			{ data, id: conceptId },
			{
				onSuccess: () => {
					reset();
					onClose();
				},
			},
		);

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
					Edit Concept
				</h3>

				<div className="flex flex-col gap-1">
					<Input type="text" text="Name" {...register("name")} />
					{errors.name && (
						<small className="text-danger text-xs md:text-sm">
							{errors.name.message}
						</small>
					)}
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
						{isPending ? <ThreeDots color="#0f0e17" width={16} height={16} /> : "Edit Concept"}
						
					</Button>
				</div>
			</form>
		</motion.div>
	);
}

export default EditConceptModal;
