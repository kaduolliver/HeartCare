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

/* Máscaras de CPF e Telefone */
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

function agendarConsulta() {
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

  // Enviar para a API
  fetch('/api/consulta', {
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


function showContent(section, button) {
  const contentArea = document.getElementById('content-area');
  const buttons = document.querySelectorAll('.menu-button');
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  switch (section) {
    case 'perfil':
      contentArea.innerHTML = `
        <h2 class="mb-4">Perfil</h2>
        
        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <div class="input-group">
                <input type="email" id="email" class="form-control" disabled>
                <button class="btn btn-outline-primary" id="editarEmail">Alterar</button>
            </div>
        </div>

        <div class="mb-3">
            <label for="senha" class="form-label">Senha</label>
            <div class="input-group">
                <input type="password" id="senha" class="form-control" value="********" disabled>
                <button class="btn btn-outline-primary" id="editarSenha">Alterar</button>
            </div>
        </div>
    `;

      fetch('/api/usuario')
        .then(res => res.json())
        .then(data => {
          document.getElementById('email').value = data.email;
        });

      document.getElementById('editarEmail').addEventListener('click', () => {
        const emailInput = document.getElementById('email');
        if (emailInput.disabled) {
          emailInput.disabled = false;
          emailInput.focus();
          document.getElementById('editarEmail').textContent = "Salvar";
        } else {
          const novoEmail = emailInput.value.trim();
          fetch('/api/usuario/email', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: novoEmail })
          })
            .then(res => res.json())
            .then(data => {
              if (data.sucesso) {
                emailInput.disabled = true;
                document.getElementById('editarEmail').textContent = "Alterar";
                alert("E-mail atualizado com sucesso.");
              } else {
                alert('Erro ao atualizar e-mail');
              }
            });
        }
      });

      document.getElementById('editarSenha').addEventListener('click', () => {
        const novaSenha = prompt("Digite a nova senha:");
        if (novaSenha && novaSenha.length >= 6) {
          fetch('/api/usuario/senha', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senha: novaSenha })
          })
            .then(res => res.json())
            .then(data => {
              if (data.sucesso) {
                alert("Senha atualizada com sucesso.");
              } else {
                alert("Erro ao atualizar senha.");
              }
            });
        } else if (novaSenha !== null) {
          alert("A senha deve ter pelo menos 6 caracteres.");
        }
      });
      break;


    case 'dados':
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
            
            <button type="button" class="btn btn-primary mt-2" onclick="salvarSexoTipo()">Atualizar Dados</button>
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

      break;

    case 'marcar':
      contentArea.innerHTML = `
            <h2>Marcar Consulta</h2>
            <form>
              <div class="mb-3">
                <label for="especialidade" class="form-label">Especialidade</label>
                <select id="especialidade" class="form-control">
                  <option value="">Escolha a especialidade</option>
                  <option value="Cardiologia">Cardiologia</option>
                  <option value="Clinico Geral">Clinico Geral</option>
                  <option value="Endocrinologia">Endocrinologia</option>
                  <option value="Neurologia">Neurologia</option>
                </select>
              </div>
    
              <div class="mb-3">
                <label for="medico" class="form-label">Medico</label>
                <select id="medico" class="form-control">
                  <option value="">Escolha o medico</option>
                  <option value="Dr. Joao Silva">Dr. Joao Silva</option>
                  <option value="Dra. Ana Lima">Dra. Ana Lima</option>
                </select>
              </div>
    
              <div class="mb-3">
                <label for="dataConsulta" class="form-label">Data e Hora</label>
                <input type="datetime-local" id="dataConsulta" class="form-control">
              </div>
    
              <button type="button" class="btn btn-success mt-2" onclick="agendarConsulta()">Agendar</button>
            </form>
        `;

      break;

    case 'agendadas':
      contentArea.innerHTML = `
            <h2>Consultas Agendadas</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Data e Hora do Agendamento</th>
                        <th>Data da Consulta</th>
                        <th>Medico</th>
                        <th>Especialidade</th>
                    </tr>
                </thead>
                <tbody id="tabelaConsultas">
                    <!-- Consultas serão carregadas aqui -->
                </tbody>
            </table>
        `;

      fetch('/api/consultas/agendadas')
        .then(res => res.json())
        .then(data => {
          const tabelaConsultas = document.getElementById('tabelaConsultas');
          if (data.consultas && data.consultas.length > 0) {
            data.consultas.forEach(consulta => {
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${formatarData(consulta.data_agendamento)}</td>
                <td>${formatarData(consulta.data_consulta)}</td> 
                <td>${consulta.medico}</td>
                <td>${consulta.especialidade}</td>
              `;
              tabelaConsultas.appendChild(row);
            });
          } else {
            tabelaConsultas.innerHTML = '<tr><td colspan="4">Nenhuma consulta agendada.</td></tr>';
          }
        })
        .catch(err => {
          console.error('Erro:', err);
          document.getElementById('tabelaConsultas').innerHTML = '<tr><td colspan="4">Erro ao carregar consultas.</td></tr>';
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
  const telefone = document.getElementById('telefone').value;
  const endereco = document.getElementById('endereco').value;

  try {
    const res = await fetch('/api/usuario', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sexo, tipo_sanguineo, telefone, endereco })
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
    return window.location.href = '/login';
  }

  const data = await res.json();


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
        window.location.href = '/login';
      } else {
        alert('Erro ao fazer logout');
      }
    })
    .catch(err => {
      console.error('Erro:', err);
      alert('Erro ao fazer logout');
    });
});
