const mongoose = require ('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } })

const userSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true
        },
        surname: {
                type: String,
                required: true
        },
        email: {
                type: String,
                required: true,
                index: {unique: true}
        },
        username: {
                type: String,
                required: true,
                index: {unique: true}
        },
        password: {
                type: String,
                required: true,
                hide: true
        }

},
{
        timestamps: true
});

userSchema.plugin(mongooseHidden);

const User = mongoose.model('user', userSchema);

module.exports = User;