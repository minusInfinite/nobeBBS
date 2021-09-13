const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

router.get('/login', (req, res) => {
    res.render('login');
})

// LOGOUT ROUTE i.e. remove session
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;