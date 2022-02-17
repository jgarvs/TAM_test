const jwt = require('jsonwebtoken');
require('dotenv').config();
const errors = require('../customErrorHandler');

const getUser = token => {
        if(token){
                try{
                        return jwt.verify(token, process.env.JWT_SECRET);
                } catch (err) {
                        throw new Error('Session invalid')
                }
        }
}

module.exports = {
        validate: async (req, res, next) => {
                const token = req.headers.authorization;
                try{
                        const user = getUser(token);
                        next();
                }catch (err){
                        res.status(500).send(errors.errorFound(err));
                }
        }
}