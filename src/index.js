const express = require('express');
const {ApolloServer} = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const typeDefs = require('./schema');
const models = require('./models');
const resolvers = require('./resolvers');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

db.connect(DB_HOST);

let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => {
                return { models };
        }
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: '/api' });
}

startServer();

app.listen({ port }, () => 
        console.log(`GraphSQL Server running at http://localhost:${port}${apolloServer.graphqlPath}`
        )
);