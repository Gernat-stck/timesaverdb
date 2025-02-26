// src/models/Usuario.ts
import { Schema, model, Document } from "mongoose";

export interface IUsuario extends Document {
  nombre: string;
  whatsapp?: string;
  email: string;
  password: string;
}

const UsuarioSchema = new Schema<IUsuario>(
  {
    nombre: { type: String, required: true },
    whatsapp: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IUsuario>("Usuario", UsuarioSchema);
