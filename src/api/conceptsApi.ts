import {
	type CreateConceptData,
	type UpdateConceptData,
	type CreateConceptNoteData,
	type IdParamsType,
	type ConceptListResponse,
	type ConceptDetailResponse,
	type EditConceptNoteData,
} from "../schemas/conceptSchema";
import { api } from "../lib/api";

export const getConcepts = async (): Promise<ConceptListResponse> => {
	const res = await api.get("/concepts");
	return res.data;
};

export const getConcept = async (id: IdParamsType): Promise<ConceptDetailResponse> => {
	const res = await api.get(`/concepts/${id}`);
	return res.data;
};

export const addConcept = async (data: CreateConceptData) => {
	const res = await api.post("/concepts", data);
	return res.data;
};

export const addConceptNote = async ({
	id,
	data,
}: {
	id: IdParamsType;
	data: CreateConceptNoteData;
}) => {
	const res = await api.post(`/concepts/${id}/notes`, data);
	return res.data;
};

export const editConcept = async ({
	id,
	data,
}: {
	id: IdParamsType;
	data: UpdateConceptData;
}) => {
	const res = await api.patch(`/concepts/${id}`, data);
	return res.data;
};

export const editConceptNote = async ({
	id,
	noteId,
	data,
}: {
	id: IdParamsType;
	noteId: IdParamsType;
	data: EditConceptNoteData;
}) => {
	const res = await api.patch(`/concepts/${id}/notes/${noteId}`, data);
	return res.data;
};

export const deleteConceptNote = async ({
	id,
	noteId,
}: {
	id: IdParamsType;
	noteId: IdParamsType;
}) => {
	await api.delete(`/concepts/${id}/notes/${noteId}`);
};

export const deleteConcept = async (id: IdParamsType) => {
	const res = await api.delete(`/concepts/${id}`);
	return res.data;
};