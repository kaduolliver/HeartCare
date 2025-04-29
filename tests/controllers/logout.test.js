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

  it('deve destruir a sess�o e fazer logout', () => {
    authController.logout(mockReq, mockRes);

    expect(mockReq.session.destroy).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith('Logout realizado');
  });

  it('deve retornar erro se n�o conseguir destruir a sess�o', () => {
    mockReq.session.destroy.mockImplementationOnce((callback) => callback(new Error('Erro ao destruir sess�o')));

    authController.logout(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Erro ao encerrar a sessao');
  });
});
