const router = require('express').Router();
const { Post } = require('../../models');

// create new post
router.post('/new', async (req, res) => {
    try {
        console.log('hello')
        console.log(req.body)
        const post = {
            subject: req.body.subject,
            content: req.body.content,
            user_id: req.user.id
        };
        console.log(post);
        await Post.create(post);

        res.status(200).json({msg: 'success'});
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/edit/:id', async (req, res) => {
    try {
        await Post.update({subject: req.body.subject, content: req.body.content}, {where: {id: req.params.id}});
        res.status(200).json({msg: 'success'});
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;