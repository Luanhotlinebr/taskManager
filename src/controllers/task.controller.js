const { mongoose } = require("mongoose");

const TaskModel = require("../models/task.model");
const { notFoundError, objectIdCastError} = require("../errors/mongodb.errors");
const { notAllowedFieldsToUpdateError } = require("../errors/general.errors");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            //find para procurar os registros no bd que tem no
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getById() {
        try {
            const taskId = this.req.params.id;

            const task = await TaskModel.findById(taskId);

            if (!task) {
                return notFoundError(this.res);
            }

            return this.res.status(200).send(task);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }

    async create() {
        try {
            //Endpoint para criar uma nova tarefa
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    //Regra de negócio
    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            //Peguei a tarefa e armazenei na variavel
            const taskToUpdate = await TaskModel.findById(taskId);

            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

            //Mapeou os campos que podem ser atualizados da tarefa, campos que o usuario tenta atualizar
            const allowedUpdates = ["isCompleted"];
            const requestedUpdates = Object.keys(taskData);

            //Pra cada campo que recebou no body vai ser verificado se a lista de campos permitidos inclui update, se incluir
            //significa que esse campo pode ser atualizado
            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return notAllowedFieldsToUpdateError(this.res);
                }
            }

            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.res);
            }
            return this.res.status(500).send(error.message);
        }
    }

    async delete() {
        try {
            const TaskId = this.req.params.id;

            const taskToDelete = await TaskModel.findById(TaskId);

            //variavel de negação da tarefa > Se ela for uma desses valores então retornara verdadeiro > null, undefined, false ,valores esses que irá retornar;
            if (!taskToDelete) {
                return notFoundError(this.res);
            }

            const deletedTask = await TaskModel.findByIdAndDelete(TaskId);

            this.res.status(200).send(deletedTask);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.res);
            }
            this.res.status(5).send(error.message);
        }
    }
}

module.exports = TaskController;
