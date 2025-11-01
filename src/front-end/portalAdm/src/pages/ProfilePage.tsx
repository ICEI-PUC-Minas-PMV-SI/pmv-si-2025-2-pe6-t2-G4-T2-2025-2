import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { api } from "../services/api";
import { z, ZodError } from "zod";

const updateSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(3, { message: "Nome deve ter pelo menos 3 caracteres." })
			.optional(),
		password: z
			.string()
			.min(6, { message: "Senha deve ter pelo menos 6 caracteres." })
			.optional(),
	})
	.refine((data) => data.name !== undefined || data.password !== undefined, {
		message: "Pelo menos um dos campos (nome ou senha) deve ser fornecido.",
	});

export function ProfilePage() {
	const { session, save } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const [name, setName] = useState(session?.user?.name || "");
	const [password, setPassword] = useState("");

	const displayEmail = session?.user?.email || "Carregando...";

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const dataToUpdate: { name?: string; password?: string } = {};

		if (name && name !== session?.user?.name) {
			dataToUpdate.name = name;
		}

		if (password) {
			dataToUpdate.password = password;
		}

		try {
			const validatedData = updateSchema.parse(dataToUpdate);

			const response = await api.patch("/users/me", validatedData);

			if (session) {
				save({ ...session, user: response.data });
			}

			toast.success("Perfil atualizado com sucesso!");
			setPassword("");
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
		<div>
			<h1 className="text-3xl font-bold text-white mb-8">Minha Conta</h1>

			<div className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700 max-w-xl mx-auto">
				<form onSubmit={handleSubmit} className="max-w-lg">
					<InputField
						name="email"
						label="Email (não pode ser alterado)"
						type="email"
						value={displayEmail}
						disabled={true}
						readOnly
					/>

					<InputField
						name="name"
						label="Nome"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Seu nome completo"
						required
					/>

					<InputField
						name="password"
						label="Nova Senha"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Deixe em branco para manter a atual"
					/>

					<div className="flex justify-end mt-6">
						<Button type="submit" variant="green" isLoading={isLoading}>
							Salvar Alterações
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
