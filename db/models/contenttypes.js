"use strict"
const {
    Model
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class contenttypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    contenttypes.init({
        content_type_name: DataTypes.STRING,
        fields: DataTypes.ARRAY(DataTypes.STRING)
    }, {
        sequelize,
        modelName: "contenttypes",
    })
    return contenttypes
}