const User = require('./User');
const Topic = require('./Topic');
const Post = require('./Post');
const Comment =require('./Comment')

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = {User, Topic, Post}

