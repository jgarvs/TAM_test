const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const models = require('../models');
const validator = require('../validator');
const depurator = require('../depurator');


module.exports = {
        users: async (user) => {
                if(!user){
                        throw new AuthenticationError('you must be signed in to create a customer');
                }
                try {
                        return await models.User.find();
                }catch (err){
                        throw new Error('no user where found');
                }
        },
        user: async (id, user) => {
                if(!user){
                        throw new AuthenticationError('you must be signed in to create a customer');
                }
                try{
                        let foundCustomer = await models.User.findById(id);

                        if(!foundCustomer){
                                throw new Error('user not found');
                        }

                        return foundCustomer;
                } catch (err){
                        throw new Error('user not found');
                }
        },
        createUser: async (name, surname, username, email, password, user) => {
                if(!user){
                        throw new AuthenticationError('you must be signed in to create an user');
                }

                if(validator.isNotValidName(name)){
                        throw new Error('invalid name');
                }
                if(validator.isNotValidSurname(surname)){
                        throw new Error('invalid surname');
                }
                if(validator.isNotValidUsername(username)){
                        throw new Error('invalid username');
                }
                if(validator.isNotValidEmail(email)){
                        throw new Error('invalid email');
                }
                if(validator.isNotValidPassword(password)){
                        throw new Error('invalid password');
                }
                
                let filterName = depurator.depurateName(name);
                let filterSurname = depurator.depurateSurname(surname);
                let filterUsername =  depurator.depurateUsername(username);
                let filterEmail = depurator.depurateEmail(email);

                const hashed = await bcrypt.hash(password, 10);
                try{
                        let newUserData = {
                                name: filterName,
                                surname: filterSurname,
                                email: filterEmail,
                                username: filterUsername,
                                password: hashed
                        }
                        const newUser = await models.User.create(newUserData);

                        return jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
                } catch (err) {
                        console.log(err);
                        throw new Error('Error creating account')
                }
        },
        deleteUser: async (id, user) => {
                if(!user){
                        throw new AuthenticationError('you must be signed in to delete a customer');
                }

                try {
                        let found = await models.User.findOneAndRemove({ _id: id});
                        return {success:found != null};
                } catch (err) {
                        return {success:false};
                }
        },
        updateUser: async (id, name, surname, username, email, password, user ) =>{
                if(!user){
                        throw new AuthenticationError('you must be signed in to delete a customer');
                }

                if(!name && !surname && !username && !email && !password){
                        throw new Error("Invalid parameters");
                }

                let setContainer = {}
                if(name){
                        if(validator.isNotValidName(name)){
                                throw new Error('invalid name');
                        }
                        setContainer.name = name;
                }

                if(surname){
                        if(validator.isNotValidSurname(surname)){
                                throw new Error('invalid surname');
                        }
                        setContainer.surname = surname;
                }

                if(username){
                        if(validator.isNotValidUsername(username)){
                                throw new Error('invalid username');
                        }
                        setContainer.username = username;
                }

                if(email){
                        if(validator.isNotValidEmail(email)){
                                throw new Error('invalid email');
                        }
                        setContainer.email = email;
                }

                if(password){
                        if(validator.isNotValidPassword(password)){
                                throw new Error('invalid password');
                        }
                        const hashed = await bcrypt.hash(password, 10);
                        setContainer.password = hashed;
                }

                try{
                        let updatedUser = await models.User.findOneAndUpdate(
                                { _id: id },
                                { $set: setContainer },
                                { new: true }
                        );

                        if(!updatedUser){
                                throw new Error('user not found');
                        }

                        return updatedUser

                } catch (err){
                        console.log(err);
                        throw new Error('Error updating account')
                }
        },
}