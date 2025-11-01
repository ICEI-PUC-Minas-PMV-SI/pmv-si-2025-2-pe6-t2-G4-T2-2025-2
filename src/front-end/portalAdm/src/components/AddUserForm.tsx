import { useState } from "react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { api } from "../services/api";
import { z, ZodError } from "zod";

const newUserSchema = z.object({
	name: z.string().min(3, "Nome precisa de 3+ caracteres"),
	email: z.email("Email inválido"),
	password: z.string().min(6, "Senha precisa de 6+ caracteres"),
	role: z.enum(["member", "admin"]),
});

interface AddUserFormProps {
	onSuccess: () => void;
	onClose: () => void;
}

export function AddUserForm({ onSuccess, onClose }: AddUserFormProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries());

		try {
			const validatedData = newUserSchema.parse(data);

			await api.post("/users", validatedData);

			toast.success(`Usuário "${validatedData.name}" criado com sucesso!`);
			onSuccess();
		} catch (error) {
			if (error instanceof ZodError) {
				toast.error(error.issues[0].message);
			} else {
				const errorMessage = getApiErrorMessage(error);
				toast.error(errorMessage);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<InputField
				name="name"
				label="Nome Completo"
				type="text"
				placeholder="João Silva"
				required
			/>
			<InputField
				name="email"
				label="Email"
				type="email"
				placeholder="joao@email.com"
				required
			/>
			<InputField
				name="password"
				label="Senha"
				type="password"
				placeholder="Mínimo 6 caracteres"
				required
			/>

			{/* Select para a Role */}
			<div>
				<label
					htmlFor="role"
					className="block text-sm font-medium text-gray-300 mb-1"
				>
					Perfil
				</label>
				<select
					name="role"
					id="role"
					defaultValue="member"
					className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-100"
				>
					<option value="member">Membro (Member)</option>
					<option value="admin">Administrador (Admin)</option>
				</select>
			</div>

			{/* Botões de Ação */}
			<div className="flex justify-end gap-3 pt-4">
				<Button
					type="button"
					variant="danger"
					onClick={onClose}
					disabled={isLoading}
				>
					Cancelar
				</Button>
				<Button type="submit" variant="green" isLoading={isLoading}>
					Salvar Usuário
				</Button>
			</div>
		</form>
	);
}
