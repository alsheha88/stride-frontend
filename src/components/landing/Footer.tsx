import logo from "../../assets/favicon.svg";
import {FaGithub} from 'react-icons/fa'
function Footer() {
	return (
		<footer className="px-4 sm:px-8 flex items-center justify-between min-h-16 border-t border-t-border">
			{" "}
			<img src={logo} alt="logo" className="block max-w-full h-8" />
			<div className="flex items-center gap-4 sm:gap-10">
				<p className="text-muted sm:text-base text-sm">© 2026 Stride. Built by Abdulaziz</p>
				<a
					href="https://github.com/alsheha88"
					className="flex items-center justify-center" aria-label="GitHub profile">
						<FaGithub className="text-3xl text-paragraph" />
				</a>
			</div>
		</footer>
	);
}

export default Footer;
