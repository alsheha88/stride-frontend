import { z } from "zod";

const conceptLinkSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("existing"),
		conceptId: z.uuid(),
	}),
	z.object({
		type: z.literal("new"),
		name: z.string().min(1).max(100),
		initialRating: z.number().int().min(1).max(5),
	}),
]);

export const createProjectSchema = z.object({
	name: z.string().min(1, "Name field cannot be empty"),
	description: z.string().max(500).optional(),
	evidenceUrl: z.string().optional(),
	conceptLinks: z.array(conceptLinkSchema),
});
export const updateProjectSchema = z.object({
  name: z.string().min(1, "Name field cannot be empty"),
  description: z.string().max(500).optional(),
  evidenceUrl: z.string().optional(),
});

export const completeProjectSchema = z.object({
	lessonsLearned: z.string().min(1).max(2000),
	ratings: z
		.array(
			z.object({
				conceptId: z.uuid(),
				rating: z.number().int().min(1).max(5),
			}),
		)
		.min(1, "Must provide ratings for all linked concepts"),
});

type ConceptInProjectLink = {
	id: string;
	name: string;
	ratings: { rating: number; createdAt: string }[];
};

type ProjectConceptLink = {
	projectId: string;
	conceptId: string;
	ratingAtCompletion: number | null;
	concept: ConceptInProjectLink;
};

type Project = {
	id: string;
	name: string;
	description: string | null;
	evidenceUrl: string | null;
	status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
	lessonsLearned: string | null;
	createdAt: string;
	completedAt: string | null;
	userId: string;
};

// Then for list (no concept ratings needed):
type ProjectListConceptLink = {
	projectId: string;
	conceptId: string;
	ratingAtCompletion: number | null;
	concept: { id: string; name: string };
};

export type ProjectListResponse = {
	data: {
		projects: (Project & { conceptLinks: ProjectListConceptLink[] })[];
	};
};

// For detail (with concept ratings):
export type ProjectDetailResponse = {
	data: {
		project: Project & { conceptLinks: ProjectConceptLink[] };
	};
};

export type CreateProjectData = z.infer<typeof createProjectSchema>;
export type UpdateProjectData = z.infer<typeof updateProjectSchema>;
export type CompleteProjectData = z.infer<typeof completeProjectSchema>;
