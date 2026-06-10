import { NavLink } from "react-router-dom";
import Button from "../components/subcomponents/Button";
import Input from "../components/subcomponents/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLogin } from "../hooks/auth/useAuth";
import { type LoginData, loginSchema } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getApiErrorMessage } from "../lib/api";
import logo from "../../public/logo.svg";
import { ThreeDots } from "react-loader-spinner";

const LoginPage = () => {
	const { mutate, isError, isPending, error } = useLogin();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<LoginData> = (data) => mutate(data);

	return (
		<div className="min-h-dvh flex flex-col items-center justify-center px-3 md:px-8 py-8">
			<div className="flex flex-col items-center gap-4 w-full max-w-md">
				<img src={logo} alt="Stride" className="w-32 h-auto mb-4" />
				<p className="text-muted text-base md:text-lg text-center">
					Welcome back! Sign in to continue your journey.
				</p>

				<form
					className="grid gap-6 w-full p-8 bg-surface border border-border rounded-lg"
					onSubmit={handleSubmit(onSubmit)}>
					{isError && (
						<small className="text-danger text-xs md:text-sm text-center">
							{getApiErrorMessage(error)}
						</small>
					)}

					<div className="flex flex-col gap-2">
						<Input type="text" text="Email" {...register("email")} />
						{errors.email && (
							<small className="text-danger text-xs md:text-sm">
								{errors.email.message}
							</small>
						)}
					</div>

					<div className="flex flex-col gap-2">
						<Input type="password" text="Password" {...register("password")} />
						<div className="flex items-center justify-between">
							<small className="text-danger text-xs md:text-sm">
								{errors.password?.message}
							</small>
							<NavLink
								className="text-headline underline text-xs md:text-sm"
								to="/forgot-password">
								Forgot Password?
							</NavLink>
						</div>
					</div>

					<Button variant="primary" type="submit" disabled={isPending}>
						{isPending ? <ThreeDots color="#0f0e17" width={16} height={16} /> : "Login"}
					</Button>

					<p className="text-paragraph text-sm md:text-base text-center flex justify-center items-center gap-2.5">
						Don't have an account?
						<NavLink to="/signup" className="text-headline underline">
							Sign Up
						</NavLink>
					</p>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
