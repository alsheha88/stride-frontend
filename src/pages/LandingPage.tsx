import Features from "../components/landing/Features";
import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import LandingNavBar from "../components/landing/LandingNavBar";
import Thesis from "../components/landing/Thesis";

function LandingPage() {
	return (
		<main className="min-h-dvh flex flex-col gap-10 px-3 md:px-8 pt-4 max-w-6xl mx-auto landing-bg">
			<div className="flex-1">
				<LandingNavBar />
				<Hero />
				<Thesis />
				<Features />
				<HowItWorks />
			</div>
			<Footer />
		</main>
	);
}

export default LandingPage;
