const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();
const app = express();

connectToDatabase();

//rota
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});
//Iniciou o back end
app.listen(8000, () => console.log("Listening on port 8000!"));
