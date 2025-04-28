const { formatarCPF, formatarTelefone } = require('../../assets/js/user');

// Mock para funções que acessam o DOM e fetch (para agendarConsulta)
global.fetch = jest.fn();
document.getElementById = jest.fn();

describe('Função formatarCPF', () => {
  test('Deve formatar corretamente um CPF com apenas números', () => {
    expect(formatarCPF('12345678901')).toBe('123.456.789-01');
  });

  test('Deve remover caracteres não numéricos antes de formatar', () => {
    expect(formatarCPF('123.456.789-01')).toBe('123.456.789-01');
  });

  test('Deve lidar com entradas incompletas', () => {
    expect(formatarCPF('12345')).toBe('123.45');
  });
});

describe('Função formatarTelefone', () => {
  test('Deve formatar corretamente um telefone com 11 dígitos', () => {
    expect(formatarTelefone('11987654321')).toBe('(11) 98765-4321');
  });

  test('Deve remover caracteres não numéricos antes de formatar', () => {
    expect(formatarTelefone('(11)98765-4321')).toBe('(11) 98765-4321');
  });

  test('Deve truncar telefones com mais de 11 dígitos', () => {
    expect(formatarTelefone('1198765432100')).toBe('(11) 98765-4321');
  });
});

describe('Função agendarConsulta', () => {
  beforeEach(() => {
    // Reset mocks antes de cada teste
    fetch.mockClear();
    document.getElementById.mockClear();
  });

  test('Deve alertar se algum campo estiver vazio', () => {
    document.getElementById.mockImplementation((id) => {
      return { value: id === 'especialidade' ? '' : 'algum valor' };
    });
    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});

    const { agendarConsulta } = require('../../assets/js/user');
    agendarConsulta();

    expect(alertMock).toHaveBeenCalledWith('Por favor, preencha todos os campos.');

    alertMock.mockRestore();
  });

  test('Deve fazer uma requisição POST se todos os campos forem preenchidos', async () => {
    document.getElementById.mockImplementation((id) => {
      return { value: 'algum valor' };
    });
    fetch.mockResolvedValueOnce({
      json: async () => ({ sucesso: true })
    });
    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});

    const { agendarConsulta } = require('../../assets/js/user');
    await agendarConsulta();

    expect(fetch).toHaveBeenCalledWith('/api/consultas/agendar', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        especialidade: 'algum valor',
        medico: 'algum valor',
        dataConsulta: 'algum valor'
      })
    }));

    expect(alertMock).toHaveBeenCalledWith('Consulta agendada com sucesso!');

    alertMock.mockRestore();
  });
});
