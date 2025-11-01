interface ButtonProps {
	type: "submit" | "button";
	onClick?: () => void;
	children: React.ReactNode;
	disabled?: boolean;
	fullWidth?: boolean; // Aplica largura total se necessário
	variant?: "primary" | "danger" | "green";
	size?: "default" | "icon";
	className?: string;
	isLoading?: boolean;
}

export function Button({
	type,
	onClick,
	children,
	disabled = false,
	fullWidth = false,
	variant = "primary",
	size = "default",
	className = "",
	isLoading = false,
}: ButtonProps) {
	const baseClasses = `
    font-semibold transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50
    flex items-center justify-center
  `;
	const variantClasses = {
		primary: "bg-green-100 text-black hover:brightness-90",
		danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
		green: "bg-green-100 hover:bg-green-200 text-black",
	};
	const sizeClasses = {
		default: "px-6 py-2 rounded-md",
		icon: "rounded-full",
	};
	const cursorClass = isLoading
		? "cursor-progress"
		: disabled
			? "cursor-not-allowed"
			: "";

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled || isLoading}
			className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : "w-auto"}
        ${cursorClass}
        ${className} 
      `}
		>
			{children}
		</button>
	);
}
