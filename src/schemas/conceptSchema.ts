import { z } from "zod";

export const createConceptSchema = z.object({
  name: z.string().min(1, "Name field cannot be empty"),
  rating: z.number().int().min(1, "Please pick a rating").max(5),
});

export const updateConceptSchema = z.object({
  name: z.string().min(1, "Name field cannot be empty"),
});

export const idParamsSchema = z.string().uuid();

export const createConceptNoteSchema = z.object({
  note: z.string().min(1, "Note field cannot be empty").max(280),
});

// ----- Shared types -----

type Concept = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  ratings: { rating: number; createdAt: string }[];
};

type Rating = {
  id: string;
  rating: number;
  createdAt: string;
  conceptId: string;
};

type ConceptNote = {
  id: string;
  content: string;
  createdAt: string;
  conceptId: string;
};

type LinkedProject = {
  projectId: string;
  conceptId: string;
  ratingAtCompletion: number | null;
  project: {
    id: string;
    name: string;
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
    completedAt: string | null;
  };
};

// ----- Response types -----

export type ConceptListResponse = {
  data: { concepts: Concept[] };
};

export type ConceptDetailResponse = {
  data: {
    concept: Concept & {
      ratings: Rating[]; // overrides the lighter ratings shape for full detail
      notes: ConceptNote[];
      projectLinks: LinkedProject[];
    };
  };
};

// ----- Form data types -----

export type createConceptData = z.infer<typeof createConceptSchema>;
export type idParamsType = z.infer<typeof idParamsSchema>;
export type updateConceptData = z.infer<typeof updateConceptSchema>;
export type createConceptNoteData = z.infer<typeof createConceptNoteSchema>;