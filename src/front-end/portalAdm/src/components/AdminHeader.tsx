import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbUserCircle, TbSettings } from "react-icons/tb";
import { ImExit } from "react-icons/im";
import { useOutsideAlerter } from "../hooks/useOutsideAlerter";
import { MetricCard } from "./MetricCard";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { toast } from "react-hot-toast";

interface Metrics {
	totalUsers: number;
	totalTransactionsCount: number;
	totalFinancialMovement: number;
}

export function AdminHeader() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const { remove, session } = useAuth();

	const [metrics, setMetrics] = useState<Metrics | null>(null);
	const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);

	useEffect(() => {
		const fetchMetrics = async () => {
			setIsLoadingMetrics(true);
			try {
				const response = await api.get<Metrics>("/admin/metrics");
				setMetrics(response.data);
			} catch (err: unknown) {
				console.error("Erro ao buscar métricas no header:", err);
				const errorMessage = getApiErrorMessage(err);
				toast.error(`Erro Métricas: ${errorMessage}`);
			} finally {
				setIsLoadingMetrics(false);
			}
		};
		fetchMetrics();
	}, []);

	const userName = session?.user.name || "Admin";

	const handleLogout = () => {
		remove();
		navigate("/");
		setDropdownOpen(false);
	};

	useOutsideAlerter(dropdownRef, () => setDropdownOpen(false));

	return (
		<header className="bg-gray-900 shadow-md sticky top-0 z-10">
			<div className="px-6 py-2 flex flex-col sm:flex-row md:items-center md:justify-between">
				{/* === SEÇÃO DE MÉTRICAS === */}
				<div className="flex-1 mr-4">
					{isLoadingMetrics && (
						<p className="text-gray-400 text-xs">Carregando...</p>
					)}

					{metrics && !isLoadingMetrics && (
						<div className="grid grid-cols-1 sm:grid-cols-4 gap-1 md:gap-2">
							<MetricCard
								title="Usuários"
								value={metrics.totalUsers.toLocaleString("pt-BR")}
							/>
							<MetricCard
								title="Transações"
								value={metrics.totalTransactionsCount.toLocaleString("pt-BR")}
							/>
							<MetricCard
								title="Valores Movimentados"
								value={`R$ ${metrics.totalFinancialMovement.toLocaleString("pt-BR", { notation: "compact" })}`}
							/>
						</div>
					)}
				</div>

				{/* Perfil do Usuário e Dropdown */}
				<div className="relative shrink-0" ref={dropdownRef}>
					<button
						type="button"
						onClick={() => setDropdownOpen(!dropdownOpen)}
						className="flex items-center text-sm font-medium text-gray-300 hover:text-white focus:outline-none transition-colors duration-150"
						aria-haspopup="true"
						aria-expanded={dropdownOpen}
					>
						<TbUserCircle className="h-7 w-7 mr-2 rounded-full" />
						<span>Olá, {userName}</span>
						<svg
							className={`ml-1 h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<title>Ícone de seta para baixo</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>
					{/* Menu Dropdown */}
					{dropdownOpen && (
						<div
							className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="user-menu-button"
						>
							<Link
								to="profile"
								className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
								role="menuitem"
								onClick={() => setDropdownOpen(false)}
							>
								<TbSettings className="mr-2 h-4 w-4" />
								Minha Conta
							</Link>
							<button
								type="button"
								onClick={handleLogout}
								className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
								role="menuitem"
							>
								<ImExit className="mr-2 h-4 w-4" />
								Sair
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
