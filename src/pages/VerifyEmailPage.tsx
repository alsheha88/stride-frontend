import { Navigate, useSearchParams } from "react-router-dom";
import { useVerifyEmail } from "../hooks/auth/useAuth";
import { useEffect } from "react";
import logo from "../assets/logo.svg";

const VerifyEmailPage = () => {
  const { mutate, isError, isPending, isSuccess } = useVerifyEmail();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) mutate({ token });
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-dvh grid place-items-center px-3 md:px-8 py-8">
        <div className="flex flex-col items-center gap-4">
          <img src={logo} alt="Stride" className="w-32 h-auto mb-4" />
          <p className="text-xl md:text-2xl text-danger text-center">
            Invalid or missing link.
          </p>
        </div>
        <Navigate to="/login" replace />
      </div>
    );
  }

  return (
    <div className="min-h-dvh grid place-items-center px-3 md:px-8 py-8">
      <div className="flex flex-col items-center gap-4">
        <img src={logo} alt="Stride" className="w-32 h-auto mb-4" />
        {isPending && (
          <p className="text-xl md:text-2xl text-primary text-center">
            Verifying...
          </p>
        )}
        {isSuccess && (
          <p className="text-xl md:text-2xl text-success text-center">
            Email verified! Redirecting...
          </p>
        )}
        {isError && (
          <p className="text-xl md:text-2xl text-danger text-center">
            This link is invalid or expired.
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
