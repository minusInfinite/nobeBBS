const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    res.send('HELLO WORLD');
})

module.exports = router;