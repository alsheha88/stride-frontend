import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="w-max fixed mx-auto top-0 left-0 right-0 z-1000 sm:px-8 px-3 py-4 min-h-16">
      <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface/40 backdrop-blur-lg border border-border/40 rounded-full px-2 py-1 shadow-lg">
        <ul className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-3 md:px-4 py-2 rounded-full transition-colors block ${
                  isActive
                    ? "bg-primary text-background"
                    : "text-muted hover:bg-surface-hover"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/concepts"
              className={({ isActive }) =>
                `px-3 md:px-4 py-2 rounded-full transition-colors block ${
                  isActive
                    ? "bg-primary text-background"
                    : "text-muted hover:bg-background hover:text-headline"
                }`
              }
            >
              Concepts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `px-3 md:px-4 py-2 rounded-full transition-colors block ${
                  isActive
                    ? "bg-primary text-background"
                    : "text-muted hover:bg-background hover:text-headline"
                }`
              }
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/me"
              className={({ isActive }) =>
                `px-3 md:px-4 py-2 rounded-full transition-colors block ${
                  isActive
                    ? "bg-primary text-background"
                    : "text-muted hover:bg-background hover:text-headline"
                }`
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>

    </header>
  );
};

export default NavBar;