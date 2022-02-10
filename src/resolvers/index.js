const { GraphQLUpload } = require('graphql-upload');

const Query = require('./query');
const Mutation = require('./mutation')

module.exports = {
        Upload: GraphQLUpload,
        Query,
        Mutation
}