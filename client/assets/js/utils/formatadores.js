function formatarCPF(cpf) {
    return cpf.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  
  function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '').slice(0, 11);
    return telefone
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
  
  export { formatarCPF, formatarTelefone };
  