// Configuração do Firebase (mantenha suas credenciais)
const firebaseConfig = {
  apiKey: "AIzaSyClTmZ5aIE16Xp2L7CE3tN5igyG0GDwj60",
  authDomain: "cadastrousuario-95afb.firebaseapp.com",
  projectId: "cadastrousuario-95afb",
  storageBucket: "cadastrousuario-95afb.firebasestorage.app",
  messagingSenderId: "753005641462",
  appId: "1:753005641462:web:6289f0a8312e7e71ba76d7",
  measurementId: "G-90JYEGTHLS"
};

// Inicialização do Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); // Adicione isso para autenticação
const db = firebase.firestore(app);

// Listener do Formulário (com validação de senha)
document.getElementById('cadastroUsuario').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Obter valores
  const nome = document.getElementById('NomeCompleto').value.trim();
  const cpf = document.getElementById('CPF').value.replace(/\D/g, ''); // Remove não-números
  const dataNascimento = document.getElementById('DataNascimento').value;
  const email = document.getElementById('Email').value.trim();
  const senha = document.getElementById('Senha').value;
  const confirmarSenha = document.getElementById('ConfirmarSenha').value;
  const telefone = document.getElementById('Telefone').value.replace(/\D/g, '');

  // Validações
  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  if (!validarCPF(cpf)) {
    alert('CPF inválido!');
    return;
  }

  try {
    // Cria usuário no Authentication
    const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
    
    // Salva dados adicionais no Firestore
    await db.collection('usuarios').doc(userCredential.user.uid).set({
      nome,
      cpf,
      dataNascimento,
      telefone,
      dataCadastro: new Date()
    });

    alert('Cadastro realizado com sucesso!');
    document.getElementById('cadastroUsuario').reset();
    
  } catch (error) {
    console.error('Erro no cadastro:', error);
    alert(`Erro: ${error.message}`);
  }
});

// Função para Validar CPF (adicione no código)
function validarCPF(cpf) {
  // Implemente sua lógica de validação de CPF aqui
  return cpf.length === 11; // Exemplo simplificado
}