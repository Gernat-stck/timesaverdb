// src/index.ts
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { json } from "body-parser";

// Importa tus typeDefs y resolvers
import { typeDefs } from "./typesDefs";
import { resolvers } from "./resolvers";

// Importa el middleware de autenticación
import { authenticate, AuthRequest } from "./middlewares/authenticate";
// Configura las variables de entorno
dotenv.config();

// Conecta a la base de datos MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("🟢 Conectado a la base de datos"))
  .catch((err) =>
    console.error("🔴 Error al conectar a la base de datos:", err)
  );

// Crea una instancia de Express
const app = express();

// Aplica middleware de CORS y parseo de JSON
app.use(cors());
app.use(json());

// Aplica el middleware de autenticación antes de las rutas
app.use(authenticate);

// Configura Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Inicia Apollo Server y aplica su middleware a Express
(async () => {
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = (req as AuthRequest).user;
        return { user };
      },
    })
  );

  // Inicia el servidor en el puerto especificado
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en http://localhost:${PORT}/graphql`);
  });
})();
