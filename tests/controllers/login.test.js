const authController = require('../../server/controllers/authController');
const db = require('../../server/database/db');

describe('authController - login', () => {
    let mockReq, mockRes;

    beforeEach(() => {

        mockReq = {
            body: {
                cpfInput: '12345678900',
                passwordInput: 'senha123'
            }
        };
        mockRes = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Retorna erro quando CPF ou senha estiverem errados', async () => {
        jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

        await authController.login(mockReq, mockRes);

        expect(mockRes.send).toHaveBeenCalledWith('CPF ou senha invalidos');
    });

    it('Retorna erro se ocorrer um erro na consulta ao banco', async () => {
        jest.spyOn(db, 'query').mockRejectedValueOnce(new Error('Erro no banco'));

        await authController.login(mockReq, mockRes);

        expect(mockRes.send).toHaveBeenCalledWith('Erro ao fazer login');
    });
});