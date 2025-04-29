import { buscarConsultasPorCpf } from '../../server/services/consultasServices.js';
import db from '../../server/database/db.js';

jest.mock('../../server/database/db.js'); 

describe('Service: buscarConsultasPorCpf', () => {
  it('deve retornar as consultas do usuário', async () => {
    const consultasFake = {
      rows: [
        { id: 1, especialidade: 'Cardiologia', medico: 'Dr. José', data_consulta: '2025-05-01' }
      ]
    };

    db.query.mockResolvedValue(consultasFake);

    const cpf = '12345678900';
    const resultado = await buscarConsultasPorCpf(cpf);

    expect(resultado).toEqual(consultasFake.rows);
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('SELECT'), [cpf]);
  });

  it('deve retornar array vazio se não houver consultas', async () => {
    db.query.mockResolvedValue({ rows: [] });

    const resultado = await buscarConsultasPorCpf('00000000000');

    expect(resultado).toEqual([]);
  });
});
