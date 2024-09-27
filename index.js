const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

const TaskRouter = require("./src/routes/task.routes");
const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();
const app = express();
app.use(cors());
//MiddleWare - Receber Json na Body das Requisições
app.use(express.json());

connectToDatabase();

app.use("/tasks", TaskRouter);
//Iniciou o back end
app.listen(8000, () => console.log("Listening on port 8000!"));
