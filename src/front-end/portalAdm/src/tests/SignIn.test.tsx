import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";

// Componentes existentes e exemplos de contexto
import { SignIn } from "../pages/SignIn";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api"; // Para o exemplo da API
import { toast } from "react-hot-toast";
import { MemoryRouter } from "react-router-dom"; // Para simular o roteador
import { navigateMock } from "./setupTests"; // Importa o mock do navigate

// 1. Exemplo da API (Axios)
vi.mock("../services/api", () => ({
	api: {
		post: vi.fn(), // Exemplo de um post
	},
}));

// 2. Exemplo do AuthContext
// Criamos uma função 'saveMock' que podemos observar
const saveMock = vi.fn();

// Função helper para renderizar o componente com todos os Providers
const renderComponent = () => {
	render(
		<MemoryRouter>
			{/* Sobrescrevemos o valor do 'save' com nosso dado de exemplo */}
			<AuthContext.Provider
				value={{
					session: null,
					isLoading: false,
					remove: vi.fn(),
					save: saveMock,
				}}
			>
				<SignIn />
			</AuthContext.Provider>
		</MemoryRouter>,
	);
};

describe("SignInPage (Integração)", () => {
	// Limpa os exemplos antes de cada teste
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("deve autenticar o usuário, salvar a sessão e redirecionar com sucesso", async () => {
		const user = userEvent.setup();

		// Retorna o token e o usuário de exemplo
		const mockApiResponse = {
			data: {
				token: "fake-jwt-token",
				user: { id: "123", name: "Admin Teste", role: "admin" },
			},
		};
		// Dizemos a API de exemplo para retornar "mockApiResponse"
		(api.post as Mock).mockImplementation(
			() =>
				new Promise((resolve) =>
					setTimeout(() => resolve(mockApiResponse), 50),
				),
		);

		renderComponent();

		// Simula a interação do usuário
		const emailInput = screen.getByLabelText("Email");
		const passwordInput = screen.getByLabelText("Senha");
		const loginButton = screen.getByRole("button", { name: /Entrar/i });

		await user.type(emailInput, "admin@flow.com.br");
		await user.type(passwordInput, "password123");
		await user.click(loginButton);

		await waitFor(() => {
			// Verifica se o toast de sucesso foi chamado
			expect(toast.success).toHaveBeenCalledWith("Login efetuado com sucesso!");
		});

		// Espera que a API tenha sido chamada com os dados corretos
		expect(api.post).toHaveBeenCalledWith("/sessions", {
			email: "admin@flow.com.br",
			password: "password123",
		});

		// Espera que a função "save" do AuthContext tenha sido chamada com a resposta da API
		expect(saveMock).toHaveBeenCalledWith(mockApiResponse.data);

		// Espera que o redirecionamento para o Dashboard tenha sido chamado
		expect(navigateMock).toHaveBeenCalledWith("/admin/dashboard");
	});
});
