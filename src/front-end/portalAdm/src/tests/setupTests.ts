import "@testing-library/jest-dom";
import { vi } from "vitest";

// Exemplo global para a biblioteca "react-hot-toast"
vi.mock("react-hot-toast", () => ({
	toast: {
		success: vi.fn(), // Simula a função toast.success
		error: vi.fn(), // Simula a função toast.error
	},
}));

// Exemplo global para o "useNavigate" do react-router-dom
// Função "navigateMock" que sera observada nos testes
export const navigateMock = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
	const mod = await importOriginal<typeof import("react-router-dom")>();
	return {
		...mod,
		useNavigate: () => navigateMock, // Sempre que 'useNavigate' for chamado, retorna nosso exmplo
	};
});
