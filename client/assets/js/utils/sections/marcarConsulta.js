import { agendarConsulta } from '../agendarConsulta.js'; /* import da função agendar consultas */

export function carregarMarcarConsultas(contentArea) {
    contentArea.innerHTML = `
            <h2>Marcar Consulta</h2>
            <form>
              <div class="mb-3">
                <label for="especialidade" class="form-label">Especialidade</label>
                <select id="especialidade" class="form-control">
                  <option value="">Escolha a especialidade</option>
                  <option value="Cardiologia Clinica">Cardiologia Clinica</option>
                  <option value="Cardiologia Intervencionista">Cardiologia Intervencionista</option>
                  <option value="Arritmologia e Eletrofisiologia">Arritmologia e Eletrofisiologia</option>
                  <option value="Cardiologia Pediatrica">Cardiologia Pediatrica</option>
                  <option value="Cardiologia do Esporte">Cardiologia do Esporte</option>
                  <option value="Cardiologia Geriatrica">Cardiologia Geriatrica</option>
                  <option value="Insuficiencia Cardiaca e Transplante">Insuficiencia Cardiaca e Transplante</option>
                  <option value="Imagenologia Cardiovascular">Imagenologia Cardiovascular</option>
                  <option value="Cardiologia Preventiva">Cardiologia Preventiva</option>
                  <option value="Cardiologia de Emergencia">Cardiologia de Emergencia</option>
                </select>
              </div>
        
              <div class="mb-3">
                <label for="medico" class="form-label">Medico</label>
                <select id="medico" class="form-control">
                  <option value="">Escolha o medico</option>
                </select>
              </div>
        
              <div class="mb-3">
                <label for="dataConsulta" class="form-label">Data e Hora</label>
                <input type="datetime-local" id="dataConsulta" class="form-control">
              </div>
        
              <button type="button" id="btnAgendar" class="btn btn-success mt-2">Agendar</button>
            </form>
          `;

    setTimeout(() => {
        const especialidadeSelect = document.getElementById('especialidade');
        const medicoSelect = document.getElementById('medico');

        const especialidadesMedicos = {
            'Cardiologia Clinica': ['Dra. Ana Lucia Mendes'],
            'Cardiologia Intervencionista': ['Dr. Carlos Eduardo Rocha'],
            'Arritmologia e Eletrofisiologia': ['Dra. Fernanda Oliveira Almeida'],
            'Cardiologia Pediatrica': ['Dr. Rafael Torres Almeida'],
            'Cardiologia do Esporte': ['Dra. Juliana Costa Lima'],
            'Cardiologia Geriatrica': ['Dr. Marcelo Henrique Barbosa'],
            'Insuficiencia Cardiaca e Transplante': ['Dra. Patricia Souza Martins'],
            'Imagenologia Cardiovascular': ['Dr. Lucas Pereira Gomes'],
            'Cardiologia Preventiva': ['Dra. Camila Ribeiro Dias'],
            'Cardiologia de Emergencia': ['Dr. Diego Nascimento Silva']
        };

        especialidadeSelect.addEventListener('change', () => {
            const especialidadeSelecionada = especialidadeSelect.value;
            medicoSelect.innerHTML = '<option value="">Escolha o medico</option>';

            if (especialidadeSelecionada && especialidadesMedicos[especialidadeSelecionada]) {
                especialidadesMedicos[especialidadeSelecionada].forEach(medico => {
                    const option = document.createElement('option');
                    option.value = medico;
                    option.textContent = medico;
                    medicoSelect.appendChild(option);
                });
            }
        });
    }, 0);

    const btnAgendar = document.getElementById('btnAgendar');
    if (btnAgendar) {
        btnAgendar.addEventListener('click', agendarConsulta);
    }
}