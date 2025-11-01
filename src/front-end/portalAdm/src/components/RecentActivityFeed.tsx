import { TbUserPlus, TbReceipt } from "react-icons/tb";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import type { ActivityItem } from "../types";

interface RecentActivityFeedProps {
	activities: ActivityItem[];
	isLoading?: boolean;
}

// Renderizar o ícone correto
const renderIcon = (type: ActivityItem["type"]) => {
	switch (type) {
		case "USER_REGISTERED":
			return <TbUserPlus className="h-5 w-5 text-blue-400" />;
		case "TRANSACTION_CREATED":
			return <TbReceipt className="h-5 w-5 text-yellow-400" />;
		default:
			return null;
	}
};

// Formatar a data
const formatTimestamp = (timestamp: string): string => {
	try {
		const date = new Date(timestamp);

		return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
	} catch (e) {
		return "Data inválida";
	}
};

export function RecentActivityFeed({
	activities,
	isLoading = false,
}: RecentActivityFeedProps) {
	if (isLoading) {
		return (
			<p className="text-gray-400 text-center py-4">Carregando atividades...</p>
		);
	}

	if (activities.length === 0) {
		return (
			<p className="text-gray-500 text-center py-4">
				Nenhuma atividade recente.
			</p>
		);
	}

	return (
		<div className="flow-root">
			<ul className="-mb-8">
				{activities.map((activity, activityIdx) => (
					<li key={activity.id}>
						<div className="relative pb-8">
							{activityIdx !== activities.length - 1 ? (
								<span
									className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-700"
									aria-hidden="true"
								/>
							) : null}

							<div className="relative flex space-x-3 items-start">
								{/* Ícone */}
								<div>
									<span className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center ring-4 ring-gray-800">
										{renderIcon(activity.type)}
									</span>
								</div>
								{/* Conteúdo da Atividade */}
								<div className="min-w-0 flex-1 pt-1.5">
									<p className="text-sm text-gray-300">
										{activity.type === "USER_REGISTERED" && (
											<>
												Novo usuário registrado:{" "}
												<span className="font-medium text-white">
													{activity.userName || "Usuário"}
												</span>
											</>
										)}
										{activity.type === "TRANSACTION_CREATED" && (
											<>
												Nova transação:{" "}
												<span className="font-medium text-white">
													{activity.transactionDescription || "Transação"}
												</span>
												{activity.transactionAmount !== undefined && (
													<span
														className={`ml-1 ${activity.transactionType === "income" ? "text-green-400" : "text-red-400"}`}
													>
														(R${" "}
														{activity.transactionAmount.toLocaleString(
															"pt-BR",
															{ minimumFractionDigits: 2 },
														)}
														)
													</span>
												)}
											</>
										)}
									</p>
									{/* Timestamp */}
									<p className="mt-0.5 text-xs text-gray-500">
										{formatTimestamp(activity.timestamp)}
									</p>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
