import { HiX } from "react-icons/hi";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
	if (!isOpen) {
		return null;
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-in fade-in duration-200"
			onClick={onClose}
		>
			{/* Modal Card (Container) */}
			<div
				className="relative w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg animate-in zoom-in-90 duration-300"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Cabeçalho */}
				<div className="flex items-center justify-between pb-4 border-b border-gray-700">
					<h3 className="text-xl font-semibold text-white">{title}</h3>
					<button
						type="button"
						onClick={onClose}
						className="text-gray-400 hover:text-white transition-colors"
						aria-label="Fechar modal"
					>
						<HiX className="h-6 w-6" />
					</button>
				</div>

				{/* Corpo (Conteúdo dinâmico) */}
				<div className="mt-4">{children}</div>
			</div>
		</div>
	);
}
