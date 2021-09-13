const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    res.send('HELLO WORLD');
})
// CREATE A NEW USER
router.post('/new', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        const user = userData.get({plain:true});
        console.log(user);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(user);
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

// LOGIN EXISTING USER
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            return res.status(400).json({ message: "Incorrect email or password, please try again" })
        }

        const validPassword = await userData.validatePassword(req.body.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Incorrect email or password, please try again" })
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: "You are now logged in!" });
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;