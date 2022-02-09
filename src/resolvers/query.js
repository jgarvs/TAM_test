module.exports = {
        customers: async (parent, args, { models }) => {
                return await models.Customer.find();
        },
        customer: async (parent, args, { models }) => {
                return await models.Customer.findById(args.id);
        }
}