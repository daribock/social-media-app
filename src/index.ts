import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { readFileSync } from 'fs';

import config from './config/config.js';
import resolvers from './graphql/resolvers/index.js';

// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const typeDefs = readFileSync('./src/graphql/schema.graphql', {
    encoding: 'utf-8',
});

const { MONGODB_URL } = config;

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(MONGODB_URL).then(() => {
    console.log('🌱 MongoDB connected');
    server.listen({ port: 5000 }).then((res) => {
        console.log(`🚀 Server running at ${res.url}`);
    });
});
