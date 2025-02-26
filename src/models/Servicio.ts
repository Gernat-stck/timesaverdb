// src/models/Servicio.ts
import { Schema, model, Document } from "mongoose";

export interface IServicio extends Document {
  codigo?: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  duracion?: number; // En minutos
  categoria?: string;
  usuario?: string;
}

const ServicioSchema = new Schema<IServicio>({
  codigo: String,
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  duracion: Number,
  categoria: String,
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
});

export default model<IServicio>("Servicio", ServicioSchema);
