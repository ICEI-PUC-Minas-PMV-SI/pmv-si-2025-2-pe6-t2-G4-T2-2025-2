export function getApiErrorMessage(error: unknown): string {
	// Caso padrão
	const defaultMessage = "Ocorreu um erro inesperado. Tente novamente.";

	if (typeof error === "object" && error !== null) {
		// Verifica se é um erro do Axios com uma resposta da API
		if ("response" in error && error.response) {
			const response = error.response as { data?: { message?: string } };

			if (response.data && typeof response.data.message === "string") {
				return response.data.message;
			}
		}

		// Verifica se é um erro padrão (ex: erro de rede)
		if ("message" in error && typeof error.message === "string") {
			return error.message;
		}
	}

	// Se for qualquer outra coisa (string, etc.)
	if (typeof error === "string" && error.length > 0) {
		return error;
	}

	return defaultMessage;
}
