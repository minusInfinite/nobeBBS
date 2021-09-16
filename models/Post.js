const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {};

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        subject: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        topic_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'topic',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;