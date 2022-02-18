const bcrypt = require('bcrypt');
require('dotenv').config();

const validator = require('../validator');
const depurator = require('../depurator');

const userService = require('../services/user');


module.exports = {
        users: async () => {
                try {
                        return await userService.list();
                } catch (err) {
                        throw new Error('bad request');
                }
        },
        user: async (id) => {
                if (validator.isNotValidId(id)) {
                        throw new Error('bad request');
                }

                try {
                        let foundCustomer = await userService.findById(id);

                        if (!foundCustomer) {
                                throw new Error('bad request');
                        }

                        return foundCustomer;
                } catch (err) {
                        throw new Error('bad request');
                }
        },
        createUser: async (name, surname, username, email, password) => {

                if (validator.isNotValidName(name)) {
                        throw new Error('bad request');
                }
                if (validator.isNotValidSurname(surname)) {
                        throw new Error('bad request');
                }
                if (validator.isNotValidUsername(username)) {
                        throw new Error('bad request');
                }
                if (validator.isNotValidEmail(email)) {
                        throw new Error('bad request');
                }
                if (validator.isNotValidPassword(password)) {
                        throw new Error('bad request');
                }

                let filterName = depurator.depurateName(name);
                let filterSurname = depurator.depurateSurname(surname);
                let filterUsername = depurator.depurateUsername(username);
                let filterEmail = depurator.depurateEmail(email);

                const hashed = await bcrypt.hash(password, 10);
                try {
                        let newUserData = {
                                name: filterName,
                                surname: filterSurname,
                                email: filterEmail,
                                username: filterUsername,
                                password: hashed
                        }
                        const newUser = await userService.create(newUserData);

                        return newUser;
                } catch (err) {
                        console.log(err);
                        throw new Error('bad request')
                }
        },
        deleteUser: async (id) => {

                if (validator.isNotValidId(id)) {
                        throw new Error('bad request');
                }

                try {
                        let found = await userService.delete(id);
                        return { success: found != null };
                } catch (err) {
                        return { success: false };
                }
        },
        updateUser: async (id, name, surname, username, email, password, role) => {

                if (validator.isNotValidId(id)) {
                        throw new Error('bad request');
                }

                if (!name && !surname && !username && !email && !password && !role) {
                        throw new Error('bad request');
                }

                let setContainer = {}
                if (name) {
                        if (validator.isNotValidName(name)) {
                                throw new Error('bad request');
                        }
                        setContainer.name = name;
                }

                if (surname) {
                        if (validator.isNotValidSurname(surname)) {
                                throw new Error('bad request');
                        }
                        setContainer.surname = surname;
                }

                if (username) {
                        if (validator.isNotValidUsername(username)) {
                                throw new Error('bad request');
                        }
                        setContainer.username = username;
                }

                if (email) {
                        if (validator.isNotValidEmail(email)) {
                                throw new Error('bad request');
                        }
                        setContainer.email = email;
                }

                if (password) {
                        if (validator.isNotValidPassword(password)) {
                                throw new Error('bad request');
                        }
                        const hashed = await bcrypt.hash(password, 10);
                        setContainer.password = hashed;
                }

                if (role) {
                        if (validator.isNotValidRole(role)) {
                                throw new Error('bad request');
                        }
                        setContainer.role = role;
                }

                try {
                        let updatedUser = await userService.update(id, setContainer);

                        if (!updatedUser) {
                                throw new Error('bad request');
                        }

                        return updatedUser

                } catch (err) {
                        console.log(err);
                        throw new Error('bad request')
                }
        },
}