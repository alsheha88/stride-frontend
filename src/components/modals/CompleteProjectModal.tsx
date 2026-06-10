import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Input from "../subcomponents/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  completeProjectSchema,
  type CompleteProjectData,
} from "../../schemas/projectsSchema";
import { useCompleteProject } from "../../hooks/projects/useProjects";
import Button from "../subcomponents/Button";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { motion } from "motion/react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  linkedConcepts: {
    conceptId: string;
    name: string;
    currentRating: number | null;
  }[];
};

const tierColors = [
  { dot: "bg-danger", border: "border-danger", rating: "Beginner" },
  { dot: "bg-secondary", border: "border-secondary", rating: "Learning" },
  { dot: "bg-primary", border: "border-primary", rating: "Confident" },
  { dot: "bg-success", border: "border-success", rating: "Strong" },
  { dot: "bg-tertiary", border: "border-tertiary", rating: "Mastered" },
];

function CompleteProjectModal({
  linkedConcepts,
  isOpen,
  onClose,
  projectId,
}: ModalProps) {
  const { mutate, isPending } = useCompleteProject();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CompleteProjectData>({
    resolver: zodResolver(completeProjectSchema),
    defaultValues: {
      lessonsLearned: "",
      ratings: linkedConcepts.map((c) => ({
        conceptId: c.conceptId,
        rating: c.currentRating ?? 1,
      })),
    },
  });
  useEscapeKey(isOpen, onClose);

  const onSubmit: SubmitHandler<CompleteProjectData> = (data) => {
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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-2000 px-3 md:px-8"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="grid gap-8 md:gap-10 p-6 md:p-8 bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6 md:gap-8">
          <h3 className="text-paragraph text-xl md:text-2xl font-semibold">
            Complete Project
          </h3>

          <Controller
            name="ratings"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-6 w-full">
                {linkedConcepts.map((concept, conceptIndex) => (
                  <div key={concept.conceptId} className="flex flex-col gap-3">
                    <p className="text-sm md:text-base text-paragraph">
                      {concept.name}
                    </p>
                    <div className="w-full flex items-center justify-between gap-2">
                      {tierColors.map((tier, i) => {
                        const value = i + 1;
                        const isSelected =
                          value === field.value[conceptIndex]?.rating;

                        return (
                          <button
                            key={tier.rating}
                            onClick={() => {
                              const updated = field.value.map((r, idx) =>
                                idx === conceptIndex
                                  ? { ...r, rating: value }
                                  : r,
                              );
                              field.onChange(updated);
                            }}
                            type="button"
                            className="flex items-center gap-2 cursor-pointer flex-1 bg-transparent"
                          >
                            <span
                              className={`w-4 h-4 rounded-full border-2 ${tier.border} 
                                flex items-center justify-center transition-colors
                                ${isSelected ? "border-solid" : "border-dashed"}`}
                            >
                              {isSelected && (
                                <span
                                  className={`w-2 h-2 rounded-full ${tier.dot}`}
                                />
                              )}
                            </span>
                            <span
                              className={`text-xs transition-colors ${
                                isSelected ? "text-headline" : "text-muted"
                              }`}
                            >
                              {tier.rating}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {errors.ratings && (
                  <small className="text-danger text-xs md:text-sm">
                    {errors.ratings.message}
                  </small>
                )}
              </div>
            )}
          />

          <div className="flex flex-col gap-1">
            <Input
              type="textarea"
              text="Lessons Learnt"
              {...register("lessonsLearned")}
            />
            {errors.lessonsLearned && (
              <small className="text-danger text-xs md:text-sm">
                {errors.lessonsLearned.message}
              </small>
            )}
          </div>

          <div className="flex items-center gap-2.5 place-self-end">
            <Button
              variant="ghost"
              type="button"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isPending}>
              Mark as completed
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

export default CompleteProjectModal;