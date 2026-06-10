import { NavLink, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import logo from "../public/logo.svg";

import { ProtectedRoute } from "./routes/ProtectedRoutes";

const ProtectedLayout = () => {
	return (
		<ProtectedRoute>
			<NavLink to="/" className="sm:block hidden px-4 sm:px-8 py-4">
				<img src={logo} alt="Stride" className="w-20 h-8" />
			</NavLink>
			<NavBar />
			<div className="pt-16">
				<Outlet />
			</div>
		</ProtectedRoute>
	);
};

export default ProtectedLayout;
