const User = require('./User');
const Topic = require('./Topic');
const Post = require('./Post');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Topic.hasMany(Post, {
    foreignKey: 'topic_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(Topic, {
    foreignKey: 'topic_id'
});

module.exports = {User, Topic, Post}

