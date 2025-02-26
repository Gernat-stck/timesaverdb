// src/models/Cliente.ts
import { Schema, model, Document } from "mongoose";

export interface ICliente extends Document {
  nombre: string;
  telefono?: string;
  email?: string;
  usuario?: string;
}

const ClienteSchema = new Schema<ICliente>({
  nombre: { type: String, required: true },
  telefono: String,
  email: {
    type: String,
    unique: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

export default model<ICliente>("Cliente", ClienteSchema);
