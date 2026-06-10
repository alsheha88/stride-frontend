import {
	signup,
	login,
	logout,
	verifyEmail,
	resetPassword,
	user,
	forgotPassword,
} from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clearAuthToken, setAuthToken } from "../../lib/api";

export const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: login,
		onSuccess: (response) => {
			setAuthToken(response.data.accessToken);
			queryClient.invalidateQueries({ queryKey: ["me"] });
			navigate("/");
		},
	});
};
export const useSignup = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: signup,
		onSuccess: () => {
			navigate("/verify-email");
		},
	});
};
export const useLogout = () => {
	const queryClient = useQueryClient();

	const navigate = useNavigate();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			clearAuthToken();
			queryClient.clear()
			navigate("/login");
		},
	});
};
export const useForgotPassword = () => {
	return useMutation({
		mutationFn: forgotPassword,
	});
};
export const useResetPassword = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: resetPassword,
		onSuccess: () => {
			navigate("/login");
		},
	});
};

export const useVerifyEmail = () => {
	const queryClient = useQueryClient();

	const navigate = useNavigate();

	return useMutation({
		mutationFn: verifyEmail,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["me"] });
			navigate("/login");
		},
	});
};

export const useCurrentUser = () => {
	return useQuery({
		queryKey: ["me"],
		queryFn: user,
	});
};

