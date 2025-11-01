import { Link } from "react-router-dom";
import { Button } from "./Button";
import { GrFormSubtract } from "react-icons/gr";

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	createdAt: string;
}

interface UserTableProps {
	users: User[];
	isLoading?: boolean;
	showRoleColumn?: boolean;
	showActionsColumn?: boolean;
	onDeleteUser?: (userId: string, userName: string) => void;
	showViewAllLink?: boolean;
	title?: string;
}

export function UserTable({
	users,
	isLoading = false,
	showRoleColumn = false, // Default: não mostra Role
	showActionsColumn = false, // Default: não mostra Ações
	onDeleteUser,
	showViewAllLink = false,
	title,
}: UserTableProps) {
	const handleDeleteClick = (userId: string, userName: string) => {
		if (onDeleteUser) {
			if (
				window.confirm(
					`Tem certeza que deseja excluir o usuário "${userName}"?`,
				)
			) {
				onDeleteUser(userId, userName);
			}
		}
	};

	if (isLoading) {
		return (
			<p className="text-gray-400 text-center py-4">Carregando usuários...</p>
		);
	}

	return (
		<div>
			{/* Container do componente */}
			{title && (
				<h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
			)}
			{users.length > 0 ? (
				<div>
					<table className="min-w-full">
						<thead className="bg-gray-950">
							<tr className="divide-x divide-gray-600">
								<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Nome
								</th>
								<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Email
								</th>
								{showRoleColumn && (
									<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
										Perfil
									</th>
								)}
								<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Data Cadastro
								</th>
								{showActionsColumn && (
									<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
										Ações
									</th>
								)}
							</tr>
						</thead>
						<tbody className="bg-gray-900">
							{users.map((user) => (
								<tr
									key={user.id}
									className="hover:bg-gray-700 divide-x divide-gray-700"
								>
									<td className="px-4 py-2 whitespace-nowrap text-sm text-white">
										{user.name}
									</td>
									<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
										{user.email}
									</td>
									{showRoleColumn && (
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
											{user.role}
										</td>
									)}
									<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-400">
										{new Date(user.createdAt).toLocaleDateString("pt-BR")}
									</td>
									{showActionsColumn && (
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-400">
											<Button
												type="button"
												variant="danger"
												size="icon"
												onClick={() => handleDeleteClick(user.id, user.name)}
												disabled={!onDeleteUser}
											>
												<GrFormSubtract className="h-5 w-5" />
											</Button>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p className="text-gray-500 text-center py-4">
					Nenhum usuário encontrado.
				</p>
			)}
			{showViewAllLink && (
				<div className="mt-4 text-right">
					<Link
						to="/admin/users"
						className="text-green-100 hover:underline text-sm font-medium"
					>
						Ver todos os usuários &rarr;
					</Link>
				</div>
			)}
		</div>
	);
}
