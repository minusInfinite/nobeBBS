const Post = require('./Post');

User.hasMany(Post, {
    foreignKey: 'user_id'
});