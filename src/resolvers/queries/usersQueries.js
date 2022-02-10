const {AuthenticationError, ForbiddenError} = require('apollo-server-express');

module.exports = {
        users: async (parent, args, { models, user }) => {
                if(!user){
                        throw new AuthenticationError('you must be signed in to create a customer');
                }

                return await models.User.find();
        },
        user: async (parent, { id }, { models, user }) => {
                if(!user){
                        throw new AuthenticationError('you must be signed in to create a customer');
                }

                return await models.User.findById(id);
        }
}