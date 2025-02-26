// src/typeDefs/index.ts
import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  type Usuario {
    id: ID!
    nombre: String!
    whatsapp: String
    email: String!
  }

  type Cliente {
    id: ID!
    nombre: String!
    telefono: String
    email: String
  }

  type Servicio {
    id: ID!
    codigo: String
    nombre: String!
    descripcion: String
    precio: Float!
    duracion: Int
    categoria: String
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
    obtenerClientes: [Cliente]
    obtenerServicios: [Servicio]
    obtenerCitas: [Cita]
    # Agrega más queries según necesites
  }

  type Mutation {
    registrarUsuario(
      nombre: String!
      email: String!
      password: String!
    ): Usuario
    iniciarSesion(email: String!, password: String!): AuthPayload
    crearCliente(nombre: String!, telefono: String, email: String): Cliente
    crearServicio(
      codigo: String
      nombre: String!
      descripcion: String
      precio: Float!
      duracion: Int
      categoria: String
    ): Servicio
    crearCita(
      codigo: String
      clienteId: ID!
      servicioId: ID!
      fechaInicio: Date!
      fechaFin: Date!
      estado: String
      tipoPago: String
    ): Cita
    # Agrega más mutaciones según necesites
  }

  type AuthPayload {
    token: String!
    usuario: Usuario!
  }
`;
