import { z } from "zod";

const passwordField = z
	.string()
	.min(8, "Password must be at least 8 characters")
	.max(64, "Password must be at most 64 characters");

const emailField = z.email().min(1, "Email is required");

export const signUpSchema = z
	.object({
		name: z.string().min(1, "Name is required"),
		email: emailField,
		password: passwordField,
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export const loginSchema = z.object({
	email: emailField,
	password: passwordField,
});

export const verifyEmailSchema = z.object({
	token: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
	email: emailField,
});

export const resetPasswordSchema = z
	.object({
		token: z.string().min(1),
		password: passwordField,
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type SignUpPayload = Omit<SignUpData, "confirmPassword">;
export type ResetPasswordPayload = Omit<ResetPasswordData, "confirmPassword">;

export type SignUpData = z.infer<typeof signUpSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type VerifyEmailData = z.infer<typeof verifyEmailSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
