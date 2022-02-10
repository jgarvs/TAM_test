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
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: false 
        },
        modifier:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: false 
        }

},
{
        timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;