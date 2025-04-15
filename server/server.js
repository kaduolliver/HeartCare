const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pool = require('../database/db');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'chave-secreta',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'contact.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'register.html'));
});

app.get('/service', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'service.html'));
});

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'user.html'));
});


app.get('/dados-usuario', (req, res) => {
    if (!req.session.usuario) return res.status(401).json({ erro: 'Não logado' });
    res.json(req.session.usuario);
});

app.post('/registro', async (req, res) => {
    const { NomeCompleto, CPF, DataNascimento, Email, Telefone, Senha, ConfirmarSenha } = req.body;

    if (Senha !== ConfirmarSenha) return res.send('Senhas não coincidem');

    if (!Senha || !ConfirmarSenha) return res.send('Senha não pode ser vazia');

    try {

        const senhaHash = await bcrypt.hash(Senha, 10);

        await pool.query(
            'INSERT INTO usuarios (nome, cpf, nascimento, email, telefone, senha) VALUES ($1, $2, $3, $4, $5, $6)',
            [NomeCompleto, CPF, DataNascimento, Email, Telefone, senhaHash]
        );
        res.redirect('/pages/login.html');
    } catch (error) {
        console.error(error);
        if (error.code === '23505') {
            res.send('CPF, e-mail ou telefone ja cadastrado.');
        } else {
            res.send('Erro ao registrar');
        }
    }
});

app.post('/login', async (req, res) => {
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
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
