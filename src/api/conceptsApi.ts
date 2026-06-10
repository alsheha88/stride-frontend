import type {
    createConceptData,
    updateConceptData,
    createConceptNoteData,
    idParamsType,
    ConceptListResponse,
    ConceptDetailResponse,
} from "../schemas/conceptSchema";
import { api } from "../lib/api";

export const getConcepts = async ():Promise<ConceptListResponse> => {
	const res = await api.get("/concepts");

    return res.data
};
export const getConcept = async (id: idParamsType):Promise<ConceptDetailResponse> => {
    const res = await api.get(`/concepts/${id}`)

    return res.data
};
export const addConcept = async (data:createConceptData) => {
    const res = await api.post('/concepts', data)

    return res.data
};
export const addConceptNote = async (id: idParamsType, notes:createConceptNoteData) => {
    const res = await api.post(`/concepts/${id}/notes`, notes)

    return res.data

};
export const editConcept = async (id: idParamsType, data:updateConceptData) => {
    const res = await api.patch(`/concepts/${id}`, data)

    return res.data

};
export const deleteConcept = async (id: idParamsType) => {
     const res = await api.delete(`/concepts/${id}`)

    return res.data

};
