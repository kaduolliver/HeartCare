// Carrega vari�veis de ambiente do arquivo .env
require('dotenv').config();

// Importa os m�dulos necess�rios
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// Inicializa o aplicativo Express
const app = express();
const PORT = 3000; 

// ===== Middlewares =====

// Middleware para interpretar dados enviados via formul�rios (x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para interpretar dados enviados em JSON
app.use(bodyParser.json());

// Middleware para gerenciar sess�es de usu�rio
app.use(session({
    secret: 'heartcare_secret', 
    resave: false,              
    saveUninitialized: false   
}));

// Middleware para servir arquivos est�ticos (HTML, CSS, JS, imagens) da pasta 'client'
app.use(express.static(path.join(__dirname, '../client')));

// ===== Rotas =====

// Importa as rotas de autentica��o (registro, login, logout)
const authRoutes = require('./routes/auth');

// Importa as rotas relacionadas ao usu�rio (dados pessoais, etc)
const usuarioRoutes = require('./routes/usuario');

// Importa as rotas relacionadas a consultas m�dicas
const consultasRoutes = require('./routes/consultas');

// Importa as rotas de p�ginas (index, about, contact, etc.)
const pageRoutes = require('./routes/pages');

<<<<<<< HEAD
// Usa as rotas importadas, prefixando seus caminhos
app.use('/api/auth', authRoutes);        // Ex: POST /api/auth/login
app.use('/api/usuario', usuarioRoutes);  // Ex: GET /api/usuario
app.use('/api/consultas', consultasRoutes); // Ex: GET /api/consultas
app.use('/', pageRoutes);                // Ex: GET / (index.html), /about.html, etc.
=======
// API de autenticação
app.use('/api/auth', authRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/consultas', consultasRoutes);
app.use('/', pageRoutes);
>>>>>>> 6d1df4c62985457c45fd0a70b98f6b40aa313553

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
