document.addEventListener('DOMContentLoaded', async () => {
  const agendarConsultaBtn = document.querySelector('.nav-item-log a');
  const perfilContainer = document.getElementById('perfil-btn-container');

  const exameBtn = document.getElementById('btn-exame');
  const exameBtn2 = document.getElementById('btn-consultar-exame-2');
  const agendamentoBtn = document.getElementById('btn-agendamento-online');

  try {
    const res = await fetch('/api/usuario');
    const data = await res.json();

    const userPage = '/pages/user.html';
    const loginPage = '/pages/login.html';

    const isLoggedIn = !!data.nome;

    /* ******Rediresionamentos****** */
    if (agendarConsultaBtn) agendarConsultaBtn.href = isLoggedIn ? userPage : loginPage;
    if (exameBtn) exameBtn.href = isLoggedIn ? userPage : loginPage;
    if (exameBtn2) exameBtn2.href = isLoggedIn ? userPage : loginPage;
    if (agendamentoBtn) agendamentoBtn.href = isLoggedIn ? userPage : loginPage;

    /* ******Botão "Perfil"****** */
    if (isLoggedIn && perfilContainer && !document.getElementById('perfil-btn')) {
      const perfilBtn = document.createElement('a');
      perfilBtn.id = 'perfil-btn';
      perfilBtn.className = 'button-card btn ms-2';
      perfilBtn.href = userPage;
      perfilBtn.textContent = 'Perfil';
      perfilContainer.appendChild(perfilBtn);
    }

  } catch (err) {
    console.error('Erro ao verificar login:', err);
    if (agendarConsultaBtn) agendarConsultaBtn.href = '/pages/login.html';
  }
});
