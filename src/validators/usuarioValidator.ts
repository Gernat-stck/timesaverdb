import Joi from "joi";

export const registroUsuarioSchema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  whatsapp: Joi.string().optional(),
});
