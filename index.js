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

//Criando rota para recuperar uma tarefa
app.get("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).send("Essa tarefa não foi encontrada.");
        }

        return res.status(200).send(task);
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

app.patch("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        //Peguei a tarefa
        const taskToUpdate = await TaskModel.findById(taskId);

        //Mapeou os campos que podem ser atualizados da tarefa, campos que o usuario tenta atualizar
        const allowedUpdates = ["isCompleted"];
        const requestedUpdates = Object.keys(taskData);

        //Pra cada campo que recebou no body vai ser verificado se a lista de campos permitidos inclui update, se incluir
        //significa que esse campo pode ser atualizado
        for (update of requestedUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res
                    .status(500)
                    .send("Um ou mais campos não são editáveis.");
            }
        }

        await taskToUpdate.save();
        return res.status(200).send(taskToUpdate);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

//Criando rota para deletar uma tarefa
app.delete("/tasks/:id", async (req, res) => {
    try {
        const TaskId = req.params.id;

        const taskToDelete = await TaskModel.findById(TaskId);

        //variavel de negação da tarefa > Se ela for uma desses valores então retornara verdadeiro > null, undefined, false ,valores esses que irá retornar;
        if (!taskToDelete) {
            return res.status(404).send("Está tarefa não foi encontrada.");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(TaskId);

        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(5).send(error.message);
    }
});

//Iniciou o back end
app.listen(8000, () => console.log("Listening on port 8000!"));
