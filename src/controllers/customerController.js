const mongoose = require ('mongoose');
require('dotenv').config();
const fs = require('fs');
var path = require('path');

const models = require('../models');
const validator = require('../validator');
const depurator = require('../depurator');



module.exports = {
        customers: async () => {

                try {
                        return await models.Customer.find();
                }catch (err){
                        throw new Error('bad request');
                }
        },
        customer: async (id) => {
                if(validator.isNotValidId(id)){
                        throw new Error('bad request');
                }

                try{
                        let foundCustomer = await models.Customer.findById(id);

                        if(!foundCustomer){
                                throw new Error('bad request');
                        }

                        return foundCustomer;
                } catch (err){
                        throw new Error('bad request');
                }
        },
        createCustomer: async (name, surname, activeUser) => {

                if(validator.isNotValidName(name)){
                        throw new Error('bad request ' + name);
                }

                if(validator.isNotValidSurname(surname)){
                        throw new Error('bad request');
                }

                //TODO:Validate photoField and file

                let filterName = depurator.depurateName(name);
                let filterSurname = depurator.depurateSurname(surname);

                let customerValue = {
                        name: filterName,
                        surname: filterSurname,
                        creator:mongoose.Types.ObjectId(activeUser.id),
                        modifier:mongoose.Types.ObjectId(activeUser.id)
                };

                try{

                        let newCustomer = await models.Customer.create(customerValue);
                        return newCustomer;
                }catch(err){

                }
                
        },
        deleteCustomer: async (id) => {
                if(validator.isNotValidId(id)){
                        throw new Error('bad request');
                }

                try {
                        let found = await models.Customer.findOneAndRemove({ _id: id});
                        return {success:found != null};
                } catch (err) {
                        return {success:false};
                }
        },
        updateCustomer: async (id, name, surname, role, file, activeUser ) => {

                if(validator.isNotValidId(id)){
                        throw new Error('bad request');
                }

                if(!name && !surname && !role && !file){
                        throw new Error('bad request');
                }

                let setContainer = {}
                if(name){
                        if(validator.isNotValidName(name)){
                                throw new Error('bad request');
                        }
                        setContainer.name = name;
                }

                if(surname){
                        if(validator.isNotValidSurname(surname)){
                                throw new Error('bad request');
                        }
                        setContainer.surname = surname;
                }

                if(role){
                        if(validator.isNotValidRole(surname)){
                                throw new Error('bad request');
                        }
                        setContainer.role = role;
                }

                setContainer.modifier = mongoose.Types.ObjectId(activeUser.id);
                
                try{
                        if(file){
                                let fileName = file.name;
                                let userFolder = id; //TODO:encrypt user folder this
                                let photoField = `${userFolder}_${fileName}`;
                                setContainer.photoField = photoField;
                                const pathName = path.join(__dirname, `../../public/images/${photoField}`);
                                await file.mv(pathName,fileName);
                        }

                        let updatedCustomer = await models.Customer.findOneAndUpdate(
                                { _id: id },
                                { $set: setContainer },
                                { new: true }
                        );

                        if(!updatedCustomer){
                                throw new Error('bad request');
                        }

                        return updatedCustomer
                } catch (err){
                        console.log(err);
                        throw new Error('bad request')
                }
                
        }
}