import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/auth/useAuth";
import { ThreeCircles } from "react-loader-spinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isError, isLoading } = useCurrentUser();

	if (isLoading)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<ThreeCircles color="#ff8906" />
			</div>
		);
	if (isError) return <Navigate to={"/login"} replace />;

	return children;
}

export function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
	const { data, isLoading } = useCurrentUser();

	if (isLoading)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<ThreeCircles color="#ff8906" />
			</div>
		);

	if (data) return <Navigate to="/dashboard" replace />;

	return children;
}
