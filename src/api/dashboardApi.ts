import { api } from "../lib/api";
import type { DashboardResponse } from "../schemas/dashbaordSchema";


export const getDashboardData = async ():Promise<DashboardResponse> => {
    const res = await api.get("/dashboard");

    return res.data
}