const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
        res.json({"Title":"this is a test"});
});

module.exports = router;