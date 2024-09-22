const notFoundError = (res) => {
    return res
        .status(404)
        .send("Este dado não foi encontrado no Banco de Dados.");
};

const objectIdCastError = (res) => {
    return res
        .status(500)
        .send("Ocorreu um erro ao recuperar este dado no banco de dados.");
};

module.exports = {
    notFoundError,
    objectIdCastError,
};
