const pool = require('../database/db');

exports.buscarConsultasPorCpf = async (cpf) => {
  const result = await pool.query(
    'SELECT * FROM consultas WHERE cpf_usuario = $1 ORDER BY data_consulta',
    [cpf]
  );
  return result.rows;
};

exports.criarConsulta = async (cpf, especialidade, medico, dataConsulta, crm_medico) => {
  const result = await pool.query(
    `INSERT INTO consultas (cpf_usuario, especialidade, medico, data_consulta, data_agendamento, crm_medico)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [cpf, especialidade, medico, dataConsulta, new Date().toISOString(), crm_medico]
  );
  return result.rows[0];
};

exports.cancelarConsultaPorId = async (idConsulta) => {
  await pool.query('DELETE FROM consultas WHERE id = $1', [idConsulta]);
};
