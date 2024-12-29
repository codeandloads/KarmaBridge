import { Mutations } from "@/graphql/resolvers/mutations";
import { Queries } from "@/graphql/resolvers/queries";

export const resolvers = {
  Query: Queries,
  Mutation: Mutations,
};
