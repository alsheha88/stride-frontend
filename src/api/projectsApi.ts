import { api } from "../lib/api";
import type { idParamsType } from "../schemas/conceptSchema";
import type {CreateProjectData, UpdateProjectData, CompleteProjectData, ProjectListResponse, ProjectDetailResponse} from '../schemas/projectsSchema'

export const getProjects = async ():Promise<ProjectListResponse> => {
    const res = await api.get("/projects");

    return res.data
};
export const getProject = async (id: idParamsType):Promise<ProjectDetailResponse> => {
    const res = await api.get(`/projects/${id}`)

    return res.data
};
export const addProject = async (data:CreateProjectData) => {
    const res = await api.post('/projects', data)

    return res.data
};
export const completeProject = async (id: idParamsType, data:CompleteProjectData) => {
    const res = await api.post(`/projects/${id}/complete`, data)

    return res.data

};
export const editProject = async (id: idParamsType, data:UpdateProjectData) => {
    const res = await api.patch(`/projects/${id}`, data)

    return res.data

};
export const deleteProject = async (id: idParamsType) => {
     const res = await api.delete(`/projects/${id}`)

    return res.data

};