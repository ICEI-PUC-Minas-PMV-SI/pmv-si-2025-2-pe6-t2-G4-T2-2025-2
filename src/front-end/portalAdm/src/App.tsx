import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";

export function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppRoutes />
				<Toaster
					position="top-right"
					reverseOrder={false}
					toastOptions={{
						style: { background: "#333", color: "#fff" },
						error: {
							style: { background: "#ef4444", color: "#fff" },
							iconTheme: { primary: "#fff", secondary: "#ef4444" },
						},
						success: {
							style: {
								background: "#16a34a",
								color: "#fff",
							},
						},
					}}
				/>
			</AuthProvider>
		</BrowserRouter>
	);
}
