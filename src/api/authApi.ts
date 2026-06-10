import type { ForgotPasswordData, LoginData, ResetPasswordPayload, SignUpPayload, VerifyEmailData } from "../schemas/authSchema";
import { api } from "../lib/api";

export const signup = async (credentials: SignUpPayload) => {
	const res = await api.post("/auth/signup", credentials);

	return res.data;
};
export const login = async (credentials: LoginData) => {
	const res = await api.post("/auth/login", credentials);

	return res.data;
};
export const logout = async () => {
	const res = await api.post("/auth/logout");

	return res.data;
};
export const refresh = async () => {
	const res = await api.post("/auth/refresh");

	return res.data;
};
export const resetPassword = async (credentials:ResetPasswordPayload) => {
	const res = await api.post("/auth/reset-password", credentials);

	return res.data;
};
export const forgotPassword = async (credentials:ForgotPasswordData) => {
	const res = await api.post("/auth/forgot-password", credentials);

	return res.data;
};
export const verifyEmail = async (credentials:VerifyEmailData) => {
	const res = await api.post("/auth/verify-email", credentials);

	return res.data;
};

export const user = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};


