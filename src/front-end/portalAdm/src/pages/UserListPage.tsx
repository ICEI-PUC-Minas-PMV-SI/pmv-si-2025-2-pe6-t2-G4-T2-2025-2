import { useState, useEffect, useCallback } from "react";
import { UserTable } from "../components/UserTable";
import { SearchInput } from "../components/SearchInput";
import { Button } from "../components/Button";
import { PaginationControls } from "../components/PaginationControls";
import { Modal } from "../components/Modal";
import { AddUserForm } from "../components/AddUserForm";
import { HiMenu, HiPlus, HiX } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { api } from "../services/api";

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	createdAt: string;
}

interface PaginationState {
	page: number;
	perPage: number;
	totalRecords: number;
	totalPages: number;
}

interface ApiUsersResponse {
	users: User[];
	pagination: PaginationState;
}

export function UserListPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		page: 1,
		perPage: 10,
		totalRecords: 0,
		totalPages: 1,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [showActions, setShowActions] = useState(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<User | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const fetchUsers = useCallback(
		async (pageToFetch: number, currentSearchTerm: string) => {
			setIsLoading(true);

			try {
				const response = await api.get<ApiUsersResponse>(`/admin/users`, {
					params: {
						page: pageToFetch,
						perPage: pagination.perPage,
						search: currentSearchTerm,
						sortBy: "createdAt",
						order: "desc",
					},
				});
				setUsers(response.data.users);
				setPagination(response.data.pagination);
			} catch (err: unknown) {
				const errorMessage = getApiErrorMessage(err);
				toast.error(`Falha ao carregar usuários: ${errorMessage}`);
			} finally {
				setIsLoading(false);
			}
		},
		[pagination.perPage],
	);

	useEffect(() => {
		const timerId = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
		return () => clearTimeout(timerId);
	}, [searchTerm]);

	useEffect(() => {
		setPagination((prev) => ({ ...prev, page: 1 }));
	}, [debouncedSearchTerm]);

	useEffect(() => {
		fetchUsers(pagination.page, debouncedSearchTerm);
	}, [pagination.page, debouncedSearchTerm, fetchUsers]);

	// Função para alternar a exibição das ações
	const handleToggleActions = () => {
		setShowActions((prev) => !prev);
	};

	const handleAddUser = () => {
		setIsAddModalOpen(true);
	};

	const handleDeleteClick = (userId: string, userName: string) => {
		const user = users.find((u) => u.id === userId);
		if (user) {
			setUserToDelete(user);
		}
	};

	const handleConfirmDelete = async () => {
		if (!userToDelete) return;

		setIsDeleting(true);
		try {
			await api.delete(`/admin/users/${userToDelete.id}`);
			toast.success(`Usuário "${userToDelete.name}" excluído com sucesso.`);

			setUserToDelete(null);
			fetchUsers(pagination.page, debouncedSearchTerm);
		} catch (err: unknown) {
			const errorMessage = getApiErrorMessage(err);
			toast.error(`Falha ao deletar: ${errorMessage}`);
		} finally {
			setIsDeleting(false);
		}
	};

	const onAddUserSuccess = () => {
		setIsAddModalOpen(false);
		fetchUsers(1, "");
		setSearchTerm("");
	};

	// Função para mudar de página
	const handlePageChange = (newPage: number) => {
		setPagination((prev) => ({ ...prev, page: newPage }));
	};

	return (
		<div>
			<h1 className="text-3xl font-bold text-white mb-8">
				Gerenciamento de Usuários
			</h1>

			{/* BARRA DE FILTRO E AÇÕES */}
			<div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
				<div className="w-full md:w-1/3 lg:w-1/4">
					<SearchInput
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Buscar por nome ou email..."
					/>
				</div>
				<div className="relative flex items-center justify-end w-full md:w-32 h-10">
					{/* Botão Adicionar Usuário */}
					{showActions && (
						<Button
							type="button"
							onClick={handleAddUser}
							variant="green"
							size="icon"
							className={`
                absolute right-14 p-1 
                animate-in fade-in zoom-in-50 duration-300
              `}
							dataTestId="add-user-button"
						>
							<HiPlus className="h-5 w-5" />
						</Button>
					)}

					{/* Botão de Toggle */}
					<Button
						type="button"
						onClick={handleToggleActions}
						size="icon"
						className={`absolute right-0 px-2 transition-all duration-200 `}
						dataTestId="toggle-actions-button"
					>
						{showActions ? (
							<HiX className="h-5 w-5" />
						) : (
							<HiMenu className="h-5 w-5" />
						)}
					</Button>
				</div>
			</div>

			<div className="bg-gray-900 p-2 sm:p-4 md:p-6 rounded-lg shadow-md border border-gray-700 overflow-x-auto min-w-0">
				<UserTable
					users={users}
					isLoading={isLoading}
					showRoleColumn={true}
					showActionsColumn={showActions}
					onDeleteUser={handleDeleteClick}
					showViewAllLink={false}
				/>
			</div>
			{/* Controles de Paginação */}
			{!isLoading && pagination.totalPages > 1 && (
				<PaginationControls
					currentPage={pagination.page}
					totalPages={pagination.totalPages}
					onPageChange={handlePageChange}
				/>
			)}

			{/* Modal de Adicionar Usuário */}
			<Modal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				title="Adicionar Novo Usuário"
			>
				<AddUserForm
					onSuccess={onAddUserSuccess}
					onClose={() => setIsAddModalOpen(false)}
				/>
			</Modal>

			{/* Modal de Confirmação de Exclusão */}
			<Modal
				isOpen={!!userToDelete}
				onClose={() => setUserToDelete(null)}
				title="Confirmar Exclusão"
			>
				<div>
					<p className="text-gray-300">
						Você tem certeza que deseja excluir permanentemente o usuário
						<strong className="text-white"> {userToDelete?.name}</strong>(
						{userToDelete?.email})?
					</p>
					<p className="text-yellow-400 text-sm mt-2">
						Esta ação não pode ser desfeita. Todas as transações e categorias
						deste usuário também serão excluídas.
					</p>
					<div className="flex justify-end gap-3 mt-6">
						<Button
							type="button"
							variant="primary"
							onClick={() => setUserToDelete(null)}
							disabled={isDeleting}
						>
							Cancelar
						</Button>
						<Button
							type="button"
							variant="danger"
							isLoading={isDeleting}
							onClick={handleConfirmDelete}
						>
							Confirmar Exclusão
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
