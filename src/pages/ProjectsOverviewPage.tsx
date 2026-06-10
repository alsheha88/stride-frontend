import { Search, ArrowUpDown, ArrowBigRight } from "lucide-react";
import { ThreeCircles } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import ListRow from "../components/ListRow";
import Button from "../components/subcomponents/Button";
import { useGetProjects } from "../hooks/projects/useProjects";
import AddProjectModal from "../components/modals/AddProjectModal";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { formatDate } from "../lib/utility";

const statusMap = {
  NOT_STARTED: { label: "Not Started", style: "text-muted" },
  IN_PROGRESS: { label: "In Progress", style: "text-primary" },
  COMPLETED: { label: "Completed", style: "text-success" },
} as const;

const ProjectsOverviewPage = () => {
  const { data, isLoading, isError, error } = useGetProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");

  const allProjects = data?.data.projects;
  const visibleCount = 2;

  const projects = allProjects?.filter((project) => {
    const matchesStatus = status === "" || project.status === status;
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (isError)
    return (
      <div className="h-dvh grid place-items-center">
        <p className="text-2xl text-danger">{error.message}</p>
      </div>
    );

  if (isLoading)
    return (
      <div className="h-dvh flex items-center justify-center">
        <ThreeCircles color="#ff8906" />
      </div>
    );

  return (
    <main className="min-h-dvh flex flex-col gap-10 px-3 md:px-8 pt-4 pb-16 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl text-paragraph">Projects Overview</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-6xl mx-auto w-full">
        <Button
          variant={status === "" ? "primary" : "secondary"}
          type="button"
          onClick={() => setStatus("")}
        >
          All
        </Button>
        <Button
          variant={status === "NOT_STARTED" ? "primary" : "secondary"}
          type="button"
          onClick={() => setStatus("NOT_STARTED")}
        >
          Not Started
        </Button>
        <Button
          variant={status === "IN_PROGRESS" ? "primary" : "secondary"}
          type="button"
          onClick={() => setStatus("IN_PROGRESS")}
        >
          In Progress
        </Button>
        <Button
          variant={status === "COMPLETED" ? "primary" : "secondary"}
          type="button"
          onClick={() => setStatus("COMPLETED")}
        >
          Completed
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
        <div className="relative">
          <Search
            className="absolute top-1/2 -translate-y-1/2 left-6"
            color="#6b6a78"
          />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Projects"
            className="px-14 py-3 h-full w-full border placeholder:text-muted text-headline border-border rounded-lg bg-surface focus:outline-none focus:border-primary shadow-[0px_1px_2px_rgba(10,13,18,0.05)] text-sm md:text-base"
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="primary"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            Add Project
          </Button>
          <Button variant="secondary" type="button">
            Sort <ArrowUpDown size={18} />
          </Button>
        </div>
      </div>

      <div>
        {projects && projects.length > 0 ? (
          projects.map((project, i) => {
            const totalLinks = project.conceptLinks.length;
            const { label, style } = statusMap[project.status];

            return (
              <ListRow
                key={project.id}
                className="grid grid-cols-3 sm:grid-cols-5"
                index={i}
              >
                <p className="text-sm md:text-base text-paragraph">
                  {project.name}
                </p>

                <div className="hidden sm:block">
                  <p className="text-xs md:text-sm text-muted">
                    {project.conceptLinks
                      .slice(0, visibleCount)
                      .map((item) => item.concept.name)
                      .join(", ")}
                    {totalLinks > visibleCount && (
                      <NavLink
                        className="underline ml-2"
                        to={`/projects/${project.id}`}
                      >
                        +{totalLinks - visibleCount} more
                      </NavLink>
                    )}
                  </p>
                </div>

                <p className="text-xs md:text-sm text-muted hidden sm:block">
                  {formatDate(project.createdAt)}
                </p>

                <p className={`${style} text-sm md:text-base text-center`}>
                  {label}
                </p>

                <NavLink
                  to={`/projects/${project.id}`}
                  className="place-self-center"
                >
                  <ArrowBigRight
                    fill="#fffffe"
                    className="hover:fill-primary hover:stroke-primary"
                  />
                </NavLink>
              </ListRow>
            );
          })
        ) : !allProjects || allProjects.length === 0 ? (
          <p className="text-muted italic text-base md:text-lg text-center py-12">
            No projects yet. Add your first one to start tracking.
          </p>
        ) : searchText && status ? (
          <p className="text-muted italic text-base md:text-lg text-center py-12">
            No "{statusMap[status as keyof typeof statusMap]?.label}" projects
            match "{searchText}"
          </p>
        ) : searchText ? (
          <p className="text-muted italic text-base md:text-lg text-center py-12">
            No projects match "{searchText}"
          </p>
        ) : (
          <p className="text-muted italic text-base md:text-lg text-center py-12">
            No {statusMap[status as keyof typeof statusMap]?.label} projects
          </p>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <AddProjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProjectsOverviewPage;