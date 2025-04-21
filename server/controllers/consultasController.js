const pool = require('../database/db');

exports.agendarConsulta = async (req, res) => {
    const { especialidade, medico, dataConsulta } = req.body;

    if (!req.session.usuario) {
        return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    try {
        const resultadoMedico = await pool.query(
            'SELECT crm FROM medicos WHERE nome = $1',
            [medico]
        );

        if (resultadoMedico.rows.length === 0) {
            return res.status(404).json({ erro: 'Médico não encontrado' });
        }

        const crm_medico = resultadoMedico.rows[0].crm;

        const result = await pool.query(
            `INSERT INTO consultas (cpf_usuario, especialidade, medico, data_consulta, data_agendamento, crm_medico)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [req.session.usuario.cpf, especialidade, medico, dataConsulta, new Date().toISOString(), crm_medico]
        );

        res.json({ sucesso: true, consulta: result.rows[0] });

    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao agendar consulta' });
    }
};


exports.getConsultas = async (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM consultas WHERE cpf_usuario = $1 ORDER BY data_consulta',
            [req.session.usuario.cpf]
        );

        res.json({ consultas: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar consultas agendadas' });
    }
};


exports.cancelarConsulta = async (req, res) => {
    const idConsulta = req.params.id;
    try {
        await pool.query('DELETE FROM consultas WHERE id = $1', [idConsulta]);
        res.status(200).json({ mensagem: 'Consulta cancelada com sucesso!' });
    } catch (error) {
        console.error('Erro ao cancelar consulta:', error);
        res.status(500).json({ mensagem: 'Erro ao cancelar consulta.' });
    }
};