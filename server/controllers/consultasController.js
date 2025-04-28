// Importa a conex�o com o banco de dados PostgreSQL
const pool = require('../database/db');

// Fun��o para agendar uma nova consulta
exports.agendarConsulta = async (req, res) => {
    // Extrai especialidade, m�dico e data da consulta do corpo da requisi��o
    const { especialidade, medico, dataConsulta } = req.body;

    // Verifica se o usu�rio est� autenticado (se existe sess�o ativa)
    if (!req.session.usuario) {
        return res.status(401).json({ erro: 'Usu�rio n�o autenticado' });
    }

    try {
        // Busca o CRM do m�dico informado no banco de dados
        const resultadoMedico = await pool.query(
            'SELECT crm FROM medicos WHERE nome = $1',
            [medico]
        );

        // Verifica se o m�dico foi encontrado
        if (resultadoMedico.rows.length === 0) {
            return res.status(404).json({ erro: 'M�dico n�o encontrado' });
        }

        // Obt�m o CRM do primeiro m�dico encontrado
        const crm_medico = resultadoMedico.rows[0].crm;

        // Insere uma nova consulta no banco de dados
        const result = await pool.query(
            `INSERT INTO consultas (cpf_usuario, especialidade, medico, data_consulta, data_agendamento, crm_medico)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [
                req.session.usuario.cpf,     // CPF do usu�rio logado
                especialidade,               // Especialidade m�dica
                medico,                      // Nome do m�dico
                dataConsulta,                // Data da consulta
                new Date().toISOString(),    // Data atual (agendamento)
                crm_medico                   // CRM do m�dico
            ]
        );

        // Retorna sucesso e o ID da nova consulta criada
        res.json({ sucesso: true, consulta: result.rows[0] });

    } catch (err) {
        console.error(err);
        // Em caso de erro interno, responde com status 500
        res.status(500).json({ erro: 'Erro ao agendar consulta' });
    }
};

// Fun��o para buscar todas as consultas agendadas do usu�rio logado
exports.getConsultas = async (req, res) => {
    // Verifica se o usu�rio est� autenticado
    if (!req.session.usuario) {
        return res.status(401).json({ erro: 'Usu�rio n�o autenticado' });
    }

    try {
        // Consulta todas as consultas do usu�rio ordenadas pela data da consulta
        const result = await pool.query(
            'SELECT * FROM consultas WHERE cpf_usuario = $1 ORDER BY data_consulta',
            [req.session.usuario.cpf]
        );

        // Retorna a lista de consultas
        res.json({ consultas: result.rows });
    } catch (err) {
        console.error(err);
        // Em caso de erro, responde com status 500
        res.status(500).json({ erro: 'Erro ao buscar consultas agendadas' });
    }
};

// Fun��o para cancelar uma consulta pelo ID
exports.cancelarConsulta = async (req, res) => {
    // Pega o ID da consulta a ser cancelada da URL (par�metro de rota)
    const idConsulta = req.params.id;

    try {
        // Deleta a consulta do banco de dados pelo ID
        await pool.query('DELETE FROM consultas WHERE id = $1', [idConsulta]);

        // Responde com sucesso
        res.status(200).json({ mensagem: 'Consulta cancelada com sucesso!' });
    } catch (error) {
        console.error('Erro ao cancelar consulta:', error);
        // Em caso de erro, responde com erro 500
        res.status(500).json({ mensagem: 'Erro ao cancelar consulta.' });
    }
};
