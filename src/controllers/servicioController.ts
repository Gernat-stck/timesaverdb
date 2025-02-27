import { Request, Response } from "express";
import Servicio, { IServicio } from "../models/Servicio";
import { servicioSchema } from "../validators/serviciosValidator";

export const crearServicio = async (req: Request, res: Response) => {
  const { error } = servicioSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const nuevoServicio = new Servicio(req.body);
    await nuevoServicio.save();
    res.status(201).json(nuevoServicio);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const actualizarServicio = async (req: Request, res: Response) => {
  const { error } = servicioSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const servicio = await Servicio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!servicio) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.json(servicio);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const obtenerServicios = async (req: Request, res: Response) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const obtenerServicio = async (req: Request, res: Response) => {
  try {
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.json(servicio);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const obtenerServiciosPorUsuario = async (
  req: Request,
  res: Response
) => {
  try {
    const servicios = await Servicio.find({ usuario: req.params.usuario });
    res.json(servicios);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const eliminarServicio = async (req: Request, res: Response) => {
  try {
    const servicio = await Servicio.findByIdAndDelete(req.params.id);
    if (!servicio) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.json({ message: "Servicio eliminado" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
