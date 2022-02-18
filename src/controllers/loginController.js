const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const models = require('../models');
const validator = require('../validator');
const depurator = require('../depurator');

const mutations = {
        login: async (username, email, password) => {
                let filterEmail, filterUsername
                let user
                if(email){

                        if(validator.isNotValidEmail(email)){
                                throw new Error('bad request');
                        }

                        filterEmail = depurator.depurateEmail(email);
                        try{
                                user = await models.User.findOne({
                                        email: filterEmail
                                });
                        } catch(err){
                                throw new Error('bad request');
                        }      
                }
                else if(username){

                        if(validator.isNotValidUsername(username)){
                                throw new Error('bad request');
                        }

                        filterUsername = depurator.depurateUsername(username);
                        try{
                                user = await models.User.findOne({
                                        username: filterUsername
                                });
                        } catch(err){
                                throw new Error('bad request');
                        }


                }
                else{
                        throw new Error('bad request');
                }
                
                if(!user){
                        throw new Error('bad request');
                }

                const valid = await bcrypt.compare(password, user.password);
                if(!valid){
                        throw new Error('bad request');   
                }

                return {token : jwt.sign({id: user._id}, process.env.JWT_SECRET)};
        }
}

module.exports = mutations;