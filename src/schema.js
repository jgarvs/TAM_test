const {gql} = require('apollo-server-express');


module.exports = gql`
scalar Upload

type Customer {
        id: ID!
        name: String!
        surname: String!
        photoField: String
        creator: ID!
        modifier: ID!
}

type File {
        filename: String!
        mimetype: String!
        encoding: String!
      }

type User {
        id: ID!
        name: String!
        surname: String!
        email: String!
        username: String!
}

type Query {
        customers: [Customer!]
        customer( id: ID! ): Customer!
        users: [User!]
        user(id: ID!): User!
}

type Mutation {
        createCustomer(name: String!, surname: String!, photoField: String): Customer!
        updateCustomer(id: ID!, name: String, surname: String, photoField: String): Customer!
        deleteCustomer(id: ID!): Boolean!
        updateCustomerImage(id: ID!, file: Upload!): File!
        createUser(name: String!, surname: String!, email: String!, username: String!, password: String!): User!
        updateUser(id: ID!, name: String, surname: String, email: String, username: String, password: String): User!
        deleteUser(id: ID!): Boolean!
        signIn(username: String, email: String, password: String!): String!
}
`;