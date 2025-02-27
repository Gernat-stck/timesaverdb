import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  type Usuario {
    id: ID!
    nombre: String!
    whatsapp: String
    email: String!
    citas: [Cita]
    clientes: [Cliente]
    servicios: [Servicio]
  }

  type Cliente {
    id: ID!
    nombre: String!
    telefono: String
    email: String
    usuario: Usuario!
    citas: [Cita]
  }

  type Servicio {
    id: ID!
    codigo: String
    nombre: String!
    descripcion: String
    precio: Float!
    duracion: Int
    categoria: String
    usuario: Usuario!
    citas: [Cita]
  }

  type Cita {
    id: ID!
    codigo: String
    cliente: Cliente!
    servicio: Servicio!
    usuario: Usuario!
    fechaInicio: Date!
    fechaFin: Date!
    estado: String
    tipoPago: String
  }

  type Query {
    obtenerUsuarios: [Usuario]
    obtenerUsuario(id: ID!): Usuario
    obtenerClientes: [Cliente]
    obtenerCliente(id: ID!): Cliente
    obtenerServicios: [Servicio]
    obtenerServicio(id: ID!): Servicio
    obtenerCitas: [Cita]
    obtenerCita(id: ID!): Cita
    obtenerCitasPorUsuario(usuario: ID!): [Cita]
    obtenerServiciosPorUsuario(usuario: ID!): [Servicio]
    obtenerClientesPorUsuario(usuario: ID!): [Cliente]
    # Agrega más queries según necesites
  }

  type Mutation {
    registrarUsuario(
      nombre: String!
      email: String!
      password: String!
    ): Usuario
    iniciarSesion(email: String!, password: String!): AuthPayload
    actualizarUsuario(id: ID!, data: UsuarioInput!): Usuario
    eliminarUsuario(id: ID!): Usuario
    crearCliente(nombre: String!, telefono: String, email: String): Cliente
    actualizarCliente(id: ID!, data: ClienteInput!): Cliente
    eliminarCliente(id: ID!): Cliente
    crearServicio(
      codigo: String
      nombre: String!
      descripcion: String
      precio: Float!
      duracion: Int
      categoria: String
    ): Servicio
    actualizarServicio(id: ID!, data: ServicioInput!): Servicio
    eliminarServicio(id: ID!): Servicio
    crearCita(
      codigo: String
      clienteId: ID!
      servicioId: ID!
      fechaInicio: Date!
      fechaFin: Date!
      estado: String
      tipoPago: String
    ): Cita
    actualizarCita(id: ID!, data: CitaInput!): Cita
    eliminarCita(id: ID!): Cita
    # Agrega más mutaciones según necesites
  }

  input UsuarioInput {
    nombre: String
    whatsapp: String
    email: String
  }

  input ClienteInput {
    nombre: String
    telefono: String
    email: String
  }

  input ServicioInput {
    codigo: String
    nombre: String
    descripcion: String
    precio: Float
    duracion: Int
    categoria: String
  }

  input CitaInput {
    codigo: String
    clienteId: ID
    servicioId: ID
    fechaInicio: Date
    fechaFin: Date
    estado: String
    tipoPago: String
  }

  type AuthPayload {
    token: String!
    usuario: Usuario!
  }
`;
