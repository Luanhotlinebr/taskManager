const express = require("express");

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");
const router = express.Router();

//Rota para para Listar as tarefas
router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

//Criando rota para recuperar uma tarefa
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
    try {
        //Endpoint para criar uma nova tarefa
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        //Peguei a tarefa e armazenei na variavel
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
router.delete("/:id", async (req, res) => {
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

module.exports = router;
