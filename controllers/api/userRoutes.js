const router = require('express').Router();
const passport = require('passport');
const { User } = require('../../models');


// CREATE A NEW USER
router.post('/new', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        const user = userData.get({plain:true});
        req.logIn(user, (err) => {
            if (err) { return res.status(400).json(err);}
            return res.status(200).json(user);
        }); 

    } catch (err) {
        res.status(400).json(err);
    }
})
// LOG IN EXISTING USER
router.post('/login', passport.authenticate('local'), (req, res) => {
    if(req.user){
        res.redirect('/users/')
    } else {
        res.json({msg: 'failed to login'})
    }
});

module.exports = router;