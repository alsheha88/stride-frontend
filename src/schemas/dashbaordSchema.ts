type ConceptWithLatestRating = {
  id: string;
  name: string;
  createdAt: string;
  userId: string;
  ratings: { rating: number; createdAt: string }[];
};

type RecentProject = {
  id: string;
  name: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
  completedAt: string | null;
  conceptLinks: {
    concept: {
      name: string;
    };
  }[];
};

export type DashboardResponse = {
  data: {
    stats: {
      conceptsMastered: {
        current: number;
        total: number;
      };
      projectsCompleted: number;
    };
    confidenceOverview: ConceptWithLatestRating[];
    recentConcepts: ConceptWithLatestRating[];
    recentProjects: RecentProject[];
  };
};