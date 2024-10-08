// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Product = sequelize.define('Product', {
//     product_id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     description: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//     },
//     price: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//     },
//     quantity: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     }
// });

// module.exports = Product;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // Ensures the name is not empty
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // Better for currency handling
        allowNull: false,
        validate: {
            isDecimal: true, // Ensures the price is a decimal
            min: 0,          // Ensures the price is not negative
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,     // Ensures the quantity is an integer
            min: 0,          // Ensures quantity is not negative
        },
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = Product;
