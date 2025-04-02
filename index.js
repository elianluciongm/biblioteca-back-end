import express from "express";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize('biblioteca2025', 'postgres', '20052003', {
    host: 'localhost',
    port: 5432,
    dialect:'postgres',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const app = express();
app.use(express.json());

app.get('/teste', (req, res) => { 
    res.send('Teste ok');
});

app.listen(3000, () => { 
    console.log("Servidor rodando.");
});

