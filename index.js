import express from "express";
import { DataTypes } from "sequelize";
import banco from "./banco.js";
import editora from "./contrroler/EditoraContrroler.js"

try {
    await banco.authenticate();
    console.log('Conexão com o banco de dados realizada com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados', error);
  }

const app = express();
app.use(express.json());

app.get('/teste', (req, res) => { 
    res.send('Teste ok');
});


app.get('/editora', editora.listar);
app.get('/editora/:id', editora.selecionar);
app.post('/editora', editora.inserir);
app.put('/editora/:id', editora.alterar);
app.delete('/editora/:id', editora.deletar);


app.listen(2000, () => { console.log("Servidor rodando.")});



