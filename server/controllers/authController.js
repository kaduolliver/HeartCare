const bcrypt = require('bcrypt');
const pool = require('../database/db');

exports.registrar = async (req, res) => {
    const { NomeCompleto, CPF, DataNascimento, Email, Telefone, Senha, ConfirmarSenha } = req.body;

    if (Senha !== ConfirmarSenha) return res.send('Senhas não coincidem');

    if (!Senha || !ConfirmarSenha) return res.send('Senha não pode ser vazia');

    try {

        const senhaHash = await bcrypt.hash(Senha, 10);

        await pool.query(
            'INSERT INTO usuarios (nome, cpf, nascimento, email, telefone, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [NomeCompleto, CPF, DataNascimento, Email, Telefone, senhaHash]
        );
        res.status(201).send('Conta cadastrada com sucesso');
    } catch (error) {
        console.error(error);
        if (error.code === '23505') {
            res.send('CPF, e-mail ou telefone ja cadastrado.');
        } else {
            res.send('Erro ao registrar');
        }
    }
};


exports.login = async (req, res) => {
    const cpfInput = req.body.cpfInput.replace(/\D/g, '');
    const passwordInput = req.body.passwordInput;

    try {
        const resultado = await pool.query('SELECT * FROM usuarios WHERE cpf = $1', [cpfInput]);
        const usuario = resultado.rows[0];

        if (usuario && await bcrypt.compare(passwordInput, usuario.senha)) {
            req.session.usuario = {
                nome: usuario.nome,
                email: usuario.email,
                cpf: usuario.cpf
            };
            res.redirect('/pages/user.html');
        } else {
            res.send('CPF ou senha invalidos');
        }
    } catch (err) {
        console.error(err);
        res.send('Erro ao fazer login');
    }
};


exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erro ao encerrar a sessão');
        }
        res.redirect('/login');
    });
};