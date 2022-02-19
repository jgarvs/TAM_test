const errors = require('../customErrorHandler');

module.exports = {
        authRole: (role) => {
                return (req, res, next) => {
                        if (res.activeUser.role !== role) {
                                let err = { message: 'bad request' };
                                return res.status(401).json(errors.errorFound(err));
                        }

                        next();
                }
        }
}