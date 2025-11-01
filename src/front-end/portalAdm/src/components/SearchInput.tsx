import { HiSearch } from "react-icons/hi";

interface SearchInputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

export function SearchInput({
	value,
	onChange,
	placeholder = "Buscar...",
}: SearchInputProps) {
	return (
		<div className="relative w-full">
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<HiSearch className="h-5 w-5 text-gray-400" />
			</div>

			<input
				type="text"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="
          w-full pl-10 pr-4 py-2 bg-transparent border-0 border-b border-gray-600 rounded-none text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-green-100"
			/>
		</div>
	);
}
