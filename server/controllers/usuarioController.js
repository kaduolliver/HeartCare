// Importa a conex�o com o banco de dados PostgreSQL
const pool = require('../database/db');
// Importa o bcrypt para fazer hash de senhas
const bcrypt = require('bcrypt');

const { gerarHashSenha } = require('../utils/usuarioUtils')
const { validarEmail } = require('../utils/validacoesUsuario')

// Fun��o para buscar os dados do usu�rio logado
exports.getUsuario = async (req, res) => {
    // Verifica se o usu�rio est� autenticado pela sess�o
    if (!req.session.usuario) return res.status(401).json({ erro: 'N�o autenticado' });

    try {
        // Consulta no banco os dados pessoais do usu�rio usando o CPF da sess�o
        const resultado = await pool.query(
            'SELECT nome, email, cpf, telefone, endereco, sexo, tipo_sanguineo FROM usuarios WHERE cpf = $1',
            [req.session.usuario.cpf]
        );

        // Retorna os dados encontrados
        res.json(resultado.rows[0]);
    } catch (err) {
        console.error(err);
        // Se ocorrer erro, responde com erro 500
        res.status(500).json({ erro: 'Erro ao buscar dados do usu�rio' });
    }
};

// Fun��o para atualizar o e-mail do usu�rio
exports.atualizarEmail = async (req, res) => {
    // Verifica se o usu�rio est� autenticado
    if (!req.session.usuario) return res.status(401).json({ erro: 'N�o autenticado' });

    const { email } = req.body; // Extrai o novo e-mail do corpo da requisi��o

    //Valida se o email est� de acordo ou n�o
    if (!validarEmail(email)) {
        return res.status(400).json({ erro: 'E-mail inv�lido' });
    }

    try {
        // Atualiza o e-mail do usu�rio no banco de dados
        await pool.query('UPDATE usuarios SET email = $1 WHERE cpf = $2', [email, req.session.usuario.cpf]);

        // Atualiza o e-mail tamb�m na sess�o
        req.session.usuario.email = email;

        // Responde com sucesso
        res.json({ sucesso: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao atualizar e-mail' });
    }
};

// Fun��o para atualizar a senha do usu�rio
exports.atualizarSenha = async (req, res) => {
    // Verifica se o usu�rio est� autenticado
    if (!req.session.usuario) return res.status(401).json({ erro: 'N�o autenticado' });

    const { senha } = req.body; // Extrai a nova senha do corpo da requisi��o
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

// Fun��o para atualizar outros dados pessoais do usu�rio
exports.atualizarDados = async (req, res) => {
    // Verifica se o usu�rio est� autenticado
    if (!req.session.usuario) return res.status(401).json({ erro: 'N�o autenticado' });

    // Extrai os novos dados do corpo da requisi��o
    const { sexo, tipo_sanguineo, telefone, endereco } = req.body;

    try {
        // Atualiza sexo, tipo sangu�neo, telefone e endere�o no banco de dados
        await pool.query(
            'UPDATE usuarios SET sexo = $1, tipo_sanguineo = $2, telefone = $3, endereco = $4 WHERE cpf = $5',
            [sexo, tipo_sanguineo, telefone, endereco, req.session.usuario.cpf]
        );

        // Responde confirmando a atualiza��o
        res.status(200).json({ mensagem: 'Atualizado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao atualizar' });
    }
};
