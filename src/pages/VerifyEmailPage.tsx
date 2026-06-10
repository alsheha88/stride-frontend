import { Navigate, useSearchParams } from "react-router-dom";
import { useVerifyEmail } from "../hooks/auth/useAuth";
import { useEffect } from "react";

const VerifyEmailPage = () => {
	const { mutate, isError, isPending, isSuccess } = useVerifyEmail();
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");

	useEffect(() => {
		if (token) mutate({ token });
	}, [token]);

	if (!token) {
		return (
			<div className="grid place-items-center">
				<p className="text-2xl text-danger text-center">
					Invalid or missing link.
				</p>
				<Navigate to="/login" replace />
			</div>
		);
	}

	return (
		<div className="grid place-items-center h-dvh">
			{isPending && <p className="text-2xl text-primary">Verifying...</p>}
			{isSuccess && (
				<p className="text-2xl text-success">Email verified! Redirecting...</p>
			)}
			{isError && (
				<p className="text-2xl text-danger">This link is invalid or expired.</p>
			)}
		</div>
	);
};

export default VerifyEmailPage;
