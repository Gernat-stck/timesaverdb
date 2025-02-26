import Joi from "joi";

export const ClienteSchema = Joi.object({
  nombre: Joi.string().required(),
  telefono: Joi.string(),
  email: Joi.string().email(),
  usuario: Joi.string().required(),
});
