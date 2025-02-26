import Cliente, { ICliente } from "../models/Cliente";
import { ClienteSchema } from "../validators/clienteValidator";

export const crearCliente = async (args: ICliente) => {
  const { error } = ClienteSchema.validate(args);
  if (error) throw new Error(error.message);
  return await Cliente.create(args);
};

export const obtenerClientes = async () => {
  return await Cliente.find();
};

export const obtenerCliente = async (id: string) => {
  return await Cliente.findById(id);
};

export const actualizarCliente = async (id: string, data: ICliente) => {
  const { error } = ClienteSchema.validate(data);
  if (error) throw new Error(error.message);
  return await Cliente.findByIdAndUpdate(id, data, { new: true });
};

export const eliminarCliente = async (id: string) => {
  return await Cliente.findByIdAndDelete(id);
};

export const obtenerClientesPorUsuario = async (usuario: string) => {
  return await Cliente.find({ usuario });
};
