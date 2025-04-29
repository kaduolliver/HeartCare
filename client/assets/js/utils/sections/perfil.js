export function carregarPerfil(contentArea) {
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
}