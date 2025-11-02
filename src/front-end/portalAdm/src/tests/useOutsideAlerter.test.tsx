import React, { useRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { useOutsideAlerter } from "../hooks/useOutsideAlerter";

// 1. Componente de teste que usa o hook
const TestComponent = ({ callback }: { callback: () => void }) => {
	const insideRef = useRef<HTMLDivElement>(null);

	useOutsideAlerter(insideRef, callback);

	return (
		<div data-testid="outside-area">
			<div ref={insideRef} data-testid="inside-area">
				Clique aqui dentro
			</div>
		</div>
	);
};

describe("useOutsideAlerter (Hook)", () => {
	it("deve chamar o callback quando o usuário clicar FORA do elemento", async () => {
		// Função que fica monitoreando os cliques fora do elemento
		const mockCallback = vi.fn();
		const user = userEvent.setup();

		render(<TestComponent callback={mockCallback} />);

		// Encontra o elemento externo
		const outsideElement = screen.getByTestId("outside-area");

		// Simula um clique do usuário no elemento EXTERNO
		await user.click(outsideElement);

		// Verifica se a função que monitora os cliques foi chamada
		expect(mockCallback).toHaveBeenCalledTimes(1);
	});

	it("NÃO deve chamar o callback quando o usuário clicar DENTRO do elemento", async () => {
		const mockCallback = vi.fn();
		const user = userEvent.setup();

		render(<TestComponent callback={mockCallback} />);

		// Encontra o elemento interno
		const insideElement = screen.getByTestId("inside-area");

		// Simula um clique do usuário no elemento INTERNO
		await user.click(insideElement);

		// Verifica se a função espiã NÃO foi chamada
		expect(mockCallback).not.toHaveBeenCalled();
	});
});
