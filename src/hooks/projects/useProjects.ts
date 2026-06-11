import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
	UpdateProjectData,
	CompleteProjectData,
} from "../../schemas/projectsSchema";
import type { idParamsType } from "../../schemas/conceptSchema";
import {
	addProject,
	completeProject,
	deleteProject,
	editProject,
	getProject,
	getProjects,
} from "../../api/projectsApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../lib/api";

type CompeleteProjectVariables = {
	id: idParamsType;
	data: CompleteProjectData;
};
type EditProjectVariables = {
	id: idParamsType;
	data: UpdateProjectData;
};

export const useGetProjects = () => {
	return useQuery({
		queryKey: ["projects"],
		queryFn: getProjects,
	});
};
export const useGetProject = (id: idParamsType) => {
	return useQuery({
		queryKey: ["project", id],
		queryFn: () => getProject(id),
	}, );
};

export const useAddProject = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			queryClient.invalidateQueries({ queryKey: ["concepts"] });
			toast.success("Project added");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
export const useEditProject = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, Error, EditProjectVariables>({
		mutationFn: ({ id, data }) => editProject(id, data),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Changes saved");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
export const useCompleteProject = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, Error, CompeleteProjectVariables>({
		mutationFn: ({ id, data }) => completeProject(id, data),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			queryClient.invalidateQueries({ queryKey: ["concepts"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Project completed");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
export const useDeleteProject = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: deleteProject,
		onSuccess: (_data, deletedId) => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			queryClient.invalidateQueries({ queryKey: ["concepts"] });
			queryClient.removeQueries({ queryKey: ["project", deletedId] });
			toast.success("Project deleted");

			navigate("/projects");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};
