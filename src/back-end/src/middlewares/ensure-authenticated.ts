import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";    

interface TokenPayLoad {
    role: string
    sub: string
    iat: number
    exp: number
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new AppError("JWT Token não encontrado", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const {role, sub} = verify(token, authConfig.jwt.secret) as TokenPayLoad

        request.user = {
            id: sub,
            role
        }

        return next()
        
    } catch (error) {
        throw new AppError("JWT Token inválido", 401)
    }

}

export { ensureAuthenticated }