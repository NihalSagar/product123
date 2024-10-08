const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('product', 'root', 'nihal@123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();