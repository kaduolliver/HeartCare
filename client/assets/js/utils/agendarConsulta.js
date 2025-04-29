export function agendarConsulta() {
    const especialidade = document.getElementById('especialidade').value;
    const medico = document.getElementById('medico').value;
    const dataConsulta = document.getElementById('dataConsulta').value;
  
    console.log('Especialidade:', especialidade);
    console.log('Medico:', medico);
    console.log('Data da consulta:', dataConsulta);
  
    if (!especialidade || !medico || !dataConsulta) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    fetch('/api/consultas/agendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ especialidade, medico, dataConsulta })
    })
      .then(res => res.json())
      .then(data => {
        if (data.sucesso) {
          alert("Consulta agendada com sucesso!");
        } else {
          alert("Erro ao agendar consulta.");
        }
      })
      .catch(err => {
        console.error('Erro:', err);
        alert("Erro ao agendar consulta.");
      });
  }
  