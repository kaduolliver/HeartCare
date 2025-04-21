require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'heartcare_secret',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, '../client')));

// Rotas
const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuario');
const consultasRoutes = require('./routes/consultas');
const pageRoutes = require('./routes/pages');

app.use('/api/auth', authRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/consultas', consultasRoutes);
app.use('/', pageRoutes);

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
