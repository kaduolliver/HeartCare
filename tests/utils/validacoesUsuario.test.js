const {
    validarEmail,
    validarCPF,
    validarTelefone,
    normalizarTexto
  } = require('../../server/utils/validacoesUsuario');
  
  describe('validacoes de usuario', () => {
    test('validarEmail deve aceitar e-mails validos', () => {
      expect(validarEmail('kadu@gmail.com')).toBe(true);
      expect(validarEmail('kadu@gmail.co')).toBe(true);
    });
  
    test('validarEmail precisa recusar e-mails invalidos', () => {
      expect(validarEmail('sem-arroba.com')).toBe(false);
      expect(validarEmail('kadu@')).toBe(false);
    });
  
    test('validarCPF deve aceitar CPFs com 11 digitos numericos', () => {
      expect(validarCPF('12345678901')).toBe(true);
    });
  
    test('validarCPF deve recusar CPFs invalidos', () => {
      expect(validarCPF('abc123')).toBe(false);
      expect(validarCPF('123')).toBe(false);
    });
  
    test('validarTelefone deve aceitar numeros com 10 ou 11 dígitos', () => {
      expect(validarTelefone('11999999999')).toBe(true);
      expect(validarTelefone('1122223333')).toBe(true);
    });
  
    test('validarTelefone precisa recusar numeros invalidos', () => {
      expect(validarTelefone('123')).toBe(false);
      expect(validarTelefone('abcdefghij')).toBe(false);
    });
  
    test('normalizarTexto precisa remover espaços em branco nas bordas', () => {
      expect(normalizarTexto('  texto limpo  ')).toBe('texto limpo');
    });
  });
  