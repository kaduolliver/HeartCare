// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyClTmZ5aIE16Xp2L7CE3tN5igyG0GDwj60",
  authDomain: "cadastrousuario-95afb.firebaseapp.com",
  projectId: "cadastrousuario-95afb",
  storageBucket: "cadastrousuario-95afb.firebasestorage.app",
  messagingSenderId: "753005641462",
  appId: "1:753005641462:web:6289f0a8312e7e71ba76d7",
  measurementId: "G-90JYEGTHLS"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
// Adiciona um listener para o formulário de cadastro
document.getElementById('cadastroUsuario').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtendo os valores do formulário
  const nome = document.getElementById('NomeCompleto').value;
  const cpf = document.getElementById('CPF').value;
  const dataNascimento = document.getElementById('DataNascimento').value;
  const email = document.getElementById('Email').value;
  const senha = document.getElementById('Senha').value;
  const telefone = document.getElementById('Telefone').value;

  console.log(nome, cpf, dataNascimento, email, senha, telefone);
  cadastrarUsuario(nome, cpf, dataNascimento, email, senha, telefone);
});

function cadastrarUsuario(nome, cpf, dataNascimento, email, senha, telefone) {
  // Função para cadastrar um usuário no Firestore
  db.collection('cadastro').add({
      NomeCompleto: nome,
      CPF: cpf,
      DataNascimento: dataNascimento,
      Email: email,
      Senha: senha,
      Telefone: telefone
  })
  .then(() => {
      alert('Usuário cadastrado com sucesso!');
      document.getElementById('cadastroUsuario').reset(); // Limpa o formulário
      listarUsuarios(); // Atualiza a lista de usuários após o cadastro
  })
  .catch((error) => {
      console.error('Erro ao cadastrar usuário: ', error);
      alert('Erro ao cadastrar usuário. Tente novamente.');
  });
}

function listarUsuarios() {
  const listaUsuarios = document.getElementById('listaUsuarios');
  listaUsuarios.innerHTML = ''; // Limpa a lista antes de atualizar

  db.collection('cadastro').get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          const usuario = doc.data(); // Dados do documento
          const itemLista = document.createElement('li'); // Cria um item de lista
          itemLista.textContent = `Nome: ${usuario.NomeCompleto}, CPF: ${usuario.CPF}, E-mail: ${usuario.Email}, Telefone: ${usuario.Telefone}`;
          listaUsuarios.appendChild(itemLista); // Adiciona o item à lista
      });
  })
  .catch((error) => {
      console.error('Erro ao buscar usuários: ', error);
  });
}

// Carrega a lista de usuários ao carregar a página
window.onload = listarUsuarios;
