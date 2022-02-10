const mongoose = require ('mongoose');
require('dotenv').config();
const fs = require('fs');

const {
        GraphQLUpload,
        graphqlUploadExpress, // A Koa implementation is also exported.
      } = require('graphql-upload');


module.exports = {
        createCustomer: async (parent, {name, surname, photoField}, { models, user }) => {

                if(!user){
                        throw new AuthenticationError('you must be signed in to create a customer');
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
        deleteCustomer: async (parent, {id}, { models, user  }) => {
                if(!user){
                        throw new AuthenticationError('you must be signed in to delete a customer');
                }

                try {
                        await models.Customer.findOneAndRemove({ _id: id});
                        return true;
                } catch (err) {
                        return false;
                }
        },
        updateCustomer: async (parent, {id, name, surname, photoField}, {models, user }) => {
                if(!user){
                        throw new AuthenticationError('you must be signed in to update a customer');
                }

                if(!name && !surname && !photoField){
                        throw new Error("Invalid parameters");
                }

                let setContainer = {}
                if(name){
                        setContainer.name = name;
                }

                if(surname){
                        setContainer.surname = surname;
                }

                if(photoField){
                        setContainer.surname = photoField;
                }

                setContainer.modifier = mongoose.Types.ObjectId(user.id);
                
                try{
                        return await models.Customer.findOneAndUpdate(
                                { _id: id },
                                { $set: setContainer },
                                { new: true }
                        );
                } catch (err){
                        console.log(err);
                        throw new Error('Error updating account')
                }
                
        },
        updateCustomerImage: async (parent, { id, file }, {models, user })=>{
                if(!user){
                        throw new AuthenticationError('you must be signed in to update a customer');
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