const bcrypt = require('bcrypt');

async function gerarHashSenha(senha) {
  return await bcrypt.hash(senha, 10);
}

module.exports = {
  gerarHashSenha
};
