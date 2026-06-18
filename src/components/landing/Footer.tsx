import logo from "../../assets/favicon.svg";
function Footer() {
	return (
		<footer className="px-8 flex items-center justify-between min-h-16 border-t border-t-border">
			{" "}
			<img src={logo} alt="" className="block max-w-full h-8" />
			<div className="flex items-center gap-10">
				<p className="text-muted">© 2026 Stride. Built by Abdulaziz</p>
				<a
					href="https://github.com/alsheha88"
					className="flex items-center justify-center">
					<i className="devicon-github-original-wordmark text-3xl text-paragraph"></i>
				</a>
			</div>
		</footer>
	);
}

export default Footer;
