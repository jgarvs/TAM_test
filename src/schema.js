const {gql} = require('apollo-server-express');

module.exports = gql`
type Customer {
        id: ID!
        name: String!
        surname: String!
        photoField: String
        creator: ID!
        modifier: ID!
}
type User {
        id: ID!
        name: String!
}
type Query {
        customers: [Customer!]
        customer( id: ID! ): Customer!
}
type Mutation {
        createCustomer(name: String!, surname: String!, photoField: String): Customer!
        updateCustomer(id: ID!, name: String, surname: String, photoField: String): Customer!
        deleteCustomer(id: ID!): Boolean!
}
`;