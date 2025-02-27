// src/routes.ts
import { Router } from "express";
import {
  crearCita,
  actualizarCita,
  eliminarCita,
  obtenerCita,
  obtenerCitas,
  obtenerCitasPorUsuario,
} from "./controllers/citaController";
import {
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  obtenerCliente,
  obtenerClientes,
  obtenerClientesPorUsuario,
} from "./controllers/clienteController";
import {
  crearServicio,
  actualizarServicio,
  eliminarServicio,
  obtenerServicio,
  obtenerServicios,
  obtenerServiciosPorUsuario,
} from "./controllers/servicioController";
import {
  registrarUsuario,
  loginUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuario,
  obtenerUsuarios,
} from "./controllers/usuarioController";

const router = Router();

// Rutas para citas
router.post("/citas", crearCita);
router.put("/citas/:id", actualizarCita);
router.delete("/citas/:id", eliminarCita);
router.get("/citas/:id", obtenerCita);
router.get("/citas", obtenerCitas);
router.get("/citas/usuario/:usuario", obtenerCitasPorUsuario);

// Rutas para clientes
router.post("/clientes", crearCliente);
router.put("/clientes/:id", actualizarCliente);
router.delete("/clientes/:id", eliminarCliente);
router.get("/clientes/:id", obtenerCliente);
router.get("/clientes", obtenerClientes);
router.get("/clientes/usuario/:usuario", obtenerClientesPorUsuario);

// Rutas para servicios
router.post("/servicios", crearServicio);
router.put("/servicios/:id", actualizarServicio);
router.delete("/servicios/:id", eliminarServicio);
router.get("/servicios/:id", obtenerServicio);
router.get("/servicios", obtenerServicios);
router.get("/servicios/usuario/:usuario", obtenerServiciosPorUsuario);

// Rutas para usuarios
router.post("/usuarios/registro", registrarUsuario);
router.post("/usuarios/login", loginUsuario);
router.put("/usuarios/:id", actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);
router.get("/usuarios/:id", obtenerUsuario);
router.get("/usuarios", obtenerUsuarios);

export default router;
