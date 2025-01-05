import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";
class Topic extends Model {
}
Topic.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "topic",
});
export default Topic;
