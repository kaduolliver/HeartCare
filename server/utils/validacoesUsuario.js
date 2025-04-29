function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarCPF(cpf) {
    return /^\d{11}$/.test(cpf);
}

function validarTelefone(telefone) {
    return /^\d{10,11}$/.test(telefone);
}

//remover espaços extras
function normalizarTexto(texto) {
    return texto.trim();
}

module.exports = {
    validarEmail,
    validarCPF,
    validarTelefone,
    normalizarTexto
};
