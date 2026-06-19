import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedLayout from "./ProtectedLayout";
import { PublicOnlyRoute } from "./routes/ProtectedRoutes";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ConceptOverviewPage = lazy(() => import("./pages/ConceptOverviewPage"));
const ProjectsOverviewPage = lazy(() => import("./pages/ProjectsOverviewPage"));
const ConceptDetailsPage = lazy(() => import("./pages/ConceptDetailsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailsPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));

function PageLoader() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<ThreeCircles color="#ff8906" />
		</div>
	);
}

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
				<Route
					path="/dashboard"
					element={
						<Suspense fallback={<PageLoader />}>
							<DashboardPage />
						</Suspense>
					}
				/>
				<Route
					path="/concepts"
					element={
						<Suspense fallback={<PageLoader />}>
							<ConceptOverviewPage />
						</Suspense>
					}
				/>
				<Route
					path="/projects"
					element={
						<Suspense fallback={<PageLoader />}>
							<ProjectsOverviewPage />
						</Suspense>
					}
				/>
				<Route
					path="/concepts/:id"
					element={
						<Suspense fallback={<PageLoader />}>
							<ConceptDetailsPage />
						</Suspense>
					}
				/>
				<Route
					path="/projects/:id"
					element={
						<Suspense fallback={<PageLoader />}>
							<ProjectDetailPage />
						</Suspense>
					}
				/>
				<Route
					path="/me"
					element={
						<Suspense fallback={<PageLoader />}>
							<UserProfilePage />
						</Suspense>
					}
				/>
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
