const topBar = document.querySelector('.top-bar');

window.addEventListener('scroll', function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop < 100) {
    topBar.style.top = '0';
  } else {
    topBar.style.top = '-100px';
  }
});

/*---------------------------------- Área para tabela principal da página "user" ----------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('perfilBtn').addEventListener('click', function () {
    showContent('perfil', this);
  });
  document.getElementById('dadosBtn').addEventListener('click', function () {
    showContent('dados', this);
  });
  document.getElementById('marcarBtn').addEventListener('click', function () {
    showContent('marcar', this);
  });
  document.getElementById('agendadasBtn').addEventListener('click', function () {
    showContent('agendadas', this);
  });
  document.getElementById('examesBtn').addEventListener('click', function () {
    showContent('exames', this);
  });
});

/* import da função "showContent" que mostra a tabela principal */
import { showContent } from '../js/utils/showContent.js';

document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('cancelar-btn')) {
    const idConsulta = e.target.getAttribute('data-id');

    if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
      try {
        const resposta = await fetch(`/api/consultas/${idConsulta}`, {
          method: 'DELETE'
        });

        if (resposta.ok) {
          alert('Consulta cancelada com sucesso!');
          e.target.closest('tr').remove();
        } else {
          const erro = await resposta.json();
          alert(erro.mensagem || 'Erro ao cancelar consulta.');
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro de conexão ao tentar cancelar.');
      }
    }
  }
});

/*---------------------------------- API LOGIN/LOGOUT ----------------------------------*/


document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('/api/usuario');
  if (!res.ok) {
    return window.location.href = '/login';
  }

  const data = await res.json();

  if (data.nome) {
    document.getElementById('logout-button').style.display = 'inline-block';

    const perfilButton = document.querySelector('.menu-button');
    if (perfilButton) {
      showContent('perfil', perfilButton);
    }
  }
});

document.getElementById('logout-button')?.addEventListener('click', () => {
  fetch('/api/auth/logout', {
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


