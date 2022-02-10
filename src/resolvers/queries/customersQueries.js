const {AuthenticationError, ForbiddenError} = require('apollo-server-express');

module.exports = {
        customers: async (parent, args, { models , user}) => {
                if(!user){
                        throw new AuthenticationError('you must be signed in to create a customer');
                }

                return await models.Customer.find();
        },
        customer: async (parent, { id }, { models , user}) => {
                if(!user){
                        throw new AuthenticationError('you must be signed in to create a customer');
                }

                return await models.Customer.findById(id);
        }
}