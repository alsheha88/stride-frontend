import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
	addConcept,
	addConceptNote,
	getConcept,
	getConcepts,
	editConcept,
	deleteConcept,
	editConceptNote,
	deleteConceptNote,
} from "../../api/conceptsApi";
import { type IdParamsType } from "../../schemas/conceptSchema";
import { getApiErrorMessage } from "../../lib/api";

export const useGetConcepts = () => {
	return useQuery({
		queryKey: ["concepts"],
		queryFn: getConcepts,
	});
};

export const useGetConcept = (id: IdParamsType) => {
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["concepts"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Concept added");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};

export const useAddConceptNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addConceptNote,
    onMutate: async ({ id, data }) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: ['concept', id] });
      
      // Snapshot previous value
      const previous = queryClient.getQueryData(['concept', id]);
      
      // Optimistically update
      queryClient.setQueryData(['concept', id], (old: any) => ({
        ...old,
        data: {
          ...old.data,
          concept: {
            ...old.data.concept,
            notes: [
              ...old.data.concept.notes,
              { id: 'temp-' + Date.now(), content: data.note, createdAt: new Date() },
            ],
          },
        },
      }));
      
      return { previous };
    },
    onError: (_err, vars, context) => {
      // Rollback on error
      if (context?.previous) {
        queryClient.setQueryData(['concept', vars.id], context.previous);
      }
    },
    onSettled: (_data, _error, vars) => {
      // Always refetch to get real data
      queryClient.invalidateQueries({ queryKey: ['concept', vars.id] });
    },
  });
};

export const useEditConcept = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editConcept,
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["concept", variables.id] });
			queryClient.invalidateQueries({ queryKey: ["concepts"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Changes saved");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
export const useEditConceptNote = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editConceptNote,
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["concept", variables.id] });
			toast.success("Changes saved");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};

export const useDeleteConceptNote = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteConceptNote,
		onSuccess: (_data, deletedId) => {
			queryClient.invalidateQueries({ queryKey: ["concept", deletedId.id] });
			toast.success("Note deleted");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
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
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			queryClient.removeQueries({ queryKey: ["concept", deletedId] });
			toast.success("Concept deleted");
			navigate("/concepts");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
