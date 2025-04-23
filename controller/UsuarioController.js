import Usuario from "../model/UsuarioModel.js";
import bcrypt from "bcrypt";

async function listar(req, res) {
    const respostaBanco = await Usuario.findAll();
    res.json(respostaBanco);
}

async function selecionar(req, res) {
    const id = req.params.id;
    const respostaBanco = await Usuario.findByPk(id);
    res.json(respostaBanco);
}

async function inserir(req, res) {
    const respostaBanco = await Usuario.create(req.body);
    res.json(respostaBanco);
}

async function alterar(req, res) {
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const nascimento = req.body.nascimento;

    const idusuario = req.params.id;

    const respostaBanco = await Usuario.update(
        { nome, cpf, email, telefone, nascimento },
        { where: { idusuario } });
    res.json(respostaBanco);
}

async function excluir(req, res) {
    const idusuario = req.params.id;

    const respostaBanco = await Usuario.destroy({ where: { idusuario } });
    res.json(respostaBanco);
}

async function senha(req, res) {
    const idusuario = req.params.id;
    const senha = req.body.senha;

    if (!idusuario) {
        return res.status(422).send('O parâmetro idusuario é obrigatório.');
    }

    if (!senha || senha.length < 6 || senha.length > 20) {
        return res.status(422).send('A senha deve ter entre 6 e 20 caracteres.');
    }

    const usuarioBanco = await Usuario.findByPk(idusuario);
    if (!usuarioBanco) {
        return res.status(404).send('Usuario não encontrado.');
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const resposta = await Usuario.update(
        {
            senha: senhaCriptografada,
            token: null
        },
        {
            where: { idusuario }
        }
    );
    
    res.json(resposta);
}

export default { listar, selecionar, inserir, alterar, excluir, senha };


