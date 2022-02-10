const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {AuthenticationError, ForbiddenError} = require('apollo-server-express');
require('dotenv').config();

const mutations = {
        users: async (parent, {name, surname, username, email, password}, {models, user})=>{},
        createUser: async (parent, {name, surname, username, email, password}, {models, user}) => {
                if(!user){
                        throw new AuthenticationError('you must be signed in to create an user');
                }
                
                let filterName = name.trim().toLowerCase();
                let filterSurname = surname.trim().toLowerCase();
                let filterUsername =  username.trim();
                let filterEmail = email.trim().toLowerCase();

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
        deleteUser: async (parent, {id}, { models, user  }) => {
                if(!user){
                        throw new AuthenticationError('you must be signed in to delete a customer');
                }

                try {
                        await models.User.findOneAndRemove({ _id: id});
                        return true;
                } catch (err) {
                        return false;
                }
        },
        updateUser: async (parent, {id, name, surname, username, email, password}, {models, user }) =>{
                if(!user){
                        throw new AuthenticationError('you must be signed in to delete a customer');
                }

                if(!name && !surname && !username && !email && !password){
                        throw new Error("Invalid parameters");
                }

                let setContainer = {}
                if(name){
                        setContainer.name = name;
                }

                if(surname){
                        setContainer.surname = surname;
                }

                if(email){
                        setContainer.email = email;
                }

                if(password){
                        const hashed = await bcrypt.hash(password, 10);
                        setContainer.password = hashed;
                }

                try{
                        return await models.User.findOneAndUpdate(
                                { _id: id },
                                { $set: setContainer },
                                { new: true }
                        );
                } catch (err){
                        console.log(err);
                        throw new Error('Error updating account')
                }
        },
}

module.exports = mutations;
module.exports = {}