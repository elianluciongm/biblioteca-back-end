import express from "express";

const app = express();
app.use(express.json());

app.get('/teste', (req, res) => { 
    res.send('Teste ok');
});

app.listen(3000, () => { 
    console.log("Servidor rodando.");
});
