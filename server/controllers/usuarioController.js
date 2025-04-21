const pool = require('../database/db');
const bcrypt = require('bcrypt');

exports.getUsuario = async (req, res) => {
    if (!req.session.usuario) return res.status(401).json({ erro: 'Não autenticado' });

    try {
        const resultado = await pool.query(
            'SELECT nome, email, cpf, telefone, endereco, sexo, tipo_sanguineo FROM usuarios WHERE cpf = $1',
            [req.session.usuario.cpf]
        );
        res.json(resultado.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar dados do usuário' });
    }
};


exports.atualizarEmail = async (req, res) => {
    if (!req.session.usuario) return res.status(401).json({ erro: 'Não autenticado' });

    const { email } = req.body;
    try {
        await pool.query('UPDATE usuarios SET email = $1 WHERE cpf = $2', [email, req.session.usuario.cpf]);
        req.session.usuario.email = email;
        res.json({ sucesso: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao atualizar e-mail' });
    }
};


exports.atualizarSenha = async (req, res) => {
    if (!req.session.usuario) return res.status(401).json({ erro: 'Não autenticado' });

    const { senha } = req.body;
    try {
        const hash = await bcrypt.hash(senha, 10);
        await pool.query('UPDATE usuarios SET senha = $1 WHERE cpf = $2', [hash, req.session.usuario.cpf]);
        res.json({ sucesso: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao atualizar senha' });
    }
};


exports.atualizarDados = async (req, res) => {
    if (!req.session.usuario) return res.status(401).json({ erro: 'Não autenticado' });

    const { sexo, tipo_sanguineo, telefone, endereco } = req.body;

    try {
        await pool.query(
            'UPDATE usuarios SET sexo = $1, tipo_sanguineo = $2, telefone = $3, endereco = $4 WHERE cpf = $5',
            [sexo, tipo_sanguineo, telefone, endereco, req.session.usuario.cpf]
        );
        res.status(200).json({ mensagem: 'Atualizado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao atualizar' });
    }
};