import { BiLoaderCircle } from "react-icons/bi";

interface LoadingOverlayProps {
	isLoading: boolean;
	fullScreen?: boolean;
}

export function LoadingOverlay({ isLoading, fullScreen }: LoadingOverlayProps) {
	if (!isLoading) return null;

	const positionClasses = fullScreen ? "fixed inset-0" : "absolute inset-0";

	return (
		<main
			className={`flex items-center justify-center bg-gray-100/70 z-50 transition-opacity duration-300 ${positionClasses}`}
			aria-live="polite"
		>
			<div className="flex flex-col items-center space-y-3 p-6 bg-black rounded-xl shadow-2xl">
				<BiLoaderCircle size={36} className="animate-spin text-green-100" />
				<p className="text-sm font-medium text-gray-700">Carregando...</p>
			</div>
		</main>
	);
}