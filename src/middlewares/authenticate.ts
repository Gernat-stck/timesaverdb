// src/middlewares/authenticate.ts
import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUsuario } from "../models/Usuario";

export interface AuthRequest extends Request {
  user?: IUsuario;
}

export const authenticate: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const [bearer, token] = authHeader.split(" ");
    if (bearer === "Bearer" && token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as IUsuario;
        (req as AuthRequest).user = decoded;
        next();
      } catch (err) {
        console.error("Error al verificar el token:", err);
        res.status(401).json({ message: "Token inválido o expirado" });
      }
    } else {
      res.status(401).json({ message: "Formato de token inválido" });
    }
  } else {
    res.status(401).json({ message: "No se proporcionó un token" });
  }
};
