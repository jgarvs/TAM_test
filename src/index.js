const express = require('express');
const {ApolloServer} = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const typeDefs = require('./schema');
const models = require('./models');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');
const { graphqlUploadExpress } = require('graphql-upload');
const helmet = require('helmet');
const cors = require('cors');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

const getUser = token => {
        if(token){
                try{
                        return jwt.verify(token, process.env.JWT_SECRET);
                } catch (err) {
                        throw new Error('Session invalid')
                }
        }
}

async function startApolloServer(typeDefs, resolvers, models){
        let apolloServer = new ApolloServer({
                typeDefs,
                resolvers,
                context: ({ req }) => {
                        const token = req.headers.authorization;
                        const user = getUser(token);
                        //console.log(user);
                        return { models , user};
                }
        });
        const app = express();
        app.use(helmet());
        app.use(cors());
        app.use(graphqlUploadExpress());

        await apolloServer.start();
        

        apolloServer.applyMiddleware({ app, path: '/api' });

        app.listen({ port }, () => 
                console.log(`GraphSQL Server running at http://localhost:${port}${apolloServer.graphqlPath}`)
        );
}

startApolloServer(typeDefs, resolvers, models);