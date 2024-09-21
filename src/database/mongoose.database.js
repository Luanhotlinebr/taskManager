//Criei uma constante para importar o mongoose que se comunica com o Mongo DB.
const mongoose = require("mongoose");

//Criei uma função assicrona que conecta o mongoose com o MongoDB.
const connectToDatabase = async () => {
    await mongoose
        .connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hywzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        )
        .then(() => console.log("Connected to MongoDB!"));
};

//Criei um modo de exportar a função connectToDatabase para o arquivo principal.
module.exports = connectToDatabase;
