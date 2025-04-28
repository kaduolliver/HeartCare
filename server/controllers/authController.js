// Importa a biblioteca bcrypt para hash de senhas
const bcrypt = require('bcrypt');
// Importa a conexão com o banco de dados PostgreSQL
const pool = require('../database/db');

// Função para registrar um novo usuário
exports.registrar = async (req, res) => {
    // Extrai os campos enviados no corpo da requisição
    const { NomeCompleto, CPF, DataNascimento, Email, Telefone, Senha, ConfirmarSenha } = req.body;

    // Verifica se as senhas não coincidem
    if (Senha !== ConfirmarSenha) return res.send('Senhas não coincidem');

    // Verifica se a senha ou confirmação estão vazias
    if (!Senha || !ConfirmarSenha) return res.send('Senha não pode ser vazia');

    try {
        // Gera um hash da senha usando bcrypt (com 10 rounds de salt)
        const senhaHash = await bcrypt.hash(Senha, 10);

        // Insere o novo usuário no banco de dados
        await pool.query(
            'INSERT INTO usuarios (nome, cpf, nascimento, email, telefone, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [NomeCompleto, CPF, DataNascimento, Email, Telefone, senhaHash]
        );

        // Responde com sucesso ao cadastro
        res.status(201).send('Conta cadastrada com sucesso');
    } catch (error) {
        console.error(error);
        // Se o erro for de chave duplicada (código 23505), informa que o CPF, e-mail ou telefone já existem
        if (error.code === '23505') {
            res.send('CPF, e-mail ou telefone ja cadastrado.');
        } else {
            // Caso contrário, responde com erro genérico
            res.send('Erro ao registrar');
        }
    }
};

// Função para fazer login do usuário
exports.login = async (req, res) => {
    // Recebe e limpa o CPF (remove qualquer caractere que não seja número)
    const cpfInput = req.body.cpfInput.replace(/\D/g, '');
    const passwordInput = req.body.passwordInput;

    try {
        // Busca o usuário no banco pelo CPF
        const resultado = await pool.query('SELECT * FROM usuarios WHERE cpf = $1', [cpfInput]);
        const usuario = resultado.rows[0];

        // Se o usuário existe e a senha bate com a senha armazenada
        if (usuario && await bcrypt.compare(passwordInput, usuario.senha)) {
            // Cria a sessão do usuário com os dados principais
            req.session.usuario = {
                nome: usuario.nome,
                email: usuario.email,
                cpf: usuario.cpf
            };
            // Redireciona o usuário para a página principal após login
            res.redirect('/pages/user.html');
        } else {
            // Se CPF ou senha não baterem, envia mensagem de erro
            res.send('CPF ou senha invalidos');
        }
    } catch (err) {
        console.error(err);
        // Em caso de erro na consulta ou no processo de login
        res.send('Erro ao fazer login');
    }
};

// Função para encerrar a sessão do usuário (logout)
exports.logout = (req, res) => {
    // Destroi a sessão atual
    req.session.destroy((err) => {
      if (err) {
        console.log('Erro ao destruir sessao:', err);
        return res.status(500).send('Erro ao encerrar a sessao');
      }
      console.log('Sessao destruida com sucesso');
      res.status(200).send('Logout realizado');
    });
};
