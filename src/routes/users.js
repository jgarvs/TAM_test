const { Router } = require('express')
const router = Router();

const userController = require('../controllers/userController');
const errors = require('../customErrorHandler');


router.get('/', async (req, res) => {
        try {
                let response = await userController.users();
                res.json(response);
        } catch (err) {
                res.status(400).send(errors.errorFound(err));
        }

});

router.get('/:id', async (req, res) => {
        let id = req.params.id;
        try {
                let response = await userController.user(id);
                res.json(response);
        } catch (err) {
                res.status(400).json(errors.errorFound(err));
        }
});

router.post('/', async (req, res) => {
        let name = req.body.name;
        let surname = req.body.surname;
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;

        try {
                let response = await userController.createUser(name, surname, username, email, password);
                res.status(201).json(response);
        } catch (err) {
                res.status(400).json(errors.errorFound(err));
        }
});

router.patch('/:id', async (req, res) => {
        let id = req.params.id;
        let name = req.body.name;
        let surname = req.body.surname;
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let role = req.body.role;
        try {
                let response = await userController.updateUser(id, name, surname, username, email, password, role);
                res.json(response);
        } catch (err) {
                res.status(400).json(errors.errorFound(err));
        }
});

router.delete('/:id', async (req, res) => {
        let id = req.params.id;
        try {
                let response = await userController.deleteUser(id);
                res.json(response);
        } catch (err) {
                res.status(400).json(errors.errorFound(err));
        }
});

module.exports = router;