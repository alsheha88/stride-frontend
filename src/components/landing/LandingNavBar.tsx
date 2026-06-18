import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Button from "../subcomponents/Button";
import { useNavigate } from "react-router-dom";
function LandingNavBar() {
	const navigator = useNavigate();
	return (
		<nav className="flex items-center justify-between min-h-18 px-4 py-2 border-b border-b-border/50 backdrop-blur-xs fixed top-0 left-0 z-50 w-full">
			<img src={logo} alt="logo" className="block max-w-full h-6 sm:h-8" />

			<div className="flex items-center gap-4">
				<a href="#features" className="text-muted sm:block hidden hover:text-primary">
					Features
				</a>
				<a href="#how-it-works" className="text-muted sm:block hidden  hover:text-primary">
					How it works
				</a>
				<NavLink to="/login" className="text-muted hover:text-primary">
					Login
				</NavLink>
				<Button
					variant="primary"
					type="button"
					onClick={() => navigator("/signup")}>
					Try Stride
				</Button>
			</div>
		</nav>
	);
}

export default LandingNavBar;
