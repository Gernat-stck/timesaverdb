import Cliente, { ICliente } from "../models/Cliente";
import { ClienteSchema } from "../validators/clienteValidator";
import { Request, Response } from "express";

export const crearCliente = async (req: Request, res: Response) => {
  const { error } = ClienteSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  const cliente = await Cliente.create(req.body);
  res.status(201).send(cliente);
};

export const obtenerClientes = async (req: Request, res: Response) => {
  const clientes = await Cliente.find();
  res.status(200).send(clientes);
};

export const obtenerCliente = async (req: Request, res: Response) => {
  const cliente = await Cliente.findById(req.params.id);
  if (!cliente) return res.status(404).send("Cliente no encontrado");
  res.status(200).send(cliente);
};

export const actualizarCliente = async (req: Request, res: Response) => {
  const { error } = ClienteSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!cliente) return res.status(404).send("Cliente no encontrado");
  res.status(200).send(cliente);
};

export const eliminarCliente = async (req: Request, res: Response) => {
  const cliente = await Cliente.findByIdAndDelete(req.params.id);
  if (!cliente) return res.status(404).send("Cliente no encontrado");
  res.status(200).send("Cliente eliminado");
};

export const obtenerClientesPorUsuario = async (
  req: Request,
  res: Response
) => {
  const clientes = await Cliente.find({ usuario: req.params.usuario });
  res.status(200).send(clientes);
};
