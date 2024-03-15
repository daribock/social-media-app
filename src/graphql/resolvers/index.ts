import { Resolvers } from "../../generated/graphql.js";
import postsResolvers from "./posts.js";
import usersResolvers from "./users.js";

// TODO: Type this with resolvers
const resolvers = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};

export default resolvers;
