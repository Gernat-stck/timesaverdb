import Joi from "joi";

export const citaSchema = Joi.object({
  cliente: Joi.string().required(),
  servicio: Joi.string().required(),
  usuario: Joi.string().required(),
  fechaInicio: Joi.date().required(),
  fechaFin: Joi.date().required(),
  estado: Joi.string(),
  tipoPago: Joi.string(),
});
