import { NavLink } from "react-router-dom";
import Button from "../components/subcomponents/Button";
import Input from "../components/subcomponents/Input";
import { useForgotPassword } from "../hooks/auth/useAuth";
import {
  forgotPasswordSchema,
  type ForgotPasswordData,
} from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { getApiErrorMessage } from "../lib/api";
import logo from "../../public/logo.svg";

const ForgotPasswordPage = () => {
  const { mutate, isError, isPending, error, isSuccess } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordData> = (data) => mutate(data);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-3 md:px-8 py-8">
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <img src={logo} alt="Stride" className="w-32 h-auto mb-4" />
        <p className="text-muted text-base md:text-lg text-center">
          No worries, we'll help you reset password.
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
            <Input type="text" text="Email" {...register("email")} />
            {errors.email && (
              <small className="text-danger text-xs md:text-sm">
                {errors.email.message}
              </small>
            )}
          </div>

          {isSuccess && (
            <small className="text-success text-xs md:text-sm text-center">
              If an account exists with that email, a password reset link has
              been sent.
            </small>
          )}

          <Button variant="primary" type="submit" disabled={isPending}>
            Send Reset Link
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

export default ForgotPasswordPage;