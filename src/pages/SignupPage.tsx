import { NavLink } from "react-router-dom";
import Button from "../components/subcomponents/Button";
import Input from "../components/subcomponents/Input";
import { useSignup } from "../hooks/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type SignUpData, signUpSchema } from "../schemas/authSchema";
import { getApiErrorMessage } from "../lib/api";
import logo from "../../public/logo.svg";

const SignupPage = () => {
  const { mutate, isError, isPending, error } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpData> = ({
    confirmPassword: _confirmPassword,
    ...data
  }) => mutate(data);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-3 md:px-8 py-8">
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <img src={logo} alt="Stride" className="w-32 h-auto mb-4" />
        <p className="text-muted text-base md:text-lg text-center">
          You are one step closer to fighting imposter syndrome.
        </p>

        <form
          className="grid gap-6 w-full p-8 bg-surface border border-border rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isError && (
            <small className="text-danger text-xs md:text-sm text-center">
              {getApiErrorMessage(error)}
            </small>
          )}

          <div className="flex flex-col gap-2">
            <Input type="text" text="Full Name" {...register("name")} />
            {errors.name && (
              <small className="text-danger text-xs md:text-sm">
                {errors.name.message}
              </small>
            )}
          </div>

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
            {errors.password && (
              <small className="text-danger text-xs md:text-sm">
                {errors.password.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Input
              type="password"
              text="Confirm Password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <small className="text-danger text-xs md:text-sm">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>

          <Button variant="primary" type="submit" disabled={isPending}>
            Sign Up
          </Button>

          <p className="text-paragraph text-sm md:text-base text-center flex justify-center items-center gap-2.5">
            Have an account?
            <NavLink to="/login" className="text-headline underline">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;