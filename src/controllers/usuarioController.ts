import Usuario, { IUsuario } from "../models/Usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registroUsuarioSchema } from "../validators/usuarioValidator";
import { Request, Response } from "express";

export const registrarUsuario = async (req: Request, res: Response) => {
  const { error } = registroUsuarioSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { nombre, email, password } = req.body;
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    return res.status(400).json({ error: "Usuario ya registrado" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
  await nuevoUsuario.save();
  return res.status(201).json(nuevoUsuario);
};

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(400).json({ error: "El usuario no existe" });
  }

  const contraseñaCorrecta = await bcrypt.compare(password, usuario.password);
  if (!contraseñaCorrecta) {
    return res.status(400).json({ error: "Contraseña incorrecta" });
  }

  const token = jwt.sign(
    { id: usuario._id, email: usuario.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return res.status(200).json({ token, usuario });
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  return res.status(200).json(usuario);
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndDelete(id);
  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  return res.status(200).json(usuario);
};

export const obtenerUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.find();
  return res.status(200).json(usuarios);
};

export const obtenerUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);
  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  return res.status(200).json(usuario);
};
