import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
	addConcept,
	addConceptNote,
	getConcept,
	getConcepts,
	editConcept,
	deleteConcept,
} from "../../api/conceptsApi";
import {
	type createConceptNoteData,
	type idParamsType,
	type updateConceptData,
} from "../../schemas/conceptSchema";

type AddNoteVariables = {
	id: idParamsType;
	note: createConceptNoteData;
};
type EditConceptVariables = {
	id: idParamsType;
	data: updateConceptData;
};

export const useGetConcepts = () => {
	return useQuery({
		queryKey: ["concepts"],
		queryFn: getConcepts,
	});
};
export const useGetConcept = (id: idParamsType) => {
	return useQuery({
		queryKey: ["concept", id],
		queryFn: () => getConcept(id),
		enabled: !!id,
	});
};
export const useAddConcept = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addConcept,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["concepts"] }),
	});
};
export const useAddConceptNote = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, Error, AddNoteVariables>({
		mutationFn: ({ id, note }) => addConceptNote(id, note),
		onSuccess: (_data, variables) =>
			queryClient.invalidateQueries({ queryKey: ["concept", variables.id] }),
	});
};
export const useEditConcept = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, Error, EditConceptVariables>({
		mutationFn: ({ id, data }) => editConcept(id, data),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["concept", variables.id] });
			queryClient.invalidateQueries({ queryKey: ["concepts"] });
		},
	});
};
export const useDeleteConcept = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: deleteConcept,
		onSuccess: (_data, deletedId) => {
			queryClient.invalidateQueries({ queryKey: ["concepts"] });
			queryClient.removeQueries({ queryKey: ["concept", deletedId] });
			navigate("/concepts");
		},
	});
};
