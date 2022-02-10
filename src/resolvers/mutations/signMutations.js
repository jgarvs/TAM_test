const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {AuthenticationError, ForbiddenError} = require('apollo-server-express');
require('dotenv').config();

const mutations = {
        signIn: async (parent, {username, email, password}, {models}) => {
                let filterEmail, filterUsername
                let user
                if(email){
                        filterEmail = email.trim().toLowerCase();
                        try{
                                user = await models.User.findOne({
                                        email: filterEmail
                                });
                        } catch(err){
                                throw new AuthenticationError('Error signing in');
                        }      
                }
                else if(username){
                        filterUsername = username.trim();
                        try{
                                user = await models.User.findOne({
                                        username: filterUsername
                                });
                        } catch(err){
                                throw new AuthenticationError('Error signing in');
                        }


                }
                else{
                        throw new AuthenticationError('Error signing in');
                }
                
                if(!user){
                        throw new AuthenticationError('Error signing in');
                }

                const valid = await bcrypt.compare(password, user.password);
                if(!valid){
                        throw new AuthenticationError('Error signing in');   
                }

                return jwt.sign({id: user._id}, process.env.JWT_SECRET);
        }
}

module.exports = mutations;