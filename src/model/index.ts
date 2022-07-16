const { DataTypes, Model } = require('sequelize');
import sequelize from "../config/database.config"
export interface ProductInterface {
    productId: number,
    productName: string,
    productPrice: number | string,
    productDescription: string,
    currency: string,
}

export class Product extends Model { }
Product.init({
    // Model attributes are defined here
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    productDescription: {
        type: DataTypes.BOOLEAN,
        default: false,
    },

    productPrice: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance, defined in the config file
    modelName: "Products", // We need to choose the model name
    tableName: "products", // We need to choose the table name

});