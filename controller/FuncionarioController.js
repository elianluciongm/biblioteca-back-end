import Funcionario from "../model/FuncionarioModal.js";
import bcrypt from "bcrypt";

async function listar(req, res) {
    const respostaBanco = await Funcionario.findAll();
    res.json(respostaBanco);
}

async function selecionar(req, res) {
    const id = req.params.id;
    const respostaBanco = await Funcionario.findByPk(id);
    res.json(respostaBanco);
}

async function inserir(req, res) {
    const respostaBanco = await Funcionario.create(req.body);
    res.json(respostaBanco);
}

async function alterar(req, res) {
    const idfuncionario = req.params.id;

    const nomefunctionario = req.body.nomefunctionario;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const nascimento = req.body.nascimento;
    const salario = req.body.salario;
    const contratacao = req.body.contratacao;

    if (!nomefunctionario) {
        return res.status(422).send('O parâmetro Nome do Funcionario é obrigatório.');
    }

    if (!email) {
        return res.status(422).send('O parâmetro E-mail é obrigatório.');
    }

    if (!salario) {
        return res.status(422).send('O parâmetro Salário é obrigatório.');
    }

    if (!contratacao) {
        return res.status(422).send('O parâmetro Contratação é obrigatório.');
    }

    const respostaBanco = await Funcionario.update(
        { nomefunctionario, cpf, email, telefone, nascimento, salario, contratacao },
        { where: { idfuncionario } }
    );

    res.json(respostaBanco);
}

async function senha(req, res) {
    const idfuncionario = req.params.id;
    const senha = req.body.senha;

    if (!idfuncionario) {
        return res.status(422).send('O parâmetro idfuncionario é obrigatório.');
    }

    if (!senha || senha.length < 6 || senha.length > 20) {
        return res.status(422).send('A senha deve ter entre 6 e 20 caracteres.');
    }

    const funcionarioBanco = await Funcionario.findByPk(idfuncionario);
    if (!funcionarioBanco) {
        return res.status(404).send('Funcionário não encontrado.');
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const resposta = await Funcionario.update(
        {
            senha: senhaCriptografada,
            token: null
        },
        {
            where: { idfuncionario }
        }
    );

    res.json(resposta);
}

async function demitir(req, res) {
    const idfuncionario = req.params.id;
    const dataDemissao = req.body.demissao;

    if (!idfuncionario) {
        return res.status(422).send("O parâmetro idfuncionario é obrigatório.");
    }
o
    if (!dataDemissao) {
        return res.status(422).send("A data de demissão é obrigatória.");
    }

    const funcionario = await Funcionario.findByPk(idfuncionario);
    if (!funcionario) {
        return res.status(404).send("Funcionário não encontrado.");
    }

    if (funcionario.demissao) {
        return res.status(409).send("Funcionário já foi demitido anteriormente.");
    }

    const resposta = await Funcionario.update(
        {
            demissao: dataDemissao,
            ativo: false
        },
        {
            where: { idfuncionario }
        }
    );

    res.json(resposta);
}


export default { listar, selecionar, inserir, alterar, senha, demitir };
