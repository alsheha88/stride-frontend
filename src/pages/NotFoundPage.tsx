import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

const NotFoundPage = () => (
  <main className="min-h-dvh grid place-items-center px-3 md:px-8 py-8">
    <div className="flex flex-col items-center gap-4">
      <img src={logo} alt="Stride" className="w-32 h-auto mb-4" />
      <h1 className="text-3xl md:text-4xl text-paragraph">Page not found</h1>
      <p className="text-muted text-base md:text-lg text-center">
        The page you're looking for doesn't exist.
      </p>
      <NavLink to="/" className="text-primary underline text-sm md:text-base">
        Back to dashboard
      </NavLink>
    </div>
  </main>
);

export default NotFoundPage;