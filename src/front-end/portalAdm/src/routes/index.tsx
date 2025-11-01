import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import { SignIn } from "../pages/SignIn";
import { NotFound } from "../pages/NotFound";
import { AdminLayout } from "../layouts/AdminLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { UserListPage } from "../pages/UserListPage";
import { ProfilePage } from "../pages/ProfilePage";
import { LoadingOverlay } from "../components/LoadingOverlay";

export function AppRoutes() {
	const { session, isLoading } = useAuth();

	if (isLoading) {
		return <LoadingOverlay isLoading={true} />;
	}

	return (
		<Routes>
			<Route
				path="/"
				element={
					session && session.user.role === "admin" ? (
						<Navigate to="/admin/dashboard" replace />
					) : (
						<SignIn />
					)
				}
			/>
			<Route
				path="/admin"
				element={
					session && session.user.role === "admin" ? (
						<AdminLayout />
					) : (
						<Navigate to="/" replace />
					)
				}
			>
				<Route index element={<Navigate to="/admin/dashboard" replace />} />
				<Route path="dashboard" element={<DashboardPage />} />
				<Route path="users" element={<UserListPage />} />
				<Route path="profile" element={<ProfilePage />} />
				<Route path="*" element={<NotFound />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
