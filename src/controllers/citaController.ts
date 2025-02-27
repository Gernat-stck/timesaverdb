import Cita, { ICita } from "../models/Cita";
import { citaSchema } from "../validators/citaValidator";
import { Request, Response } from "express";

export const crearCita = async (req: Request, res: Response) => {
  const { error } = citaSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const nuevaCita = new Cita(req.body);
  await nuevaCita.save();
  return res.status(201).send(nuevaCita);
};

export const actualizarCita = async (req: Request, res: Response) => {
  const { error } = citaSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const cita = await Cita.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!cita) {
    return res.status(404).send("Cita no encontrada");
  }
  return res.status(200).send(cita);
};

export const obtenerCitas = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const citas = await Cita.find();
  return res.status(200).send(citas);
};

export const obtenerCita = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const cita = await Cita.findById(req.params.id);
  if (!cita) {
    return res.status(404).send("Cita no encontrada");
  }
  return res.status(200).send(cita);
};

export const eliminarCita = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const cita = await Cita.findByIdAndDelete(req.params.id);
  if (!cita) {
    return res.status(404).send("Cita no encontrada");
  }
  return res.status(200).send(cita);
};

export const obtenerCitasPorUsuario = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const citas = await Cita.find({ usuario: req.params.usuario });
  return res.status(200).send(citas);
};
