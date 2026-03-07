const app = require('./src/app')
const connectDB = require('./src/config/database')

connectDB();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})