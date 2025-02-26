import Joi from "joi";

export const servicioSchema = Joi.object({
  codigo: Joi.string().required(),
  nombre: Joi.string().required(),
  precio: Joi.number().required(),
  descripcion: Joi.string().required(),
  categoria: Joi.string().required(),
  duracion: Joi.number().required(),
  usuario: Joi.string().required(),
});
