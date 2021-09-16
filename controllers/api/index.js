const router = require('express').Router();
const userRoutes = require('./userRoutes');
const topicRoutes = require('./topic-routes')
const postRoutes = require('./postRoutes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/topic', topicRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes)

module.exports = router;