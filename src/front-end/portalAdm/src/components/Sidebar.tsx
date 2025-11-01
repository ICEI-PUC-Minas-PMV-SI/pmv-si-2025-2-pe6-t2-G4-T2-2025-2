import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LogoIcon from "/Icon-Flowpng.png";

// Ícones
import { MdDashboard } from "react-icons/md";
import { FaShareAlt, FaChevronRight } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { HiX } from "react-icons/hi";

interface SidebarProps {
	isOpen: boolean;
	toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
	const navigate = useNavigate();
	const { remove } = useAuth();

	const handleLogout = () => {
		remove();
		navigate("/");
	};

	// Estilos comuns e de estado para os links
	const linkContainerClasses = `relative flex items-center group`;
	const linkContentClasses = `
    flex items-center w-full px-2 py-2 rounded-lg 
    text-sm font-medium transition-colors duration-150 
    mx-5
  `;
	const contentInactiveClasses = `text-gray-300 hover:bg-gray-700 hover:text-white`;
	const contentActiveClasses = `bg-gray-600 text-white`;

	return (
		<>
			{/* Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 z-30 bg-black/50 md:hidden"
					onClick={toggleSidebar}
					aria-hidden="true"
				></div>
			)}

			<aside
				className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-auto md:z-auto md:flex
        `}
			>
				{/* Logo e Botão de Fechar */}
				<div className="flex items-center justify-between h-23 px-4 border-b border-gray-700">
					<div className="flex items-center">
						<img src={LogoIcon} alt="Flow Logo" className="h-10 mr-2" />
						<span className="text-xl font-bold text-white">Admin</span>
						<span className="text-xl font-bold text-green-100">Flow.</span>
					</div>
					<button
						type="button"
						onClick={toggleSidebar}
						className="text-gray-400 hover:text-white md:hidden"
						aria-label="Fechar menu"
					>
						<HiX className="h-6 w-6" />
					</button>
				</div>

				{/* Navegação Principal */}
				<nav className="flex-1 py-4 space-y-2">
					{/* NavLink para Dashboard */}
					<NavLink
						to="/admin/dashboard"
						className={linkContainerClasses}
						onClick={toggleSidebar}
					>
						{({ isActive }) => (
							<>
								{/* INDICADOR VERDE (Posicionado no NavLink) */}
								<div
									className={`
                    absolute left-0 top-0 bottom-0 
                    w-1.5 h-full 
                    rounded-r-md 
                    transition-colors duration-150
                    ${isActive ? "bg-green-100" : "bg-transparent"} 
                  `}
									aria-hidden="true"
								/>

								{/* Container do Conteúdo com Padding e Fundo Condicional */}
								<div
									className={`
                    ${linkContentClasses} 
                    ${isActive ? contentActiveClasses : contentInactiveClasses}
                  `}
								>
									<MdDashboard
										className={`mr-3 h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}
									/>
									<span
										className={`flex-1 ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}
									>
										Dashboard
									</span>
									<FaChevronRight
										className={`h-3 w-3 transition-opacity ${isActive ? "opacity-100 text-white" : "opacity-0 text-gray-400"}`}
										aria-hidden="true"
									/>
								</div>
							</>
						)}
					</NavLink>

					{/* NavLink para Usuários */}
					<NavLink
						to="/admin/users"
						className={linkContainerClasses}
						onClick={toggleSidebar}
					>
						{({ isActive }) => (
							<>
								{/* INDICADOR VERDE */}
								<div
									className={`
                    absolute left-0 top-0 bottom-0 
                    w-1.5 h-full 
                    rounded-r-md 
                    transition-colors duration-150
                    ${isActive ? "bg-green-100" : "bg-transparent"}
                  `}
									aria-hidden="true"
								/>

								{/* Container do Conteúdo com Padding e Fundo Condicional */}
								<div
									className={`
                    ${linkContentClasses} 
                    ${isActive ? contentActiveClasses : contentInactiveClasses}
                  `}
								>
									<FaShareAlt
										className={`mr-3 h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}
									/>
									<span
										className={`flex-1 ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}
									>
										Usuários
									</span>
									<FaChevronRight
										className={`h-3 w-3 transition-opacity ${isActive ? "opacity-100 text-white" : "opacity-0 text-gray-400"}`}
										aria-hidden="true"
									/>
								</div>
							</>
						)}
					</NavLink>
				</nav>

				{/* Seção de Logout */}
				<div className="px-3 py-4 border-t border-gray-700">
					<button
						type="button"
						onClick={() => {
							handleLogout();
							toggleSidebar();
						}}
						className={`${linkContainerClasses} w-full text-left`}
					>
						<div className={`${linkContentClasses} ${contentInactiveClasses}`}>
							<ImExit className="mr-3 h-5 w-5 shrink-0" />
							<span className="flex-1">Sair</span>
						</div>
					</button>
				</div>
			</aside>
		</>
	);
}
