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

  it('tem que destruir a sessao e fazer logout', () => {
    authController.logout(mockReq, mockRes);

    expect(mockReq.session.destroy).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith('Logout realizado');
  });

  it('Retorna erro se nao conseguir destruir a sessao', () => {
    mockReq.session.destroy.mockImplementationOnce((callback) => callback(new Error('Erro ao destruir sessao')));

    authController.logout(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Erro ao encerrar a sessao');
  });
});
