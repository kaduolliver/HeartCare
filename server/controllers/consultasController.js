// Importa a conexão com o banco de dados PostgreSQL
const pool = require('../database/db');

// Função para agendar uma nova consulta
exports.agendarConsulta = async (req, res) => {
    // Extrai especialidade, médico e data da consulta do corpo da requisição
    const { especialidade, medico, dataConsulta } = req.body;

    // Verifica se o usuário está autenticado (se existe sessão ativa)
    if (!req.session.usuario) {
        return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    try {
        // Busca o CRM do médico informado no banco de dados
        const resultadoMedico = await pool.query(
            'SELECT crm FROM medicos WHERE nome = $1',
            [medico]
        );

        // Verifica se o médico foi encontrado
        if (resultadoMedico.rows.length === 0) {
            return res.status(404).json({ erro: 'Médico não encontrado' });
        }

        // Obtém o CRM do primeiro médico encontrado
        const crm_medico = resultadoMedico.rows[0].crm;

        // Insere uma nova consulta no banco de dados
        const result = await pool.query(
            `INSERT INTO consultas (cpf_usuario, especialidade, medico, data_consulta, data_agendamento, crm_medico)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [
                req.session.usuario.cpf,     // CPF do usuário logado
                especialidade,               // Especialidade médica
                medico,                      // Nome do médico
                dataConsulta,                // Data da consulta
                new Date().toISOString(),    // Data atual (agendamento)
                crm_medico                   // CRM do médico
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

// Função para buscar todas as consultas agendadas do usuário logado
exports.getConsultas = async (req, res) => {
    // Verifica se o usuário está autenticado
    if (!req.session.usuario) {
        return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    try {
        // Consulta todas as consultas do usuário ordenadas pela data da consulta
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

// Função para cancelar uma consulta pelo ID
exports.cancelarConsulta = async (req, res) => {
    // Pega o ID da consulta a ser cancelada da URL (parâmetro de rota)
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
