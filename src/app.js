const express = require('express')
const app = express();

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const saleRoutes = require('./routes/salesRoutes')

app.use(express.json());

app.use('/api', productRoutes)
app.use('/api', userRoutes)
app.use('/api/sale', saleRoutes)

app.get('/', (req, res) => {
    res.json({
        message: "API de inventarios Funcionando"
    });
});

module.exports = app;