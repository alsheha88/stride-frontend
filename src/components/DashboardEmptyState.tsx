import { useState } from "react";
import { AnimatePresence } from "motion/react";
import AddConceptModal from "./modals/AddConceptModal";
import AddProjectModal from "./modals/AddProjectModal";
import Button from "./subcomponents/Button";

function DashboardEmptyState() {
  const [isConceptModalOpen, setIsConceptModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <div className="min-h-dvh grid place-items-center px-3 md:px-8 py-16">
      <div className="flex flex-col items-center gap-6 max-w-2xl text-center">
        <h1 className="text-2xl md:text-4xl text-paragraph">
          Stride your way out of imposter syndrome
        </h1>
        <p className="text-muted text-base md:text-lg">
          Both work — pick whichever feels right.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <Button
            type="button"
            variant="primary"
            onClick={() => setIsConceptModalOpen(true)}
          >
            Add Concept
          </Button>
          <span className="text-muted text-sm md:text-base">or</span>
          <Button
            type="button"
            variant="primary"
            onClick={() => setIsProjectModalOpen(true)}
          >
            Add Project
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isConceptModalOpen && (
          <AddConceptModal
            isOpen={isConceptModalOpen}
            onClose={() => setIsConceptModalOpen(false)}
          />
        )}
        {isProjectModalOpen && (
          <AddProjectModal
            isOpen={isProjectModalOpen}
            onClose={() => setIsProjectModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default DashboardEmptyState;