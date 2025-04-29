import { formatarCPF, formatarTelefone } from '../../client/assets/js/utils/formatadores';

describe('Funcoes de formatacao para CPF e Telefone', () => {
  
  describe('formatarCPF', () => {
    it('tem que formatar corretamente um CPF apenas com numeros', () => {
      const cpf = '12345678900';
      const resultado = formatarCPF(cpf);
      expect(resultado).toBe('123.456.789-00');
    });

    it('tem que remover caracteres nao numericos antes de formatar', () => {
      const cpf = '123.456-789/00';
      const resultado = formatarCPF(cpf);
      expect(resultado).toBe('123.456.789-00');
    });

    it('deve lidar com entradas incompletas corretamente', () => {
      const cpf = '12345';
      const resultado = formatarCPF(cpf);
      expect(resultado).toBe('123.45');
    });
  });

  describe('formatarTelefone', () => {
    it('deve formatar corretamente um telefone completo', () => {
      const telefone = '11987654321';
      const resultado = formatarTelefone(telefone);
      expect(resultado).toBe('(11) 98765-4321');
    });

    it('precisa cortar numeros excedentes apos 11 digitos', () => {
      const telefone = '11987654321000';
      const resultado = formatarTelefone(telefone);
      expect(resultado).toBe('(11) 98765-4321');
    });

    it('tem que lidar com caracteres nao numericos misturados', () => {
      const telefone = '(11)98765-4321';
      const resultado = formatarTelefone(telefone);
      expect(resultado).toBe('(11) 98765-4321');
    });
  });

});
