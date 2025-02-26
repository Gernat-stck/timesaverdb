// src/models/Cita.ts
import { Schema, model, Document, Types } from "mongoose";

export interface ICita extends Document {
  codigo?: string;
  cliente: Types.ObjectId;
  servicio: Types.ObjectId;
  usuario: Types.ObjectId;
  fechaInicio: Date;
  fechaFin: Date;
  estado?: string;
  tipoPago?: string;
}

const CitaSchema = new Schema<ICita>({
  codigo: String,
  cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
  servicio: { type: Schema.Types.ObjectId, ref: "Servicio", required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  estado: String,
  tipoPago: String,
});

export default model<ICita>("Cita", CitaSchema);
