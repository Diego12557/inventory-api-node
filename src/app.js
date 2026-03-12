const express = require('express')
const app = express();

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const saleRoutes = require('./routes/salesRoutes')
const DashboardRoutes = require('./routes/dashboardRoutes')

app.use(express.json());

app.use('/api', productRoutes)
app.use('/api', userRoutes)
app.use('/api/sale', saleRoutes)
app.use('/api/dashboard', DashboardRoutes)

app.get('/', (req, res) => {
    res.json({
        message: "API de inventarios Funcionando"
    });
});

module.exports = app;