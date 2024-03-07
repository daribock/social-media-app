import { Resolvers } from "../../generated/graphql.js";
import postsResolvers from "./posts.js";
// import usersResolvers from "./users.js";

const resolvers = {
  Query: {
    ...postsResolvers.Query,
  },
};

export default resolvers;
