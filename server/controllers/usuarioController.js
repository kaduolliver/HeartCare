// Importa a conexão com o banco de dados PostgreSQL
const pool = require('../database/db');
// Importa o bcrypt para fazer hash de senhas
const bcrypt = require('bcrypt');

const { gerarHashSenha } = require('../utils/usuarioUtils')
const { validarEmail } = require('../utils/validacoesUsuario')

// Função para buscar os dados do usuário logado
exports.getUsuario = async (req, res) => {
    // Verifica se o usuário está autenticado pela sessão
    if (!req.session.usuario) return res.status(401).json({ erro: 'Não autenticado' });

    try {
        // Consulta no banco os dados pessoais do usuário usando o CPF da sessão
        const resultado = await pool.query(
            'SELECT nome, email, cpf, telefone, endereco, sexo, tipo_sanguineo FROM usuarios WHERE cpf = $1',
            [req.session.usuario.cpf]
        );

        // Retorna os dados encontrados
        res.json(resultado.rows[0]);
    } catch (err) {
        console.error(err);
        // Se ocorrer erro, responde com erro 500
        res.status(500).json({ erro: 'Erro ao buscar dados do usuário' });
    }
};

// Função para atualizar o e-mail do usuário
exports.atualizarEmail = async (req, res) => {
    // Verifica se o usuário está autenticado
    if (!req.session.usuario) return res.status(401).json({ erro: 'Não autenticado' });

    const { email } = req.body; // Extrai o novo e-mail do corpo da requisição

    //Valida se o email está de acordo ou não
    if (!validarEmail(email)) {
        return res.status(400).json({ erro: 'E-mail inválido' });
    }

    try {
        // Atualiza o e-mail do usuário no banco de dados
        await pool.query('UPDATE usuarios SET email = $1 WHERE cpf = $2', [email, req.session.usuario.cpf]);

        // Atualiza o e-mail também na sessão
        req.session.usuario.email = email;

        // Responde com sucesso
        res.json({ sucesso: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao atualizar e-mail' });
    }
};

// Função para atualizar a senha do usuário
exports.atualizarSenha = async (req, res) => {
    // Verifica se o usuário está autenticado
    if (!req.session.usuario) return res.status(401).json({ erro: 'Não autenticado' });

    const { senha } = req.body; // Extrai a nova senha do corpo da requisição
    try {
        // Gera o hash da nova senha
        const hash = await gerarHashSenha(senha);

        // Atualiza a senha no banco de dados
        await pool.query('UPDATE usuarios SET senha = $1 WHERE cpf = $2', [hash, req.session.usuario.cpf]);

        // Responde com sucesso
        res.json({ sucesso: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao atualizar senha' });
    }
};

// Função para atualizar outros dados pessoais do usuário
exports.atualizarDados = async (req, res) => {
    // Verifica se o usuário está autenticado
    if (!req.session.usuario) return res.status(401).json({ erro: 'Não autenticado' });

    // Extrai os novos dados do corpo da requisição
    const { sexo, tipo_sanguineo, telefone, endereco } = req.body;

    try {
        // Atualiza sexo, tipo sanguíneo, telefone e endereço no banco de dados
        await pool.query(
            'UPDATE usuarios SET sexo = $1, tipo_sanguineo = $2, telefone = $3, endereco = $4 WHERE cpf = $5',
            [sexo, tipo_sanguineo, telefone, endereco, req.session.usuario.cpf]
        );

        // Responde confirmando a atualização
        res.status(200).json({ mensagem: 'Atualizado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao atualizar' });
    }
};
