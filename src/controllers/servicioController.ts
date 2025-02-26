import Servicio, { IServicio } from "../models/Servicio";
import { servicioSchema } from "../validators/serviciosValidator";

export const crearServicio = async (args: IServicio) => {
  const { error } = servicioSchema.validate(args);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const nuevoServicio = new Servicio(args);
  await nuevoServicio.save();
  return nuevoServicio;
};

export const actualizarServicio = async (id: string, args: IServicio) => {
  const { error } = servicioSchema.validate(args);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const servicio = await Servicio.findByIdAndUpdate(id, args, { new: true });
  if (!servicio) {
    throw new Error("Servicio no encontrado");
  }
  return servicio;
};

export const obtenerServicios = async (): Promise<IServicio[]> => {
  const servicios = await Servicio.find();
  return servicios;
};

export const obtenerServicio = async (id: string): Promise<IServicio> => {
  const servicio = await Servicio.findById(id);
  if (!servicio) {
    throw new Error("Servicio no encontrado");
  }
  return servicio;
};

export const obtenerServiciosPorUsuario = async (
  usuario: string
): Promise<IServicio[]> => {
  const servicios = await Servicio.find({ usuario });
  return servicios;
};

export const eliminarServicio = async (id: string): Promise<IServicio> => {
  const servicio = await Servicio.findByIdAndDelete(id);
  if (!servicio) {
    throw new Error("Servicio no encontrado");
  }
  return servicio;
};
