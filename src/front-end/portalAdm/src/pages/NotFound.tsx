import { Link } from "react-router-dom";

import LogoImage from "../assets/flow-logo.png";
import BackgroundImage from "../assets/bg-login.png";

export function NotFound() {
	return (
		<div
			className="relative min-h-screen flex flex-col items-center justify-center bg-black font-sans px-4 bg-cover bg-center text-white text-center"
			style={{ backgroundImage: `url(${BackgroundImage})` }}
		>
			<div className="absolute inset-0 bg-black opacity-60 z-0"></div>

			<div className="relative z-10 flex flex-col items-center">
				<div className="mb-8">
					<img
						src={LogoImage}
						alt="Flow Logo"
						className="max-w-[200px] sm:max-w-xs h-auto"
					/>
				</div>

				<div className="w-full max-w-lg">
					<h1 className="text-8xl md:text-9xl font-extrabold text-white uppercase mb-4">
						404
					</h1>
					<h2 className="text-3xl md:text-4xl font-semibold mb-6">
						Página Não Encontrada
					</h2>
					<p className="text-gray-300 text-lg mb-10">
						Oops! Parece que o caminho que você tentou acessar não existe.
					</p>

					<Link
						to="/"
						className="inline-block px-8 py-3 rounded-md font-semibold transition-colors duration-200 bg-green-100 text-black hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 focus:ring-offset-black text-lg"
					>
						Voltar para o Início
					</Link>
				</div>
			</div>
		</div>
	);
}
