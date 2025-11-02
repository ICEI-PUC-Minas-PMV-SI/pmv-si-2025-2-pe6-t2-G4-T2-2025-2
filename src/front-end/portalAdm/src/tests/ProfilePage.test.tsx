import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { ProfilePage } from "../pages/ProfilePage";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";
import { toast } from "react-hot-toast";

const mockUser = {
	id: "admin-id-123",
	name: "Admin",
	email: "admin@flow.com.br",
	role: "admin",
} as const;
const mockSession = {
	token: "mock-token-123",
	user: mockUser,
};

// Exemplo da API (PUT)
vi.mock("../services/api", () => ({
	api: {
		patch: vi.fn(),
	},
}));

const saveMock = vi.fn();

// Função helper para renderizar o componente
const renderComponent = () => {
	render(
		<MemoryRouter initialEntries={["/admin/profile"]}>
			<AuthContext.Provider
				value={{
					session: mockSession,
					isLoading: false,
					save: saveMock,
					remove: vi.fn(),
				}}
			>
				<Routes>
					<Route path="/admin/profile" element={<ProfilePage />} />
				</Routes>
			</AuthContext.Provider>
		</MemoryRouter>,
	);
};

describe("ProfilePage (Integração)", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("deve preencher o formulário, atualizar o nome e salvar no contexto", async () => {
		const user = userEvent.setup();

		// Prepara a resposta da API (o usuário com o nome atualizado)
		const mockApiResponse = {
			data: {
				...mockUser,
				name: "Nome Atualizado", // O novo nome
				updatedAt: new Date().toISOString(),
			},
		};

		// Simula a API (com delay para testar o loading)
		(api.patch as Mock).mockImplementation(
			() =>
				new Promise((resolve) =>
					setTimeout(() => resolve(mockApiResponse), 50),
				),
		);

		renderComponent();

		const nameInput = screen.getByLabelText(/Nome/i);
		const emailInput = screen.getByLabelText(/Email/i);
		const saveButton = screen.getByTestId("profile-save-button");

		expect(nameInput).toHaveValue(mockUser.name);
		expect(emailInput).toHaveValue(mockUser.email);
		expect(saveButton).not.toBeDisabled();

		await user.clear(nameInput);
		await user.type(nameInput, "Nome Atualizado");
		await user.click(saveButton);

		// Botão deve ficar desabilitado durante o loading
		await waitFor(() => {
			const buttonAfterClick = screen.getByTestId("profile-save-button");
			expect(buttonAfterClick).toBeDisabled();
		});

		// Espera pelo resultado final (o toast)
		await waitFor(() => {
			expect(toast.success).toHaveBeenCalledWith(
				"Perfil atualizado com sucesso!",
			);
		});

		// Verifica se a API foi chamada CORRETAMENTE
		expect(api.patch).toHaveBeenCalledWith("/users/me", {
			name: "Nome Atualizado", // Apenas o nome (a senha estava vazia)
		});

		// VERIFICAÇÃO: O AuthContext foi atualizado?
		expect(saveMock).toHaveBeenCalledWith({
			token: mockSession.token, // O token antigo (mantido)
			user: mockApiResponse.data, // O objeto de usuário ATUALIZADO
		});

		// Verifica se o campo de senha foi limpo
		const passwordInput = screen.getByLabelText(/Nova Senha/i);
		expect(passwordInput).toHaveValue("");
	});
});
