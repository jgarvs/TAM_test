const mongoose = require ('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } })

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

customerSchema.plugin(mongooseHidden);
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;