const { Model, DataTypes } = require("sequelize")
const bcrypt = require("bcrypt")
const sequelize = require("../config/connection")

class User extends Model {
    // check if the inputted password matches the one stored on the user
    validatePassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        last_login: {
            type: DataTypes.DATE,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "/img/default_avatar.png",
        },
    },
    {
        hooks: {
            // use bcrypt to hash the raw password input on user create and update
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(
                    newUserData.password,
                    12
                )
                return newUserData
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(
                    updatedUserData.password,
                    12
                )
                return updatedUserData
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    }
)

module.exports = User
