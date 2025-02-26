import Cita, { ICita } from "../models/Cita";
import { citaSchema } from "../validators/citaValidator";

export const crearCita = async (args: ICita) => {
  const { error } = citaSchema.validate(args);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const nuevaCita = new Cita(args);
  await nuevaCita.save();
  return nuevaCita;
};

export const actualizarCita = async (id: string, args: ICita) => {
  const { error } = citaSchema.validate(args);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const cita = await Cita.findByIdAndUpdate(id, args, { new: true });
  if (!cita) {
    throw new Error("Cita no encontrada");
  }
  return cita;
};

export const obtenerCitas = async (): Promise<ICita[]> => {
  const citas = await Cita.find();
  return citas;
};

export const obtenerCita = async (id: string): Promise<ICita> => {
  const cita = await Cita.findById(id);
  if (!cita) {
    throw new Error("Cita no encontrada");
  }
  return cita;
};

export const eliminarCita = async (id: string): Promise<ICita> => {
  const cita = await Cita.findByIdAndDelete(id);
  if (!cita) {
    throw new Error("Cita no encontrada");
  }
  return cita;
};

export const obtenerCitasPorUsuario = async (
  usuario: string
): Promise<ICita[]> => {
  const citas = await Cita.find({ usuario });
  return citas;
};
