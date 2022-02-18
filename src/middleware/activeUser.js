const userController = require('../controllers/userController');
const errors = require('../customErrorHandler');


module.exports = {
        get: async (req, res, next) => {
                try{
                        res.activeUser = userController.user(res.activeUser.id);
                        next();
                }catch(err){
                        res.status(400).send(errors.errorFound(err));
                }
        }
}