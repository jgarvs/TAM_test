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
                                throw new Error('Error signing invalid Email');
                        }

                        filterEmail = depurator.depurateEmail(email);
                        try{
                                user = await models.User.findOne({
                                        email: filterEmail
                                });
                        } catch(err){
                                throw new Error('Error signing unknown Email');
                        }      
                }
                else if(username){

                        if(validator.isNotValidUsername(username)){
                                throw new Error('Error signing invalid Username');
                        }

                        filterUsername = depurator.depurateUsername(username);
                        try{
                                user = await models.User.findOne({
                                        username: filterUsername
                                });
                        } catch(err){
                                throw new Error('Error signing unkonwn Username');
                        }


                }
                else{
                        throw new Error('Error signing in empty values');
                }
                
                if(!user){
                        throw new Error('Error signing in user null');
                }

                const valid = await bcrypt.compare(password, user.password);
                if(!valid){
                        throw new Error('Error signing in');   
                }

                return {token : jwt.sign({id: user._id}, process.env.JWT_SECRET)};
        }
}

module.exports = mutations;