const {Router} = require('express')
const router = Router();

const CustomerController = require('../controllers/customerController');
const errors = require('../customErrorHandler');

router.get('/',async (req, res) => {
        try{
                let response = await CustomerController.customers();
                res.json(response);
        } catch (err){
                res.status(400).send(errors.errorFound(err));
        }

});

router.get('/:id', async (req, res) => {
        let id = req.params.id;
        try{
                let response = await CustomerController.customer(id);
                res.json(response);
        } catch (err){
                res.status(400).json(errors.errorFound(err));
        }
});


router.post('/', async (req, res)=>{
        let name = req.body.name;
        let surname = req.body.surname;
        let photoField = req.body.photoField;
        let file = req.files.file;

        try{
                let response = await CustomerController.createCustomer(name, surname, photoField, file, res.activeUser);
                res.status(201).json(response);
        } catch (err){
                res.status(400).json(errors.errorFound(err));
        }
});

router.patch('/:id', async (req, res)=>{
        let id = req.params.id;
        let name = req.body.name;
        let surname = req.body.surname;
        let photoField = req.body.photoField;
        try{
                let response = await CustomerController.updateCustomer(id, name, surname, photoField, res.activeUser);
                res.json(response);
        } catch (err){
                res.status(400).json(errors.errorFound(err));
        }
});

router.delete('/:id', async (req, res)=>{
        let id = req.params.id;
        try{
                let response = await CustomerController.deleteCustomer(id);
                res.json(response);
        } catch (err){
                res.status(400).json(errors.errorFound(err));
        }
});

module.exports = router;