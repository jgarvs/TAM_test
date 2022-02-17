const {Router} = require('express')
const router = Router();

const loginController = require('../controllers/loginController');
const errors = require('../customErrorHandler');

router.post('/', async (req, res)=>{
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        try{
                let response = await loginController.login(username, email, password);
                res.json(response);
        }catch (err){
                res.status(400).json(errors.errorFound(err));
        }
        
});

module.exports = router;