import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// Componentes e os exempllos necessários
import { UserListPage } from "../pages/UserListPage";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";

// Exemplos da API (GET e DELETE)
vi.mock("../services/api", () => ({
	api: {
		get: vi.fn(),
		delete: vi.fn(),
	},
}));

// Exemplo do Modal
vi.mock("../components/Modal", () => ({
	Modal: ({ isOpen, title, children }: any) => {
		if (!isOpen) return null;
		return (
			<div data-testid="modal">
				<h3 data-testid="modal-title">{title}</h3>
				{children}
			</div>
		);
	},
}));

// Dados de exemplo para a API
const mockUsers = [
	{
		id: "1",
		name: "Ana Silva",
		email: "ana@test.com",
		role: "member",
		createdAt: new Date().toISOString(),
	},
	{
		id: "2",
		name: "Bruno Costa",
		email: "bruno@test.com",
		role: "admin",
		createdAt: new Date().toISOString(),
	},
];
const mockApiResponse = {
	data: {
		users: mockUsers,
		pagination: { page: 1, perPage: 10, totalRecords: 2, totalPages: 1 },
	},
};

// Função para renderizar o componente
const renderComponent = () => {
	// Configura API GET para retornar os usuários
	(api.get as Mock).mockResolvedValue(mockApiResponse);

	render(
		<MemoryRouter initialEntries={["/admin/users"]}>
			<AuthContext.Provider
				value={{
					session: {
						token: "mock-token",
						user: {
							id: "admin-id",
							name: "Admin",
							email: "admin@mock.com",
							role: "admin",
						},
					},
					isLoading: false,
					save: vi.fn(),
					remove: vi.fn(),
				}}
			>
				<Routes>
					<Route path="/admin/users" element={<UserListPage />} />
				</Routes>
			</AuthContext.Provider>
		</MemoryRouter>,
	);
};

describe("UserListPage (Integração)", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	// Teste 1: Verifica se os dados são carregados
	it("deve carregar e exibir os usuários da API corretamente", async () => {
		renderComponent();

		// Verifica se os usuários aparecem na tela
		expect(await screen.findByText("Ana Silva")).toBeInTheDocument();
		expect(screen.getByText("Bruno Costa")).toBeInTheDocument();

		// Verifica se a API foi chamada
		expect(api.get).toHaveBeenCalledWith("/admin/users", expect.any(Object));
	});

	// Teste 2: Verificar o toggle de ações
	it("deve alternar a visibilidade das ações ao clicar no botão de menu", async () => {
		const user = userEvent.setup();
		renderComponent();

		await screen.findByText("Ana Silva");

		// O botão "Adicionar Usuário" não deve existir
		expect(screen.queryByTestId("add-user-button")).not.toBeInTheDocument();

		// A coluna "Ações" na tabela não deve existir
		expect(
			screen.queryByRole("columnheader", { name: /Ações/i }),
		).not.toBeInTheDocument();

		// Encontra o botão de toggle de ações
		const toggleButton = screen.getByTestId("toggle-actions-button");
		await user.click(toggleButton);

		// O botão "Adicionar Usuário" DEVE estar visível
		expect(screen.getByTestId("add-user-button")).toBeInTheDocument();

		// A coluna "Ações" DEVE estar visível
		expect(
			screen.getByRole("columnheader", { name: /Ações/i }),
		).toBeInTheDocument();

		await user.click(toggleButton);

		expect(screen.queryByTestId("add-user-button")).not.toBeInTheDocument();
		expect(
			screen.queryByRole("columnheader", { name: /Ações/i }),
		).not.toBeInTheDocument();
	});
});
