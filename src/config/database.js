const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Conectado')
    } catch (error){
        console.log('Error al conectar MongoDb: ', error)
        process.exit(1);
    }
}
module.exports = connectDB;