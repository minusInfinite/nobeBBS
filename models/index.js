const User = require("./User")
const Topic = require("./Topic")
const Post = require("./Post")
const Comment = require("./Comment")

User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
})

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
})

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE"
})

Topic.hasMany(Post, {
    foreignKey: "topic_id",
    onDelete: "CASCADE",
})

Post.belongsTo(User, {
    foreignKey: "user_id",
    as: "poster",
})

Post.belongsTo(Topic, {
    foreignKey: "topic_id",
    as: "posts"
})

Comment.belongsTo(User, {
    foreignKey: "user_id",
    as: "commentor",
})

Comment.belongsTo(Post, {
    foreignKey: "post_id",
    as: "comments"
})

module.exports = { User, Topic, Post, Comment }
