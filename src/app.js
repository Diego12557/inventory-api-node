const express = require('express')
const app = express();

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(express.json());

app.use('/api', productRoutes)
app.use('/api', userRoutes)

app.get('/', (req, res) => {
    res.json({
        message: "API de inventarios Funcionando"
    });
});

module.exports = app;