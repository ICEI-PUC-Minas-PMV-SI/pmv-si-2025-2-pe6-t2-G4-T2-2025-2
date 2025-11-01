import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { z, ZodError } from "zod";
import { api } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

import LogoIcon from "../assets/flow-logo.png";
import BackgroundImage from "../assets/bg-login.png";

const signInSchema = z.object({
	email: z.email("Email inválido"),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignInState = {
	error?: string;
	success?: boolean;
};

export function SignIn() {
	const { save } = useAuth();
	const navigate = useNavigate();

	const [state, formAction, isLoading] = useActionState(handleSignIn, {
		error: undefined,
		success: false,
	});

	async function handleSignIn(
		previousState: SignInState,
		formData: FormData,
	): Promise<SignInState> {
		try {
			const data = signInSchema.parse({
				email: formData.get("email"),
				password: formData.get("password"),
			});

			const response = await api.post("/sessions", data);

			save(response.data);

			toast.success("Login efetuado com sucesso!");
			navigate("/admin/dashboard");

			return { success: true };
		} catch (error) {
			if (error instanceof ZodError) {
				const zodMessage = error.issues[0].message;
				return toast.error(zodMessage), { error: zodMessage };
			}

			const errorMessage = getApiErrorMessage(error);
			return toast.error(errorMessage), { error: errorMessage };
		}
	}

	return (
		<div className="relative min-h-screen bg-black default-font-family">
			{/* Background mobile */}
			<div className="absolute inset-0 bg-linear-to-r from-green-1000 via-green-900 to-black z-0 md:hidden"></div>

			{/* Background desktop */}
			<div
				className="absolute inset-0 bg-cover bg-center z-0 hidden md:block"
				style={{ backgroundImage: `url(${BackgroundImage})` }}
			></div>

			<div className="absolute top-6 right-6 md:top-8 md:right-8 z-10">
				<img
					src={LogoIcon}
					alt="Flow Logo"
					className="max-w-[150px] sm:max-w-[100px] h-auto"
				/>
			</div>

			<div className="min-h-screen flex items-center justify-center md:justify-end px-4 sm:px-8 md:px-16 lg:px-24">
				<div className="w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-lg relative z-10">
					{/* Estilo do card */}
					<div className="flex flex-col items-center">
						<h1 className="text-3xl font-bold text-center text-white">
							Portal Login
						</h1>
						<p className="text-gray-400">Bom te ver de novo!</p>
					</div>
					<form action={formAction} className="mt-6">
						<InputField
							name="email"
							label="Email"
							type="email"
							placeholder="seuemail@flow.com.br"
							required
						/>

						<InputField
							name="password"
							label="Senha"
							type="password"
							placeholder="********"
							required
						/>

						{/*
						{state?.error && (
							<p className="text-red-500 text-sm text-center mb-4">
								{state.error}
							</p>
						)}
						*/}

						<div className="flex items-center justify-center">
							<Button type="submit" disabled={isLoading}>
								{isLoading ? "Entrando..." : "Entrar"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
