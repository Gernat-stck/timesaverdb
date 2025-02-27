// src/resolvers/index.ts
import { IResolvers } from "@graphql-tools/utils";
import { AuthRequest } from "../middlewares/authenticate";
import {
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario,
  obtenerUsuario,
  obtenerUsuarios,
  registrarUsuario,
} from "../controllers/usuarioController";
import {
  actualizarCita,
  crearCita,
  eliminarCita,
  obtenerCita,
  obtenerCitas,
  obtenerCitasPorUsuario,
} from "../controllers/citaController";
import {
  crearServicio,
  actualizarServicio,
  eliminarServicio,
  obtenerServicio,
  obtenerServicios,
  obtenerServiciosPorUsuario,
} from "../controllers/servicioController";
import {
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  obtenerCliente,
  obtenerClientes,
  obtenerClientesPorUsuario,
} from "../controllers/clienteController";

export const resolvers: IResolvers = {
  Query: {
    //Usuario Controller
    obtenerUsuarios: async () => {
      return obtenerUsuarios();
    },
    obtenerUsuario: async (_, { id }) => {
      return obtenerUsuario(id);
    },
    // Cita Controller
    obtenerCitas: async () => {
      return obtenerCitas();
    },
    obtenerCita: async (_, { id }) => {
      return obtenerCita(id);
    },
    obtenerCitasPorUsuario: async (_, { usuario }) => {
      return obtenerCitasPorUsuario(usuario);
    },
    // Servicio Controller
    obtenerServicios: async () => {
      return obtenerServicios();
    },
    obtenerServicio: async (_, { id }) => {
      return obtenerServicio(id);
    },
    obtenerServiciosPorUsuario: async (_, { usuario }) => {
      return obtenerServiciosPorUsuario(usuario);
    },
    // Cliente Controller
    obtenerClientes: async () => {
      return obtenerClientes();
    },
    obtenerCliente: async (_, { id }) => {
      return obtenerCliente(id);
    },
    obtenerClientesPorUsuario: async (_, { usuario }) => {
      return obtenerClientesPorUsuario(usuario);
    },
  },
  Mutation: {
    //Usuario Controller
    registrarUsuario: async (_, args) => {
      try {
        return await registrarUsuario(args);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
    loginUsuario: async (_, { email, password }) => {
      try {
        return await loginUsuario(email, password);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
    actualizarUsuario: async (_, args) => {
      try {
        return await actualizarUsuario(args.id, args.data);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
    eliminarUsuario: async (_, { id }) => {
      try {
        return await eliminarUsuario(id);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
    // Cita Controller
    crearCita: async (_, args) => {
      try {
        return await crearCita(args);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
    actualizarCita: async (_, args) => {
      try {
        return await actualizarCita(args.id, args.data);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
    eliminarCita: async (_, { id }) => {
      try {
        return await eliminarCita(id);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
    // Servicio Controller
    crearServicio: async (_, args) => {
      try {
        return await crearServicio(args);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
    actualizarServicio: async (_, args) => {
      try {
        return await actualizarServicio(args.id, args.data);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
    eliminarServicio: async (_, { id }) => {
      try {
        return await eliminarServicio(id);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
    // Cliente Controller
    crearCliente: async (_, args) => {
      try {
        return await crearCliente(args);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
    actualizarCliente: async (_, args) => {
      try {
        return await actualizarCliente(args.id, args.data);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
    eliminarCliente: async (_, { id }) => {
      try {
        return await eliminarCliente(id);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
  },
  Usuario: {
    citas: async (parent) => {
      return obtenerCitasPorUsuario(parent.id);
    },
    clientes: async (parent) => {
      return obtenerClientesPorUsuario(parent.id);
    },
    servicios: async (parent) => {
      return obtenerServiciosPorUsuario(parent.id);
    },
  },
  Cliente: {
    usuario: async (parent) => {
      return obtenerUsuario(parent.usuario);
    },
    citas: async (parent) => {
      return obtenerCitasPorUsuario(parent.usuario);
    },
  },
  Servicio: {
    usuario: async (parent) => {
      return obtenerUsuario(parent.usuario);
    },
    citas: async (parent) => {
      return obtenerCitasPorUsuario(parent.usuario);
    },
  },
  Cita: {
    cliente: async (parent) => {
      return obtenerCliente(parent.cliente);
    },
    servicio: async (parent) => {
      return obtenerServicio(parent.servicio);
    },
    usuario: async (parent) => {
      return obtenerUsuario(parent.usuario);
    },
  },
};
