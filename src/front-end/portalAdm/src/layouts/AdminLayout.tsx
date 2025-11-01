import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { AdminHeader } from "../components/AdminHeader";
import { HiMenu } from "react-icons/hi";

export function AdminLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex h-screen bg-black">
			<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

			{/* Wrapper para Header e Conteúdo Principal */}
			<div className="flex flex-col flex-1">
				{/* Cabeçalho Mobile com Botão Hamburger */}
				<div className="bg-gray-900 shadow-md md:hidden sticky top-0 z-20">
					<div className="px-4 h-16 flex items-center justify-between">
						<button
							type="button"
							onClick={toggleSidebar}
							className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-100"
							aria-label="Abrir menu"
						>
							<HiMenu className="h-6 w-6" />
						</button>
						<span className="text-lg font-bold text-green-100">Flow Admin</span>
					</div>
				</div>

				<AdminHeader />

				{/* Área de Conteúdo Principal */}
				<main className="flex-1 overflow-y-auto bg-black text-white p-6 md:p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
