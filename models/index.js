import User from "./User.js";
import Topic from "./Topic.js";
import Post from "./Post.js";
import Comment from "./Comment.js";
User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE"
});
Topic.hasMany(Post, {
    foreignKey: "topic_id",
    onDelete: "CASCADE",
});
Post.belongsTo(User, {
    foreignKey: "user_id",
    as: "poster",
});
Post.belongsTo(Topic, {
    foreignKey: "topic_id",
    as: "posts"
});
Comment.belongsTo(User, {
    foreignKey: "user_id",
    as: "commentor",
});
Comment.belongsTo(Post, {
    foreignKey: "post_id",
    as: "comments"
});
export { User };
export { Topic };
export { Post };
export { Comment };
export default {
    User,
    Topic,
    Post,
    Comment
};
