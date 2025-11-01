import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
}

export function InputField({ label, id, name, ...rest }: InputFieldProps) {
	return (
		<div className="mb-4">
			<label
				htmlFor={id || name}
				className="block text-sm font-medium text-gray-300 mb-1"
			>
				{label}
			</label>
			<input
				id={id || name}
				name={name}
				{...rest}
				className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-transparent"
			/>
		</div>
	);
}
