const list = userModel => async () => {
        return await userModel.find();
}

const create = userModel => async (payload) => {
        return await userModel.create(payload);
}

const findById = userModel => async (id) => {
        return await userModel.findById(id);
}

const deleteCustomer = userModel => async (id) => {
        return await userModel.findOneAndRemove({ _id: id});
}

const update = userModel => async (id, payloadSet) => {
        return await userModel.findOneAndUpdate(
                { _id: id },
                { $set: payloadSet },
                { new: true }
        );
}

const findByUserame = userModel => async (username) => {
        return await userModel.findOne({
                username: username
        });
}

const findByEmail = userModel => async (email) => {
        return await userModel.findOne({
                email: email
        });
}

module.exports = userModel => {
        return {
                list: list(userModel),
                findById: findById(userModel),
                create: create(userModel),
                delete: deleteCustomer(userModel),
                update: update(userModel),
                findByUserame: findByUserame(userModel),
                findByEmail: findByEmail(userModel)
        }
}