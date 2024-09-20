//Instalar Framework xpress
//Express é um servidor
//npm i express

//npm run start:dev > Posso executar o script que escrevi no package.json para testar

const express = require('express');

const app = express();
//rota
app.get("/",(req,res)=>{
    res.status(200).send('Hello World!');
})
//Iniciou o back end
app.listen(8000, () => console.log("Listening on port 8000!"));