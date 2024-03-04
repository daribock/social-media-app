import { gql, ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import config from "./config/config.js";
import Post from "./models/Post.js";

const { MONGODB_URL } = config;

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err as string);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(MONGODB_URL).then(() => {
  console.log("🌱 MongoDB connected");
  server.listen({ port: 5000 }).then((res) => {
    console.log(`🚀 Server running at ${res.url}`);
  });
});
