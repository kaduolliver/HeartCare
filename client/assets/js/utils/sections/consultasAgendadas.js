export function carregarConsultasAgendadas(contentArea) {
    contentArea.innerHTML = `
          <h2 class="mb-4">Consultas Agendadas</h2>
          <div class="table-responsive">
            <table class="table table-hover table-bordered rounded shadow-sm">
              <thead class="table-primary">
                <tr>
                  <th>Data e Hora do Agendamento</th>
                  <th>Data da Consulta</th>
                  <th>Medico</th>
                  <th>Especialidade</th>
                </tr>
              </thead>
              <tbody id="tabelaConsultas">
              </tbody>
            </table>
          </div>
          `;

    fetch('/api/consultas')
        .then(res => res.json())
        .then(data => {
            const tabelaConsultas = document.getElementById('tabelaConsultas');
            tabelaConsultas.innerHTML = ''; 

            if (data.consultas && data.consultas.length > 0) {
                data.consultas.forEach(consulta => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                  <td>${formatarData(consulta.data_agendamento)}</td>
                  <td>${formatarData(consulta.data_consulta)}</td> 
                  <td>${consulta.medico}</td>
                  <td>${consulta.especialidade}</td>
                  <td>
                    <button class="btn btn-danger btn-sm cancelar-btn" data-id="${consulta.id}">
                      Cancelar
                    </button>
                  </td>
                `;
                    tabelaConsultas.appendChild(row);
                });
            } else {
                tabelaConsultas.innerHTML = '<tr><td colspan="5">Nenhuma consulta agendada.</td></tr>';
            }
        })
        .catch(err => {
            console.error('Erro:', err);
            document.getElementById('tabelaConsultas').innerHTML = '<tr><td colspan="5">Erro ao carregar consultas.</td></tr>';
        });

    function formatarData(dataString) {
        if (!dataString) return "Data inválida";
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dataString).toLocaleString('pt-BR', options);
    }
}