const topBar = document.querySelector('.top-bar');

window.addEventListener('scroll', function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop < 100) {
    topBar.style.top = '0';
  } else {
    topBar.style.top = '-100px';
  }
});

/*----------------------------------AREA DE TESTE - TABELA ----------------------------------*/

function showContent(section, button) {
  const contentArea = document.getElementById('content-area');
  const buttons = document.querySelectorAll('.menu-button');
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  switch (section) {
    case 'perfil':
      contentArea.innerHTML = `
        <h2>Perfil</h2>
        <form>
          <label for="email">Novo E-mail:</label>
          <input type="email" id="email" class="form-control" placeholder="Digite seu novo e-mail">

          <label for="senha">Nova Senha:</label>
          <input type="password" id="senha" class="form-control" placeholder="Digite sua nova senha">

          <button class="btn btn-primary mt-2">Salvar Alterações</button>
        </form>
      `;
      break;

    case 'dados':
      contentArea.innerHTML = `
          <h2>Dados Pessoais</h2>
          <form>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" class="form-control" placeholder="Nome completo" readonly>
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" class="form-control" placeholder="CPF" readonly>
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
            
            <button type="button" class="btn btn-primary mt-2" onclick="salvarSexoTipo()">Atualizar Dados</button>
          </form>
        `;

      fetch('/api/usuario')
        .then(res => res.json())
        .then(data => {
          document.getElementById('nome').value = data.nome || '';
          document.getElementById('cpf').value = data.cpf || '';
          document.getElementById('endereco').value = data.endereco || '';
          document.getElementById('telefone').value = data.telefone || '';
          document.getElementById('sexo').value = data.sexo || '';
          document.getElementById('tipo_sanguineo').value = data.tipo_sanguineo || '';
        })
        .catch(err => console.error('Erro ao preencher dados:', err));
      break;

    case 'marcar':
      contentArea.innerHTML = `
        <h2>Marcar Consulta</h2>
        <form>
          <select class="form-control">
            <option value="">Escolha a especialidade</option>
            <option>Cardiologia</option>
            <option>Clinico Geral</option>
            <option>Endocrinologia</option>
            <option>Neurologia</option>
          </select>

          <select class="form-control">
            <option value="">Escolha o medico</option>
            <option>Dr. Joao Silva</option>
            <option>Dra. Ana Lima</option>
          </select>

          <input type="datetime-local" class="form-control">
          <button class="btn btn-success mt-2">Agendar</button>
        </form>
      `;
      break;

    case 'agendadas':
      contentArea.innerHTML = `
        <h2>Consultas Agendadas</h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Data do Agendamento</th>
              <th>Data da Consulta</th>
              <th>Medico</th>
              <th>Especialidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>18/04/2025 - 10:00</td>
              <td>20/04/2025 - 14:30</td>
              <td>Dr. Joao Silva</td>
              <td>Cardiologia</td>
            </tr>
          </tbody>
        </table>
      `;
      break;

    case 'exames':
      contentArea.innerHTML = `
        <h2>Resultado de Exames</h2>
        <p>Nenhum exame disponivel no momento.</p>
      `;
      break;

    default:
      contentArea.innerHTML = `<h2>Bem-vindo</h2><p>Selecione uma opcao do menu a esquerda.</p>`;
  }
}

async function salvarSexoTipo() {
  const sexo = document.getElementById('sexo').value;
  const tipo_sanguineo = document.getElementById('tipo_sanguineo').value;

  try {
    const res = await fetch('/api/usuario', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sexo, tipo_sanguineo })
    });

    if (!res.ok) throw new Error('Erro na atualização');
    alert('Dados atualizados com sucesso!');
  } catch (err) {
    console.error(err);
    alert('Erro ao salvar dados');
  }
}
/*----------------------------------AREA DE TESTE - TABELA ----------------------------------*/

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('/api/usuario');
  if (!res.ok) {
    return window.location.href = '/login'; // Se não estiver logado, redireciona para login
  }

  const data = await res.json();

  // Mostrar o botão de logout apenas se o usuário estiver logado
  if (data.nome) {
    document.getElementById('logout-button').style.display = 'inline-block';
  }
});

document.getElementById('logout-button')?.addEventListener('click', () => {
  fetch('/logout', {
    method: 'GET'
  })
    .then(res => {
      if (res.ok) {
        window.location.href = '/login'; // Redireciona para a página de login
      } else {
        alert('Erro ao fazer logout');
      }
    })
    .catch(err => {
      console.error('Erro:', err);
      alert('Erro ao fazer logout');
    });
});
