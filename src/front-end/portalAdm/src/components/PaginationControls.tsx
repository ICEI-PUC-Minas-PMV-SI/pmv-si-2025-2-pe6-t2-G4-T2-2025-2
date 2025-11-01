import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface PaginationControlsProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function PaginationControls({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationControlsProps) {
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	// Classe base para os botões de seta
	const arrowButtonClasses = `
    p-2 rounded-full 
    transition-colors duration-150 
    focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 focus:ring-offset-gray-900
    disabled:opacity-30 disabled:cursor-not-allowed
    text-green-100 hover:bg-gray-700
  `;

	return (
		<div className="flex items-center justify-center mt-6">
			<nav className="flex items-center space-x-4">
				{/* Botão Seta Esquerda */}
				<button
					type="button"
					onClick={handlePrevious}
					disabled={currentPage === 1}
					className={arrowButtonClasses}
					aria-label="Página anterior"
				>
					<HiChevronLeft className="h-5 w-5" />
				</button>

				{/* Texto da Página */}
				<span className="text-sm font-medium text-gray-300">
					Página <span className="font-semibold text-white">{currentPage}</span>{" "}
					de <span className="font-semibold text-white">{totalPages}</span>
				</span>

				{/* Botão Seta Direita */}
				<button
					type="button"
					onClick={handleNext}
					disabled={currentPage === totalPages}
					className={arrowButtonClasses}
					aria-label="Próxima página"
				>
					<HiChevronRight className="h-5 w-5" />
				</button>
			</nav>
		</div>
	);
}
