import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// Importe o Layout e o Contexto
import { AdminLayout } from "../layouts/AdminLayout";
import { AuthContext } from "../contexts/AuthContext";

// Criamos exemplos dos componentes Sidebar e AdminHeader
vi.mock("../components/Sidebar", () => ({
	Sidebar: ({ isOpen }: { isOpen: boolean }) => (
		<aside data-testid="sidebar" data-isopen={isOpen ? "true" : "false"}>
			<a href="/admin/dashboard">Dashboard</a>
		</aside>
	),
}));
vi.mock("../components/AdminHeader", () => ({
	AdminHeader: () => <header data-testid="admin-header"></header>,
}));

// Função para renderizar o layout
const renderComponent = () => {
	render(
		<MemoryRouter initialEntries={["/admin/dashboard"]}>
			<AuthContext.Provider
				value={{
					session: {
						token: "mock-token-123",
						user: {
							id: "mock-admin-id",
							name: "Admin Mock",
							email: "admin@mock.com",
							role: "admin",
						},
					}, // Simula sessão de admin
					isLoading: false,
					save: vi.fn(),
					remove: vi.fn(),
				}}
			>
				<Routes>
					<Route path="/admin" element={<AdminLayout />}>
						<Route path="dashboard" element={<div>Página de Dashboard</div>} />
					</Route>
				</Routes>
			</AuthContext.Provider>
		</MemoryRouter>,
	);
};

describe("AdminLayout (Integração)", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("deve alternar a visibilidade da sidebar (mobile) ao clicar no botão hamburger", async () => {
		const user = userEvent.setup();
		renderComponent();

		// O botão de "Abrir menu"
		const hamburgerButton = screen.getByLabelText(/Abrir menu/i);
		// A Sidebar
		const sidebar = screen.getByTestId("sidebar");

		// Verifica se a Sidebar pode ser fechada
		expect(sidebar.getAttribute("data-isopen")).toBe("false");

		// Simula o Clique para Abrir
		await user.click(hamburgerButton);

		// Verifica se a Sidebar pode ser aberta
		expect(sidebar.getAttribute("data-isopen")).toBe("true");

		// Simula o Clique para Fechar
		await user.click(hamburgerButton);

		// Verifica se a Sidebar pode ser fechada novamente
		expect(sidebar.getAttribute("data-isopen")).toBe("false");
	});
});
