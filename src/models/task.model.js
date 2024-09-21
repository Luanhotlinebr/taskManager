//Models são as entidades
//Então esse será nossa entidade Tarefa
const {Schema, model} = require("mongoose");

//schema > Esqueleto do nosso model
const TaskSchema = Schema({
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const TaskModel = model("Task", TaskSchema);

module.exports = TaskModel;