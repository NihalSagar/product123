// const express = require('express');
// const bodyParser = require('body-parser');
// const sequelize = require('./config/database');
// const productRoutes = require('./routes/productRoutes');

// const app = express();
// app.use(bodyParser.json());

// // Use product routes
// app.use('/api/products', productRoutes);

// // Sync the database and start the server
// const startServer = async () => {
//     try {
//         await sequelize.sync(); // Sync the models with the database
//         console.log('Database synchronized successfully.');
//         app.listen(3000, () => {
//             console.log('Server is running on port 3000');
//         });
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// };

// startServer();


const express = require('express');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());  // Use express's built-in JSON parser

// Use product routes
app.use('/api/products', productRoutes);

// 404 Error handling for non-existent routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Requested resource could not be found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "An internal server error occurred" });
});

// Sync the database and start the server
const startServer = async () => {
    try {
        await sequelize.sync(); // Sync the models with the database
        console.log('Database synchronized successfully.');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
