import { AppError } from "@/utils/AppError";

if (!process.env.JWT_SECRET) {
    throw new AppError('A variável de ambiente JWT_SECRET não está definida. A aplicação não pode ser iniciada.');
}

export const authConfig = {
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: "1d"
    }
}