const mongoose = require ('mongoose');

const customerSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true
        },
        surname: {
                type: String,
                required: true 
        },
        photoField:{
                type: String,
                required: false 
        },
        creator:{
                type: String,
                required: false 
        },
        modifier:{
                type: String,
                required: false 
        }

},
{
        timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;