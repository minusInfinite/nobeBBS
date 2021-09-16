const router = require('express').Router();
const { Post, Comment } = require('../../models');

// get all posts where ?t=TOPIC_ID
router.get('/', async (req, res) => {
    try {
            const posts = await Post.findAll({
                where: {
                    topic_id: req.query.t
                },
                include: [
                    {
                        model: Comment
                    }
                ]

            })
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json(error)
    }
})

// create new post
router.post('/new', async (req, res) => {
    try {
        const post = {
            subject: req.body.subject,
            content: req.body.content,
            topic_id: req.body.topic_id,
            user_id: req.user.id
        };

        await Post.create(post);

        res.status(200).json({msg: 'success'});
    } catch (error) {
        res.status(400).json(error)
    }
})
// edit a post
router.post('/edit/:id', async (req, res) => {
    try {
        await Post.update({subject: req.body.subject, content: req.body.content}, {where: {id: req.params.id}});
        res.status(200).json({msg: 'success'});
    } catch (error) {
        res.status(400).json(error)
    }
})

// get post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;