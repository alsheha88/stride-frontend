import { api } from "../lib/api";
import type { IdParamsType } from "../schemas/conceptSchema";
import type {
	CreateProjectData,
	UpdateProjectData,
	CompleteProjectData,
	ProjectListResponse,
	ProjectDetailResponse,
	UpdateProjectStatusData,
	UpdateProjectLessonsData,
} from "../schemas/projectsSchema";

export const getProjects = async (): Promise<ProjectListResponse> => {
	const res = await api.get("/projects");
	return res.data;
};

export const getProject = async (id: IdParamsType): Promise<ProjectDetailResponse> => {
	const res = await api.get(`/projects/${id}`);
	return res.data;
};

export const addProject = async (data: CreateProjectData) => {
	const res = await api.post("/projects", data);
	return res.data;
};

export const editProject = async ({
	id,
	data,
}: {
	id: IdParamsType;
	data: UpdateProjectData;
}) => {
	const res = await api.patch(`/projects/${id}`, data);
	return res.data;
};

export const editProjectStatus = async ({
	id,
	data,
}: {
	id: IdParamsType;
	data: UpdateProjectStatusData;
}) => {
	const res = await api.patch(`/projects/${id}/status`, data);
	return res.data;
};

export const completeProject = async ({
	id,
	data,
}: {
	id: IdParamsType;
	data: CompleteProjectData;
}) => {
	const res = await api.post(`/projects/${id}/complete`, data);
	return res.data;
};

export const editProjectLessons = async ({
	id,
	data,
}: {
	id: IdParamsType;
	data: UpdateProjectLessonsData;
}) => {
	const res = await api.patch(`/projects/${id}/lessons-learned`, data);
	return res.data;
};

export const deleteProject = async (id: IdParamsType) => {
	const res = await api.delete(`/projects/${id}`);
	return res.data;
};