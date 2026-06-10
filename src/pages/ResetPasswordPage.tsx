import { NavLink, useSearchParams } from "react-router-dom";
import Button from "../components/subcomponents/Button";
import Input from "../components/subcomponents/Input";
import {
  resetPasswordSchema,
  type ResetPasswordData,
} from "../schemas/authSchema";
import { useResetPassword } from "../hooks/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { getApiErrorMessage } from "../lib/api";
import logo from "../../public/logo.svg";

const ResetPasswordPage = () => {
  const { mutate, isError, isPending, error } = useResetPassword();
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-3 md:px-8 py-8">
        <img src={logo} alt="Stride" className="w-32 h-auto mb-4" />
        <p className="text-2xl text-danger text-center">
          Invalid or missing reset link.
        </p>
        <NavLink
          to="/forgot-password"
          className="text-headline underline text-sm md:text-base"
        >
          Request a new link
        </NavLink>
      </div>
    );
  }

  const onSubmit: SubmitHandler<ResetPasswordData> = ({
    confirmPassword: _confirmPassword,
    ...data
  }) => {
    mutate({ ...data, token });
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-3 md:px-8 py-8">
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <img src={logo} alt="Stride" className="w-32 h-auto mb-4" />
        <h1 className="text-2xl md:text-3xl text-paragraph">Reset Password</h1>

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
            Reset Password
          </Button>

          <p className="text-paragraph text-sm md:text-base text-center flex justify-center items-center gap-2.5">
            Remembered your password?
            <NavLink to="/login" className="text-headline underline">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;