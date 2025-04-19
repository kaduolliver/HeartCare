document.addEventListener('DOMContentLoaded', async () => {
    const perfilBtnContainer = document.getElementById('perfil-btn-container');
    const agendarBtn = document.getElementById('btn-agendar');
  
    try {
      const res = await fetch('/api/usuario');
      const data = await res.json();
  
      if (data.nome) {
        // Bot�o de perfil ao lado do "Agendar Consulta"
        const perfilBtn = document.createElement('a');
        perfilBtn.className = 'button-card btn ms-2'; // "ms-2" do Bootstrap = margin-start 0.5rem
        perfilBtn.href = '/pages/user.html';
        perfilBtn.textContent = 'Perfil';
        perfilBtnContainer.appendChild(perfilBtn);
  
        // Opcional: mudar o link do bot�o "Agendar Consulta" para uma �rea real se o usu�rio estiver logado
        // agendarBtn.href = './user.html#marcar';
      }
    } catch (err) {
      console.error('Erro ao verificar login:', err);
    }
  });
  