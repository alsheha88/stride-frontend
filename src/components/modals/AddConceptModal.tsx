import Input from "../subcomponents/Input";
import Button from "../subcomponents/Button";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddConcept } from "../../hooks/concepts/useConcepts";
import {
	createConceptSchema,
	type createConceptData,
} from "../../schemas/conceptSchema";
import { getApiErrorMessage } from "../../lib/api";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { motion } from "motion/react";
import { ThreeDots } from "react-loader-spinner";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const tierColors = [
	{ dot: "bg-danger", border: "border-danger", rating: "Beginner" },
	{ dot: "bg-secondary", border: "border-secondary", rating: "Learning" },
	{ dot: "bg-primary", border: "border-primary", rating: "Confident" },
	{ dot: "bg-success", border: "border-success", rating: "Strong" },
	{ dot: "bg-tertiary", border: "border-tertiary", rating: "Mastered" },
];

const AddConceptModal = ({ isOpen, onClose }: ModalProps) => {
	const { mutate: addConcept, isError, error, isPending } = useAddConcept();
	useEscapeKey(isOpen, onClose);

	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm<createConceptData>({
		resolver: zodResolver(createConceptSchema),
	});

	const onSubmit: SubmitHandler<createConceptData> = (data) => {
		addConcept(data, {
			onSuccess: () => {
				reset();
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
			<form
				className="grid gap-8 md:gap-10 p-6 md:p-8 bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
				onSubmit={handleSubmit(onSubmit)}
				onClick={(e) => e.stopPropagation()}>
				<h3 className="text-paragraph text-xl md:text-2xl font-semibold">
					Add Concept
				</h3>

				{isError && (
					<p className="text-danger text-xs md:text-sm text-center">
						{getApiErrorMessage(error)}
					</p>
				)}

				<div className="flex flex-col gap-2">
					<Input
						type="text"
						text="Concept"
						placeholder="ex. React Router, JWT Auth etc."
						{...register("name")}
					/>
					{errors.name && (
						<small className="text-danger text-xs md:text-sm">
							{errors.name.message}
						</small>
					)}
				</div>

				<div className="flex flex-col gap-3 w-full">
					<p className="text-sm md:text-base text-paragraph">Rating</p>

					<Controller
						name="rating"
						control={control}
						render={({ field }) => (
							<div className="flex items-center justify-between gap-2">
								{tierColors.map((item, i) => {
									const value = i + 1;
									const isSelected = field.value === value;

									return (
										<button
											key={item.rating}
											type="button"
											onClick={() => field.onChange(value)}
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
						)}
					/>
					{errors.rating && (
						<small className="text-danger text-xs md:text-sm">
							{errors.rating.message}
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
						{isPending ? <ThreeDots color="#0f0e17" /> : "Add Concept"}
					</Button>
				</div>
			</form>
		</motion.div>
	);
};

export default AddConceptModal;
