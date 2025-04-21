# SOFTWARE TESTING PROJECT

Projeto feito pelo grupo 7 para o trabalho AT2 de Teste de Software, professor Jefferson Salom�o Rodrigues.

Desenvolvedores do projeto:

<pre>- Amanda Mendes Reis de Ara�jo
- Camila Graner Antunes de Oliveira
- Carlos Eduardo Lima de Oliveira
- Cau� Aguiar Ferreira Gomes
- Kalleby Rodrigues Frutuoso</pre>

## ESTRUTURA DO PROJETO

- Separa��o em front-end e back-end
- Organiza��o em:
    - `controllers/`: l�gica dos endpoints 
    - `routes/`: defini��o das rotas da API
    - `database/`: conex�o com banco
    - `client/`: arquivos HTML, CSS e JS

- Uso do **Express** como framework de servidor

---

## BANCO DE DADOS (PostgreSQL)

- Estrutura de tabelas (`usuarios`, `consultas`, `medicos`)

- **Chave prim�ria e estrangeira**

- Tipos de dados (`VARCHAR`, `DATE`, `TIMESTAMP`)

- Consultas b�sicas:
    - `INSERT`, `SELECT`, `UPDATE`, `DELETE`
- Conex�o com Node usando `pg` e `Pool`

- Uso de `.env` com vari�veis de conex�o

---


## AUTENTICA��O E SESS�O

- Registro com senha criptografada `bcrypt`

- Login com valida��o e uso de `express-session`

- Armazenar dados do usu�rio na sess�o: `req.session.usuario`

- Logout (destruir sess�o)

---


## JAVASCRIPT NO FRONT-END

- Manipula��o do DOM como `document.getElementById` e `innerHTML`

- Escutar eventos `addEventListener`

- Formata��o de campos como **Telefone e CPF**

- `fetch()` para consumir a API (GET, POST, PUT, DELETE)

- Manipula��o de JSON e tratamento de erros com `try/catch`

---


## API REST

- Verbos HTTP: `GET`, `POST`, `PUT`, `DELETE`

- Estrutura de rotas RESTful como `/api/usuario`, `/api/auth/login`

- Corpo da requisi��o: `application/json` vs `x-www-form-urlencoded`

- `res.status()`, `res.send`, `res.json`

---


## HTML, CSS com Bootstrap

- Uso do **Bootstrap 5.3** para responsividade e design moderno

- Classes utilitarias como `container`, `row`, `btn`, `form-control`

- Estrutura de tabelas para exibir dados `<table>`

- Organiza��o em p�ginas como `register.html`, `login.html`, `user.html`

---


## Boas pr�ticas com Node.js

- Modulariza��o do c�digo `require`, `module.exports`

- Middleware com `body-parser`, `express-session`

- Servir arquivos est�ticos com `express.static()`

- Uso de vari�veis de ambiente com `dotenv`

---


## L�gica de Funcionalidades

- Cadastro com valida��o

- Login e redirecionamento

- Edi��o de dados do perfil

- Agendamento de consulta

- Cancelamento de consulta

- Exibi��o de dados com base no usu�rio logado

---


## TUTORIAL DE INSTALA��O DO PROJETO

### Pr�-requisitos

� necess�rio ter os seguintes programas instalados:

- Node.js (vers�o 16+)

- PostgreSQL

- Git (para clonar o reposit�rio) **OBS:** caso queira fazer manualmente, pule o passo 1.

### 1. Clonar o reposit�rio

<pre>git clone https://github.com/usuario/heartcare.git

cd heartcare
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

- **DB_USER** -> � o usuario do PostgreSQL, vem padr�o como `postgres`, mas se foi alterado na instala��o, ser� necess�rio ajustar de acordo;

- **DB_HOST** -> padr�o (localhost);

- **DB_NAME** -> � necess�rio que seja `heartcare` (nome do banco de dados do programa);

- **DB_PASSWORD** -> vai depender de qual senha voc� colocou ao instalar o PostgreSQL;

- **DB_PORT** -> padr�o (5432).

### 3. Criar o banco de Dados no PostgreSQL

Abra o terminal do PostgreSQL (ou use uma GUI como DBeaver ou pgAdmin) e execute os comandos abaixo:

<pre>CREATE DATABASE heartcare;

\c heartcare;

-- Tabela de usu�rios
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

-- Tabela de m�dicos
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
  data_agendamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_consulta TIMESTAMP
);
</pre>

### 3.1 Adicione os m�dicos a tabela `medicos`

<pre>INSERT INTO medicos (crm, nome, especialidade) VALUES
('BA-789.123', 'Dr. Marcelo Henrique Barbosa', 'Cardiologia Geri�trica'),
('CE-567.890', 'Dr. Diego Nascimento Silva', 'Cardiologia de Emerg�ncia'),
('DF-345.678', 'Dra. Camila Ribeiro Dias', 'Cardiologia Preventiva'),
('MG-456.789', 'Dra. Fernanda Oliveira Almeida', 'Arritmologia e Eletrofisiologia'),
('PE-876-543', 'Dr. Lucas Pereira Gomes', 'Imagenologia Cardiovascular'),
('PR-654.321', 'Dra. Juliana Costa Lima', 'Cardiologia do Esporte'),
('RJ-987.654', 'Dr. Carlos Eduardo Rocha', 'Cardiologia Intervencionista'),
('RS-321.987', 'Dr. Rafael Torres Almeida', 'Cardiologia Pedi�trica'),
('SC-234.567', 'Dra. Patricia Souza Martins', 'Insufici�ncia Card�aca e Transplante'),
('SP-123.456', 'Dra. Ana Lucia Mendes', 'Cardiologia Cl�nica');
</pre>

### 4. Instalar depend�ncias

Dentro da raiz do projeto, rode:

<pre>npm install
</pre>

**Lembrando:** a raiz do projeto � `/heartcare>`

### 5. Rodar o servidor

<pre>node server/server.js

ou

nodemon server/server.js</pre>

O servidor estar� dispon�vel em:

`http://localhost:3000`

### 6. Acessar a aplica��o

Abra seu navegador e acesse:

<pre>http://localhost:3000
</pre>

### 7. Teste as funcionalidades

- Cadastro: `/pages/register.html`

- Login: `/pages/login.html`

- �rea do usu�rio: `/pages/user.html`

- Agendar Consulta: pela aba "Marcar Consulta"

- Ver Consultas: "Consultas Agendadas"

- Conferir os dados sendo cadastrados dentro do **Banco de Dados**

### 8. Parar o servidor

Pressione `Ctrl + C` no terminal.