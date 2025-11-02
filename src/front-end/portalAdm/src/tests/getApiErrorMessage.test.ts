import { describe, it, expect } from "vitest";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

describe("getApiErrorMessage (Utility)", () => {
	// Teste 1: Erro do Axios
	it("deve retornar a mensagem de erro específica da API (Axios)", () => {
		// Simula um erro do Axios onde a API respondeu com um erro
		const mockError = {
			response: {
				data: {
					message: "Credenciais inválidas",
				},
			},
		};
		const message = getApiErrorMessage(mockError);
		expect(message).toBe("Credenciais inválidas");
	});

	// Teste 2: Erro padrão do JavaScript (ex: erro de rede)
	it("deve retornar a mensagem de um erro padrão do JavaScript", () => {
		const mockError = new Error("Network Error");
		const message = getApiErrorMessage(mockError);
		expect(message).toBe("Network Error");
	});

	// Teste 3: Erro de string (quando algo dá 'throw "Erro!"')
	it("deve retornar a própria string se o erro for uma string", () => {
		const mockError = "Erro de string";
		const message = getApiErrorMessage(mockError);
		expect(message).toBe("Erro de string");
	});

	// Teste 4: Erro desconhecido ou nulo
	it("deve retornar a mensagem padrão para erros desconhecidos", () => {
		const mockError = null;
		const message = getApiErrorMessage(mockError);
		expect(message).toBe("Ocorreu um erro inesperado. Tente novamente.");
	});

	it("deve retornar a mensagem padrão para um objeto vazio", () => {
		const mockError = {};
		const message = getApiErrorMessage(mockError);
		expect(message).toBe("Ocorreu um erro inesperado. Tente novamente.");
	});
});
