import { createServer } from "http";
import { createYoga, createSchema } from "graphql-yoga";
import { connectDB } from "./db/mongoose";
import { resolvers } from "./schema/resolvers";
import { typeDefs } from "./schema/typeDefs";

async function startServer(): Promise<void> {
  await connectDB();

  const yoga = createYoga({
    schema: createSchema({
      typeDefs,
      resolvers
    })
  });

  const server = createServer(yoga);

  const PORT = 4000;

  server.listen(PORT, () => {
    console.log(`Servidor GraphQL escoltant a http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error("Error en arrencar el servidor:", error);
});