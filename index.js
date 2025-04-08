import express from "express";
import { Sequelize, DataTypes } from "sequelize";

//Conexão com o banco de dados
const sequelize = new Sequelize('biblioteca2025', 'postgres', '20052003', {
    host: 'localhost',
    port: 5432,
    dialect:'postgres',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

//Mapeamento da model editora
const Editora = sequelize.define(
    'editora',
    {
      ideditora: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
      },

      nomeeditora: {
      type: DataTypes.STRING(60),
      allowNull: false
      },

      cnpj: {
      type: DataTypes.STRING,
      allowNull: false
      },

      endereco: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }
  );

try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados realizada com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados', error);
  }

const app = express();
app.use(express.json());

app.get('/teste', (req, res) => { 
    res.send('Teste ok');
});

//Rotas Crud da tabela editora
app.get('/editora', async (req, res) => {
    const respostaBanco = await Editora.findAll();
    res.json(respostaBanco);
});


app.get('/editora/:id', async (req, res)=>{
    const id = req.params.id
    const respostaBanco = await Editora.findByPk(id);
    res.json(respostaBanco);
});

app.post('/editora', async (req, res)=>{
    const nomeeditora = req.body.nomeeditora;
    const cnpj = req.body.cnpj;
    const endereco = req.body.endereco;
    const respostaBanco = await Editora.create(req.body);
    res.json(respostaBanco);
});

app.put('/editora/:id', async (req, res) => {
  const nomeeditora = req.body.nomeeditora;
  const cnpj = req.body.cnpj;
  const endereco = req.body.endereco;
  const ideditora = req.params.id;

  const respostaBanco = await Editora.update(
      { nomeeditora, cnpj, endereco },
      { where: { ideditora } }
  );
  res.json(respostaBanco);
});

app.delete('/editora/:id', async (req, res) => {
  const ideditora = req.params.id;
  const respostaBanco = await Editora.destroy({ where: { ideditora } });
  res.json(respostaBanco);
});


app.listen(2000, () => { console.log("Servidor rodando.")});



