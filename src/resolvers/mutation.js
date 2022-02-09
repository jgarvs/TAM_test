module.exports = {
        createCustomer: async (parent, args, { models }) => {
                let customerValue = {
                        name: args.name,//TODO: Validate
                        surname: args.surname,//TODO: Validate
                        photoField: args.photoField || "https://www.blah.com/myPhoto", //TODO: Validate
                        creator:"idcreator",
                        modifier:"idcreator"
                };
                return await models.Customer.create(customerValue);
        }
}