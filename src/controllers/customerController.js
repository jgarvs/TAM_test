const mongoose = require ('mongoose');
require('dotenv').config();
const fs = require('fs');

const models = require('../models');
const Validator = require('../validator');



module.exports = {
        customers: async (user) => {
                if(!user){
                        throw new AuthenticationError('you must be signed in to create a customer');
                }

                try {
                        return await models.Customer.find();
                }catch (err){
                        throw new Error('no customers where found');
                }
        },
        customer: async (id, user) => {
                //TODO: validate id
                if(!user){
                        throw new Error('you must be signed in to create a customer');
                }

                try{
                        let foundCustomer = await models.Customer.findById(id);

                        if(!foundCustomer){
                                throw new Error('customer not found');
                        }

                        return foundCustomer;
                } catch (err){
                        throw new Error('customer not found');
                }
        },
        createCustomer: async (name, surname, photoField, user) => {

                if(Validator.isNotValidName(name)){
                        throw new Error('invalid name ' + name);
                }

                if(Validator.isNotValidSurname(surname)){
                        throw new Error('invalid surname ' + surname);
                }

                if(!user){
                        throw new Error('you must be signed in to create a customer');
                }

                let customerValue = {
                        name: name,//TODO: Validate
                        surname: surname,//TODO: Validate
                        photoField: photoField || "https://www.blah.com/myPhoto", //TODO: Validate
                        creator:mongoose.Types.ObjectId(user.id),
                        modifier:mongoose.Types.ObjectId(user.id)
                };
                return await models.Customer.create(customerValue);
        },
        deleteCustomer: async (id,user) => {
                if(!user){
                        throw new Error('you must be signed in to delete a customer');
                }

                try {
                        let found = await models.Customer.findOneAndRemove({ _id: id});
                        return {success:found != null};
                } catch (err) {
                        return {success:false};
                }
        },
        updateCustomer: async (id, name, surname, photoField, user ) => {

                if(!user){
                        throw new Error('you must be signed in to update a customer');
                }

                if(!name && !surname && !photoField){
                        throw new Error("Invalid parameters");
                }

                let setContainer = {}
                if(name){
                        if(Validator.isNotValidName(name)){
                                throw new Error('invalid name');
                        }
                        setContainer.name = name;
                }

                if(surname){
                        if(Validator.isNotValidSurname(surname)){
                                throw new Error('invalid surname');
                        }
                        setContainer.surname = surname;
                }

                if(photoField){
                        setContainer.surname = photoField;
                }

                setContainer.modifier = mongoose.Types.ObjectId(user.id);
                
                try{
                        let updatedCustomer = await models.Customer.findOneAndUpdate(
                                { _id: id },
                                { $set: setContainer },
                                { new: true }
                        );

                        if(!updatedCustomer){
                                throw new Error('customer not found');
                        }

                        return updatedCustomer
                } catch (err){
                        console.log(err);
                        throw new Error('Error updating account')
                }
                
        },
        updateCustomerImage: async (parent, { id, file }, {models, user })=>{
                if(!user){
                        throw new Error('you must be signed in to update a customer');
                }

                setContainer.modifier = mongoose.Types.ObjectId(user.id);

                const { createReadStream, filename, mimetype, encoding } = await file;

                //TODO:Validate filename


                const stream = createReadStream();

                const pathName = path.Join(__dirname, `/public/images/${filename}`)

                const out = fs.createWriteStream(pathName);

                stream.pipe(out);

                await finished(out);

                let setContainer = {}
                setContainer.photoField = pathName;
                setContainer.modifier = mongoose.Types.ObjectId(user.id);
                
                try{        
                        await models.Customer.findOneAndUpdate(
                                { _id: id },
                                { $set: setContainer },
                                { new: true }
                        );
                } catch (err){
                        console.log(err);
                        throw new Error('Error updating account')
                }

                return { filename, mimetype, encoding };
        }
}