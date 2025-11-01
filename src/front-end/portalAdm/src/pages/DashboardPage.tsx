import { useState, useEffect } from "react";
import { UserTable } from "../components/UserTable";
import { Link } from "react-router-dom";

import { RecentActivityFeed } from "../components/RecentActivityFeed";
import { api } from "../services/api";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import type { ActivityItem } from "../types";

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	createdAt: string;
}

export function DashboardPage() {
	const [recentUsers, setRecentUsers] = useState<User[]>([]);
	const [activities, setActivities] = useState<ActivityItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			try {
				const [activityResponse, usersResponse] = await Promise.all([
					api.get<ActivityItem[]>("/admin/recent-activity?limit=5"),
					api.get<{ users: User[] }>(
						"/admin/users?limit=5&sortBy=createdAt&order=desc",
					),
				]);

				setActivities(activityResponse.data);
				setRecentUsers(usersResponse.data.users);
			} catch (err: unknown) {
				const errorMessage = getApiErrorMessage(err);
				toast.error(`Falha ao carregar dashboard: ${errorMessage}`);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

			{isLoading && (
				<p className="text-gray-400">Carregando conteúdo do dashboard...</p>
			)}

			{/* --- SEÇÕES  --- */}
			{!isLoading && (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Coluna 1 e 2: Atividades e Usuários Recentes */}
					<div className="lg:col-span-2 space-y-8">
						{/* Atividades Recentes */}
						<div className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700">
							<h2 className="text-xl font-semibold text-white mb-4">
								Atividades Recentes
							</h2>
							<RecentActivityFeed activities={activities} isLoading={false} />
						</div>

						{/* Tabela de Usuários Recentes */}
						<div className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700 overflow-x-auto">
							<UserTable
								title="Usuários Recentes"
								users={recentUsers}
								isLoading={false}
								showViewAllLink={true}
								showActionsColumn={false}
							/>
						</div>
					</div>

					{/* Coluna 3: Links Rápidos */}
					<div className="lg:col-span-1 bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700 h-fit">
						<h2 className="text-xl font-semibold text-white mb-4">
							Ações Rápidas
						</h2>
						<div className="space-y-3">
							<Link
								to="/admin/users"
								className="block text-green-100 hover:underline"
							>
								Gerenciar Usuários
							</Link>
							{/* Adicionar outros links/botões aqui */}
							<p className="text-gray-500 text-sm">Mais ações em breve...</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
