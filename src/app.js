const express = require('express')
const app = express();

const productRoutes = require('./routes/productRoutes')

app.use(express.json());

app.use('/api', productRoutes)

app.get('/', (req, res) => {
    res.json({
        message: "API de inventarios Funcionando"
    });
});

module.exports = app;