import {
	signup,
	login,
	logout,
	verifyEmail,
	resetPassword,
	user,
	forgotPassword,
	deleteUser,
} from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	clearAuthToken,
	getApiErrorMessage,
	setAuthToken,
} from "../../lib/api";
import toast from "react-hot-toast";

export const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: login,
		onSuccess: (response) => {
			setAuthToken(response.data.accessToken);
			queryClient.invalidateQueries({ queryKey: ["me"] });
			toast.success("Welcome back!");
			navigate("/");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};

export const useSignup = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: signup,
		onSuccess: () => {
			toast.success("Account created. Check your email to verify.");
			navigate("/verify-email");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
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
			queryClient.clear();
			navigate("/login");
		},
	});
};

export const useForgotPassword = () => {
	return useMutation({
		mutationFn: forgotPassword,
		onSuccess: () => {
			toast.success(
				"If an account exists with that email, a password reset link has been sent.",
			);
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};

export const useResetPassword = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: resetPassword,
		onSuccess: () => {
			toast.success("Password reset. You can now log in.");
			navigate("/login");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
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

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			clearAuthToken();
			queryClient.clear();
			toast.success("Account deleted");
			navigate("/login");
		},
	});
};
