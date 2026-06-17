import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IdParamsType } from "../../schemas/conceptSchema";
import {
	addProject,
	completeProject,
	deleteProject,
	editProject,
	editProjectStatus,
	editProjectLessons,
	getProject,
	getProjects,
} from "../../api/projectsApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../lib/api";

export const useGetProjects = () => {
	return useQuery({
		queryKey: ["projects"],
		queryFn: getProjects,
	});
};

export const useGetProject = (id: IdParamsType) => {
	return useQuery({
		queryKey: ["project", id],
		queryFn: () => getProject(id),
	});
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

	return useMutation({
		mutationFn: editProject,
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

export const useEditProjectStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editProjectStatus,
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Status updated");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};

export const useEditProjectLessons = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editProjectLessons,
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
			toast.success("Lessons updated");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};

export const useCompleteProject = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: completeProject,
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