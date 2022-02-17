const {Router} = require('express')
const router = Router();

const CustomerController = require('../controllers/customerController');
const errors = require('../customErrorHandler');

router.get('/', getUser,async (req, res) => {
        try{
                let response = await CustomerController.customers(res.user);
                res.json(response);
        } catch (err){
                res.status(400).send(errors.errorFound(err));
        }

});

router.get('/:id', getUser, async (req, res) => {
        let id = req.params.id;
        try{
                let response = await CustomerController.customer(id, res.user);
                res.json(response);
        } catch (err){
                res.status(400).json(errors.errorFound(err));
        }
});


router.post('/', getUser, async (req, res)=>{
        let name = req.body.name;
        let surname = req.body.surname;
        let photoField = req.body.photoField;

        try{
                let response = await CustomerController.createCustomer(name, surname, photoField, res.user);
                res.status(201).json(response);
        } catch (err){
                res.status(400).json(errors.errorFound(err));
        }
});

router.patch('/:id', getUser, async (req, res)=>{
        let id = req.params.id;
        let name = req.body.name;
        let surname = req.body.surname;
        let photoField = req.body.photoField;
        try{
                let response = await CustomerController.updateCustomer(id, name, surname, photoField, res.user);
                res.json(response);
        } catch (err){
                res.status(400).json(errors.errorFound(err));
        }
});

router.delete('/:id', getUser, async (req, res)=>{
        let id = req.params.id;
        try{
                let response = await CustomerController.deleteCustomer(id, res.user);
                res.json(response);
        } catch (err){
                res.status(400).json(errors.errorFound(err));
        }
});

//TODO:FIX THIS
function getUser(req, res, next){
        let user = {id:1}
        res.user = user;
        if(false){
                return res.status(400).json(errors.errorFound(err))
        }
        next();
}

module.exports = router;