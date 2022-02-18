const list = customerModel => async () => {
        return await customerModel.find();
}

const create = customerModel => async (payload) => {
        return await customerModel.create(payload);
}

const findById = customerModel => async (id) => {
        return await customerModel.findById(id);
}

const deleteCustomer = customerModel => async (id) => {
        return await customerModel.findOneAndRemove({ _id: id});
}

const update = customerModel => async (id, payloadSet) => {
        return await customerModel.findOneAndUpdate(
                { _id: id },
                { $set: payloadSet },
                { new: true }
        );
}

module.exports = customerModel => {
        return {
                list: list(customerModel),
                findById: findById(customerModel),
                create: create(customerModel),
                delete: deleteCustomer(customerModel),
                update: update(customerModel),
        }
}