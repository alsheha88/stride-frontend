import { Controller, useForm, type SubmitHandler } from "react-hook-form";
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

type AddProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
  const { mutate: addProject, isPending } = useAddProject();

  const { register, handleSubmit, reset, control } = useForm<CreateProjectData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      evidenceUrl: "",
      conceptLinks: [],
    },
  });
  useEscapeKey(isOpen, onClose);

  const onSubmit: SubmitHandler<CreateProjectData> = (data) => {
    addProject(data, {
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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-2000 px-3 md:px-8"
    >
      <form
        className="grid gap-8 md:gap-10 p-6 md:p-8 bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-paragraph text-xl md:text-2xl font-semibold">
          Add Project
        </h3>

        <div className="flex flex-col gap-4">
          <Input type="text" text="Project Name" {...register("name")} />
          <Input
            type="textarea"
            text="Description"
            {...register("description")}
          />
          <Input type="text" text="Project Url" {...register("evidenceUrl")} />

          <div className="flex flex-col gap-2">
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
          </div>
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
            Add Project
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

export default AddProjectModal;