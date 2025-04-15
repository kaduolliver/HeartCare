const topBar = document.querySelector('.top-bar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop < 100) {
        topBar.style.top = '0'; 
    } else {
        topBar.style.top = '-100px'; 
    }
});

/*----------------------------------AREA DE TESTE - TABELA ----------------------------------*/

const contents = {
    perfil: `<h2>Perfil</h2><p>Aqui estao as informacoes do perfil do usuario.</p>`,
    dados: `
      <h2>Dados Pessoais</h2>
      <form id="dados-form">
        <div class="mb-3">
          <label for="nome" class="form-label">Nome Completo</label>
          <input type="text" class="form-control" id="nome" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input type="email" class="form-control" id="email" required>
        </div>
        <div class="mb-3">
          <label for="telefone" class="form-label">Telefone</label>
          <input type="tel" class="form-control" id="telefone" required>
        </div>
        <button type="submit" class="btn btn-custom">Salvar Dados</button>
      </form>
    `,
    consultas: `<h2>Consultas</h2><p>Hist�rico de consultas e agendamentos.</p>`,
    faq: `<h2>FAQ</h2><p>Perguntas frequentes e suporte.</p>`
  };

  function showContent(section, button) {
    document.getElementById('content-area').innerHTML = contents[section];

    // Remover classe "active" de todos os bot�es
    document.querySelectorAll('.menu-button').forEach(btn => {
      btn.classList.remove('active');
    });

    // Adicionar classe "active" ao bot�o atual
    button.classList.add('active');

    // Caso o formul�rio seja mostrado, adicionar a fun��o de salvar
    if (section === 'dados') {
      document.getElementById('dados-form').addEventListener('submit', handleFormSubmit);
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    // Aqui voc� poderia enviar os dados para um servidor usando fetch ou AJAX
    const userData = { nome, email, telefone };

    console.log("Dados do formul�rio", userData);

    // Exemplo de chamada para salvar no banco de dados via backend
    // fetch('/api/salvar-dados', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(userData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //   alert('Dados salvos com sucesso!');
    // })
    // .catch(error => {
    //   console.error('Erro ao salvar dados:', error);
    // });
  }

/*----------------------------------AREA DE TESTE - TABELA ----------------------------------*/