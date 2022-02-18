const jwt = require('jsonwebtoken');
require('dotenv').config();
const errors = require('../customErrorHandler');

module.exports = {
        validate: async (req, res, next) => {
                const token = req.headers.authorization;
                try{
                        res.activeUser = jwt.verify(token, process.env.JWT_SECRET);
                        next();
                }catch (err){
                        res.status(500).send(errors.errorFound(err));
                }
        }
}