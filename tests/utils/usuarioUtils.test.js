const { gerarHashSenha } = require('../../server/utils/usuarioUtils');
const bcrypt = require('bcrypt');

describe('gerarHashSenha', () => {
  it('deve retornar um hash valido para a senha fornecida', async () => {
    const senha = 'senhaQualquer2001';
    const hash = await gerarHashSenha(senha);

    expect(typeof hash).toBe('string');
    expect(hash.length).toBeGreaterThan(0);

    const comparacao = await bcrypt.compare(senha, hash);
    expect(comparacao).toBe(true);
  });
});
