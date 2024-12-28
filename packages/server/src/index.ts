import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { gql } from "graphql-tag";
import path = require("path");
import { resolvers } from "./graphql/resolvers";
import { client } from "./config/config";

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./graphql/schemas/schemas.graphql"), {
    encoding: "utf-8",
  }),
);

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers: resolvers });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return client;
    },
    listen: { port: 4000 },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

// INFO: START GRAPHQL SERVER (APOLLO)
startApolloServer();
