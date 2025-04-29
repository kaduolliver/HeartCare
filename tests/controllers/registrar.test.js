const { registrar } = require('../../server/controllers/authController');
const bcrypt = require('bcrypt');
const db = require('../../server/database/db');

jest.mock('bcrypt');
jest.mock('../../server/database/db');

describe('authController - registrar', () => {
  const mockReq = {
    body: {
      NomeCompleto: 'Cristiano Araujo',
      CPF: '12345678900',
      DataNascimento: '1990-01-01',
      Email: 'CrisAraujo@gmail.com',
      Telefone: '11999999999',
      Senha: 'ABC123',
      ConfirmarSenha: 'ABC123'
    }
  };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve cadastrar usuário com sucesso', async () => {
    bcrypt.hash.mockResolvedValue('hashFake');
    db.query.mockResolvedValue({ rows: [{ id: 1 }] });

    await registrar(mockReq, mockRes);

    expect(bcrypt.hash).toHaveBeenCalledWith('ABC123', 10);
    expect(db.query).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith('Conta cadastrada com sucesso');
  });

  it('deve retornar erro se senhas forem diferentes', async () => {
    const req = { ...mockReq, body: { ...mockReq.body, ConfirmarSenha: 'outraSenha' } };
    await registrar(req, mockRes);
    expect(mockRes.send).toHaveBeenCalledWith('Senhas não coincidem');
  });
});
