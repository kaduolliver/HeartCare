# SOFTWARE TESTING PROJECT

Projeto feito pelo grupo 7 para o trabalho AT2 de Teste de Software, professor Jefferson Salomão Rodrigues.

### **HeartCare** – Sistema de Gestão de Consultas Médicas Cardiológicas

**HeartCare** é um sistema web focado no agendamento, gerenciamento e visualização de consultas médicas, voltado para uma clínica especializada em cardiologia. O projeto simula um ambiente real de atendimento médico, onde pacientes podem se registrar, fazer login e marcar consultas com médicos de diversas especialidades da cardiologia.

Desenvolvedores do projeto:

<pre>- Amanda Mendes Reis de Araújo
- Camila Graner Antunes de Oliveira
- Carlos Eduardo Lima de Oliveira
- Cauã Aguiar Ferreira Gomes
- Kalleby Rodrigues Frutuoso</pre>

## ESTRUTURA DO PROJETO

- Separação em front-end e back-end
- Organização em:
    - `controllers/`: lógica dos endpoints 
    - `routes/`: definição das rotas da API
    - `database/`: conexão com banco
    - `client/`: arquivos HTML, CSS e JS

- Uso do **Express** como framework de servidor

---

## BANCO DE DADOS (PostgreSQL)

- Estrutura de tabelas (`usuarios`, `consultas`, `medicos`)

- **Chave primária e estrangeira**

- Tipos de dados (`VARCHAR`, `DATE`, `TIMESTAMP`)

- Consultas básicas:
    - `INSERT`, `SELECT`, `UPDATE`, `DELETE`
- Conexão com Node usando `pg` e `Pool`

- Uso de `.env` com variáveis de conexão

---


## AUTENTICAÇÃO E SESSÃO

- Registro com senha criptografada `bcrypt`

- Login com validação e uso de `express-session`

- Armazenar dados do usuário na sessão: `req.session.usuario`

- Logout (destruir sessão)

---


## JAVASCRIPT NO FRONT-END

- Manipulação do DOM como `document.getElementById` e `innerHTML`

- Escutar eventos `addEventListener`

- Formatação de campos como **Telefone e CPF**

- `fetch()` para consumir a API (GET, POST, PUT, DELETE)

- Manipulação de JSON e tratamento de erros com `try/catch`

---


## API REST

- Verbos HTTP: `GET`, `POST`, `PUT`, `DELETE`

- Estrutura de rotas RESTful como `/api/usuario`, `/api/auth/login`

- Corpo da requisição: `application/json` vs `x-www-form-urlencoded`

- `res.status()`, `res.send`, `res.json`

---


## HTML, CSS com Bootstrap

- Uso do **Bootstrap 5.3** para responsividade e design moderno

- Classes utilitarias como `container`, `row`, `btn`, `form-control`

- Estrutura de tabelas para exibir dados `<table>`

- Organização em páginas como `register.html`, `login.html`, `user.html`

---


## Boas práticas com Node.js

- Modularização do código `require`, `module.exports`

- Middleware com `body-parser`, `express-session`

- Servir arquivos estáticos com `express.static()`

- Uso de variáveis de ambiente com `dotenv`

---


## Lógica de Funcionalidades

- Cadastro com validação

- Login e redirecionamento

- Edição de dados do perfil

- Agendamento de consulta

- Cancelamento de consulta

- Exibição de dados com base no usuário logado

---


## TUTORIAL DE INSTALAÇÃO DO PROJETO

### Pré-requisitos

É necessário ter os seguintes programas instalados:

- Node.js (versão 16+)

- PostgreSQL

- Git (para clonar o repositório) **OBS:** caso queira fazer manualmente, pule o passo 1.

### 1. Clonar o repositório

<pre>git clone https://github.com/kaduolliver/heartcare.git

cd heartcare

code .
</pre>

### 2. Criar o arquivo `.env` na raiz do projeto

Crie um arquivo chamado `.env` na raiz com os seguintes dados (ajuste conforme o seu banco de dados local)

