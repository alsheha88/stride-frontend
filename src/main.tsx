import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import * as Sentry from "@sentry/react";

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	tracesSampleRate: 0.1,
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			retry: 1,
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Sentry.ErrorBoundary fallback={<p>Something Went Wrong</p>}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
				<ReactQueryDevtools initialIsOpen={false} />
				<Toaster
					position="top-center"
					toastOptions={{
						className: "",
						style: {
							color: "#a7a9be",
							backgroundColor: "#1a1925",
							border: "1px solid #2a2935",
							fontSize: "14px",
						},
					}}
				/>
			</QueryClientProvider>
		</Sentry.ErrorBoundary>
	</StrictMode>,
);
