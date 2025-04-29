import { salvarSexoTipo } from '../salvarSexoTipo.js'; /* import da função salvar sexo e tipo sanguíneo */
import { formatarCPF, formatarTelefone } from "../formatadores.js"; /* import da função de formatar cpf e telefone */

export function carregarDadosPessoais(contentArea) {
    contentArea.innerHTML = `
            <h2>Dados Pessoais</h2>
            <form>
              <label for="nome">Nome:</label>
              <input type="text" id="nome" class="form-control" placeholder="Nome completo" disabled readonly>
              <label for="cpf">CPF:</label>
              <input type="text" id="cpf" class="form-control" placeholder="CPF" disabled readonly>
              <label for="endereco">Endereco:</label>
              <input type="text" id="endereco" class="form-control" placeholder="Endereco">
              <label for="telefone">Telefone:</label>
              <input type="tel" id="telefone" class="form-control" placeholder="Telefone">
              <label for="sexo">Sexo:</label>
              <select id="sexo" class="form-control">
                <option value="">Selecione uma opcao</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
              <label for="tipo_sanguineo">Tipo Sanguineo:</label>
              <select id="tipo_sanguineo" class="form-control">
                <option value="">Selecione uma opcao</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              
              <button type="button" class="btn btn-primary mt-2" id="btnAtualizarDados">Atualizar Dados</button>
            </form>
          `;

    fetch('/api/usuario')
        .then(res => res.json())
        .then(data => {
            document.getElementById('nome').value = data.nome || '';
            document.getElementById('cpf').value = formatarCPF(data.cpf || '');
            document.getElementById('endereco').value = data.endereco || '';

            const telefoneInput = document.getElementById('telefone');
            telefoneInput.value = formatarTelefone(data.telefone || '');
            telefoneInput.addEventListener('input', () => {
                telefoneInput.value = formatarTelefone(telefoneInput.value);
            });

            document.getElementById('sexo').value = data.sexo || '';
            document.getElementById('tipo_sanguineo').value = data.tipo_sanguineo || '';
        })
        .catch(err => console.error('Erro ao preencher dados:', err));

    const btnAtualizar = document.getElementById('btnAtualizarDados');
    btnAtualizar.addEventListener('click', salvarSexoTipo);
}