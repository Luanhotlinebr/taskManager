const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();
const app = express();
//MiddleWare - Receber Json na Body das Requisições
app.use(express.json());

connectToDatabase();

//Rota para para Listar as tarefas
app.get("/tasks", async (req, res) => {
    try {
        //find para procurar os registros no bd que tem no
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Rota para criar uma tarefa
app.post("/tasks", async (req, res) => {
    try {
        //Endpoint para criar uma nova tarefa
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Criando rota para deletar uma tarefa
app.delete("/tasks/:id", async (req, res) => {
    try {
        const TaskId = req.params.id;

        const taskToDelete = await TaskModel.findById(TaskId);

        //variavel de negação da tarefa > Se ela for uma desses valores então retornara verdadeiro > null, undefined, false ,valores esses que irá retornar;
        if (!taskToDelete) {
            return res.status(500).send("Está tarefa não foi encontrada.");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(TaskId);

        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(5).send(error.message);
    }
});

//Iniciou o back end
app.listen(8000, () => console.log("Listening on port 8000!"));
