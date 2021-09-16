const router = require('express').Router();
const apiRoutes = require('./api');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

router.use('/api', apiRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;