const topBar = document.querySelector('.top-bar');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop < 100) {
        topBar.style.top = '0';
    } else {
        topBar.style.top = '-100px';
    }
});

document.getElementById('Telefone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); 
    let formattedValue = '';

    if (value.length > 0) {
        formattedValue = '(' + value.substring(0, 2);
    }
    if (value.length > 2) {
        formattedValue += ')' + value.substring(2, 7);
    }
    if (value.length > 6) {
        formattedValue += '-' + value.substring(7, 11);
    }

    e.target.value = formattedValue;
});

document.getElementById('CPF').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); 
    let formattedValue = '';

    if (value.length > 0) {
        formattedValue = value.substring(0, 3);
    }
    if (value.length > 3) {
        formattedValue += '.' + value.substring(3, 6);
    }
    if (value.length > 6) {
        formattedValue += '.' + value.substring(6, 9);
    }
    if (value.length > 9) {
        formattedValue += '-' + value.substring(9, 11);
    }

    e.target.value = formattedValue;
});

document.getElementById('showPasswordCheck').addEventListener('change', function () {
    const passwordInput = document.getElementById('Senha');
    const confirmPasswordInput = document.getElementById('ConfirmarSenha');
    passwordInput.type = this.checked ? 'text' : 'password';
    confirmPasswordInput.type = this.checked ? 'text' : 'password';
});


// ************************ CONEXÃO COM API ********************************** //

document.getElementById("cadastroUsuario").addEventListener("submit", async (e) => {
    e.preventDefault();

    const cpfLimpo = document.getElementById("CPF").value.replace(/\D/g, '');
    const telefoneLimpo = document.getElementById("Telefone").value.replace(/\D/g, '');

    const dados = {
        NomeCompleto: document.getElementById("NomeCompleto").value,
        CPF: cpfLimpo,
        DataNascimento: document.getElementById("DataNascimento").value,
        Email: document.getElementById("Email").value,
        Telefone: telefoneLimpo,
        Senha: document.getElementById("Senha").value,
        ConfirmarSenha: document.getElementById("ConfirmarSenha").value,
    };

    const response = await fetch("/registro", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(dados).toString(),
    });

        const text = await response.text();
        alert(text);
        window.location.href = "/pages/login.html";
});