<pre>.env<pre>DB_USER=postgres
DB_HOST=localhost
DB_NAME=heartcare
DB_PASSWORD=12345678
DB_PORT=5432
</pre></pre>

**OBS:**

- **DB_USER** -> é o usuario do PostgreSQL, vem padrão como `postgres`, mas se foi alterado na instalação, será necessário ajustar de acordo;

- **DB_HOST** -> padrão (localhost);

- **DB_NAME** -> é necessário que seja `heartcare` (nome do banco de dados do programa);

- **DB_PASSWORD** -> vai depender de qual senha você colocou ao instalar o PostgreSQL;

- **DB_PORT** -> padrão (5432).

### 3. Criar o banco de Dados no PostgreSQL

Entre no pgAdmin 4 e crie uma nova Database com o nome "heartcare", selecione a database criada e aperte em Query Tool (Alt+Shift+Q), copie os comandos e execute (F5):

<pre>
-- Tabela de usuários
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  nascimento DATE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  telefone VARCHAR(15) UNIQUE NOT NULL,
  senha VARCHAR(200) NOT NULL,
  sexo VARCHAR(10),
  tipo_sanguineo VARCHAR(5),
  endereco TEXT
);

-- Tabela de médicos
CREATE TABLE medicos (
  crm VARCHAR(20) PRIMARY KEY,
  nome VARCHAR(100),
  especialidade VARCHAR(100)
);

-- Tabela de consultas
CREATE TABLE consultas (
  id SERIAL PRIMARY KEY,
  cpf_usuario VARCHAR(11) REFERENCES usuarios(cpf) ON DELETE CASCADE,
  crm_medico VARCHAR(20) REFERENCES medicos(crm),
  especialidade VARCHAR(100),
  medico VARCHAR(100),
  data_agendamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_consulta TIMESTAMP
);
</pre>

### 3.1 Adicione os médicos a tabela `medicos`

<pre>INSERT INTO medicos (crm, nome, especialidade) VALUES
('BA-789.123', 'Dr. Marcelo Henrique Barbosa', 'Cardiologia Geriátrica'),
('CE-567.890', 'Dr. Diego Nascimento Silva', 'Cardiologia de Emergência'),
('DF-345.678', 'Dra. Camila Ribeiro Dias', 'Cardiologia Preventiva'),
('MG-456.789', 'Dra. Fernanda Oliveira Almeida', 'Arritmologia e Eletrofisiologia'),
('PE-876-543', 'Dr. Lucas Pereira Gomes', 'Imagenologia Cardiovascular'),
('PR-654.321', 'Dra. Juliana Costa Lima', 'Cardiologia do Esporte'),
('RJ-987.654', 'Dr. Carlos Eduardo Rocha', 'Cardiologia Intervencionista'),
('RS-321.987', 'Dr. Rafael Torres Almeida', 'Cardiologia Pediátrica'),
('SC-234.567', 'Dra. Patricia Souza Martins', 'Insuficiência Cardíaca e Transplante'),
('SP-123.456', 'Dra. Ana Lucia Mendes', 'Cardiologia Clínica');
</pre>

### 4. Instalar dependências

Dentro da raiz do projeto, rode:

<pre>npm install
</pre>

**Lembrando:** a raiz do projeto é `/heartcare>`

### 5. Rodar o servidor

<pre>node server/server.js

ou

nodemon server/server.js</pre>

O servidor estará disponível em:

`http://localhost:3000`

### 6. Acessar a aplicação

Abra seu navegador e acesse:

<pre>http://localhost:3000
</pre>

### 7. Teste as funcionalidades

- Cadastro: `/pages/register.html`

- Login: `/pages/login.html`

- Área do usuário: `/pages/user.html`

- Agendar Consulta: pela aba "Marcar Consulta"

- Ver Consultas: "Consultas Agendadas"

- Conferir os dados sendo cadastrados dentro do **Banco de Dados**

### 8. Parar o servidor

Pressione `Ctrl + C` no terminal.

## PARA RODAR OS TESTES ##

Agora que todas as depend�ncias est�o instaladas e o ambiente est� configurado, pode rodar os testes.

Execute no terminal:
<pre>npm run test</pre>

