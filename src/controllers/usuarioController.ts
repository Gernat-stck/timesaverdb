import Usuario, { IUsuario } from "../models/Usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registroUsuarioSchema } from "../validators/usuarioValidator";

export const registrarUsuario = async (data: {
  nombre: string;
  email: string;
  password: string;
}): Promise<IUsuario> => {
  const { error } = registroUsuarioSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const { nombre, email, password } = data;
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    throw new Error("Usuario ya registrado");
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
  await nuevoUsuario.save();
  return nuevoUsuario;
};

export const loginUsuario = async (
  email: string,
  password: string
): Promise<{ token: string; usuario: IUsuario }> => {
  // Buscar al usuario por email
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    throw new Error("El usuario no existe");
  }

  // Verificar la contraseña
  const contraseñaCorrecta = await bcrypt.compare(password, usuario.password);
  if (!contraseñaCorrecta) {
    throw new Error("Contraseña incorrecta");
  }

  // Generar el token JWT
  const token = jwt.sign(
    { id: usuario._id, email: usuario.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return { token, usuario };
};

export const actualizarUsuario = async (
  id: string,
  data: { nombre: string; email: string; whatsapp?: string }
): Promise<IUsuario> => {
  const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true });
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }
  return usuario;
};

export const eliminarUsuario = async (id: string): Promise<IUsuario> => {
  const usuario = await Usuario.findByIdAndDelete(id);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }
  return usuario;
};

export const obtenerUsuarios = async (): Promise<IUsuario[]> => {
  return await Usuario.find();
};

export const obtenerUsuario = async (id: string): Promise<IUsuario> => {
  const usuario = await Usuario.findById(id);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }
  return usuario;
};
