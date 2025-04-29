jest.mock('../../server/database/db');

const authController = require('../../server/controllers/authController');

describe('authController - logout', () => {
  const mockReq = {
    session: {
      destroy: jest.fn((callback) => callback())
    }
  };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };

  it('deve destruir a sessão e fazer logout', () => {
    authController.logout(mockReq, mockRes);

    expect(mockReq.session.destroy).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith('Logout realizado');
  });

  it('deve retornar erro se não conseguir destruir a sessão', () => {
    mockReq.session.destroy.mockImplementationOnce((callback) => callback(new Error('Erro ao destruir sessão')));

    authController.logout(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Erro ao encerrar a sessao');
  });
});
