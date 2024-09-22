const express = require("express");

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");
const router = express.Router();

//Rota para para Listar as tarefas
router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

//Criando rota para recuperar uma tarefa
router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getById();
});

//Rota para criar uma tarefa
router.post("/", async (req, res) => {
    return new TaskController(req, res).create();
});

//Atualizar uma tarefa
router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).update();
});

//Criando rota para deletar uma tarefa
router.delete("/:id", async (req, res) => {
    return new TaskController(req,res).detele();
});

module.exports = router;
