import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ConceptOverviewPage from "./pages/ConceptOverviewPage";
import ProjectsOverviewPage from "./pages/ProjectsOverviewPage";
import ConceptDetailsPage from "./pages/ConceptDetailsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ProtectedLayout from "./ProtectedLayout";
import NotFoundPage from "./pages/NotFoundPage";
import UserProfilePage from "./pages/UserProfilePage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import { PublicOnlyRoute } from "./routes/ProtectedRoutes";

function App() {
	return (
		<Routes>
			<Route
				path="/login"
				element={
					<PublicOnlyRoute>
						<LoginPage />
					</PublicOnlyRoute>
				}
			/>
			<Route path="/" element={<LandingPage />} />
			<Route
				path="/signup"
				element={
					<PublicOnlyRoute>
						<SignupPage />
					</PublicOnlyRoute>
				}
			/>
			<Route path="/reset-password" element={<ResetPasswordPage />} />
			<Route path="/forgot-password" element={<ForgotPasswordPage />} />
			<Route path="/verify-email" element={<VerifyEmailPage />} />
			<Route element={<ProtectedLayout />}>
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/concepts" element={<ConceptOverviewPage />} />
				<Route path="/projects" element={<ProjectsOverviewPage />} />
				<Route path="/concepts/:id" element={<ConceptDetailsPage />} />
				<Route path="/projects/:id" element={<ProjectDetailsPage />} />
				<Route path="/me" element={<UserProfilePage />} />
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
