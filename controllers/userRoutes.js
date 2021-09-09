const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

// LOGOUT ROUTE i.e. remove session
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;