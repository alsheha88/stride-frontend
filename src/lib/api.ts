import axios from "axios";
import type { AxiosError } from "axios";

let memoryToken: string | null = null;

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	if (memoryToken) {
		config.headers["Authorization"] = `Bearer ${memoryToken}`;
	}
	return config;
});

export const setAuthToken = (token: string) => {
	memoryToken = token;
};

export const clearAuthToken = () => {
	memoryToken = null;
};

const isAuthEndpoint = (url: string): boolean => {
	if (
		url.includes("/auth/login") ||
		url.includes("/auth/signup") ||
		url.includes("/auth/refresh")
	)
		return true;

	return false;
};
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Conditions to attempt refresh:
		// 1. Got a 401
		// 2. This request hasn't already been retried
		// 3. This isn't itself a refresh/login request

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!isAuthEndpoint(originalRequest.url)
		) {
			originalRequest._retry = true;

			try {
				// Call refresh
				const refreshResponse = await api.post("/auth/refresh");
				const newAccessToken = refreshResponse.data.data.accessToken;

				// Store new token
				setAuthToken(newAccessToken);

				// Retry the original request
				return api(originalRequest);
			} catch (refreshError) {
				// Refresh failed - user is truly logged out
				clearAuthToken();
				// Let the error propagate; ProtectedRoute will redirect
				return Promise.reject(refreshError);
			}
		}

		// Not a refresh-able error - pass through
		return Promise.reject(error);
	},
);

export const getApiErrorMessage = (error: unknown): string => {
	if (
		(error as AxiosError<{ error: { message: string } }>)?.response?.data?.error
			?.message
	) {
		return (error as AxiosError<{ error: { message: string } }>).response!.data
			.error.message;
	}
	return "Something went wrong";
};
