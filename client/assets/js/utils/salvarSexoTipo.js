export async function salvarSexoTipo() {
  const sexo = document.getElementById('sexo').value;
  const tipo_sanguineo = document.getElementById('tipo_sanguineo').value;
  const telefoneFormatado = document.getElementById('telefone').value;
  const telefone = telefoneFormatado.replace(/\D/g, '');
  const endereco = document.getElementById('endereco').value;

  try {
    const res = await fetch('/api/usuario/dados', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sexo, tipo_sanguineo, telefone, endereco })
    });

    if (!res.ok) throw new Error('Erro na atualiza��o');
    alert('Dados atualizados com sucesso!');
  } catch (err) {
    console.error(err);
    alert('Erro ao salvar dados');
  }
}
