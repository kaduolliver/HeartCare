// Importa a biblioteca bcrypt para hash de senhas
const bcrypt = require('bcrypt');
// Importa a conex�o com o banco de dados PostgreSQL
const pool = require('../database/db');

// Fun��o para registrar um novo usu�rio
exports.registrar = async (req, res) => {
    // Extrai os campos enviados no corpo da requisi��o
    const { NomeCompleto, CPF, DataNascimento, Email, Telefone, Senha, ConfirmarSenha } = req.body;

    // Verifica se as senhas n�o coincidem
    if (Senha !== ConfirmarSenha) return res.send('Senhas n�o coincidem');

    // Verifica se a senha ou confirma��o est�o vazias
    if (!Senha || !ConfirmarSenha) return res.send('Senha n�o pode ser vazia');

    try {
        // Gera um hash da senha usando bcrypt (com 10 rounds de salt)
        const senhaHash = await bcrypt.hash(Senha, 10);

        // Insere o novo usu�rio no banco de dados
        await pool.query(
            'INSERT INTO usuarios (nome, cpf, nascimento, email, telefone, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [NomeCompleto, CPF, DataNascimento, Email, Telefone, senhaHash]
        );

        // Responde com sucesso ao cadastro
        res.status(201).send('Conta cadastrada com sucesso');
    } catch (error) {
        console.error(error);
        // Se o erro for de chave duplicada (c�digo 23505), informa que o CPF, e-mail ou telefone j� existem
        if (error.code === '23505') {
            res.send('CPF, e-mail ou telefone ja cadastrado.');
        } else {
            // Caso contr�rio, responde com erro gen�rico
            res.send('Erro ao registrar');
        }
    }
};

// Fun��o para fazer login do usu�rio
exports.login = async (req, res) => {
    // Recebe e limpa o CPF (remove qualquer caractere que n�o seja n�mero)
    const cpfInput = req.body.cpfInput.replace(/\D/g, '');
    const passwordInput = req.body.passwordInput;

    try {
        // Busca o usu�rio no banco pelo CPF
        const resultado = await pool.query('SELECT * FROM usuarios WHERE cpf = $1', [cpfInput]);
        const usuario = resultado.rows[0];

        // Se o usu�rio existe e a senha bate com a senha armazenada
        if (usuario && await bcrypt.compare(passwordInput, usuario.senha)) {
            // Cria a sess�o do usu�rio com os dados principais
            req.session.usuario = {
                nome: usuario.nome,
                email: usuario.email,
                cpf: usuario.cpf
            };
            // Redireciona o usu�rio para a p�gina principal ap�s login
            res.redirect('/pages/user.html');
        } else {
            // Se CPF ou senha n�o baterem, envia mensagem de erro
            res.send('CPF ou senha invalidos');
        }
    } catch (err) {
        console.error(err);
        // Em caso de erro na consulta ou no processo de login
        res.send('Erro ao fazer login');
    }
};

// Fun��o para encerrar a sess�o do usu�rio (logout)
exports.logout = (req, res) => {
    // Destroi a sess�o atual
    req.session.destroy((err) => {
      if (err) {
        console.log('Erro ao destruir sessao:', err);
        return res.status(500).send('Erro ao encerrar a sessao');
      }
      console.log('Sessao destruida com sucesso');
      res.status(200).send('Logout realizado');
    });
};
