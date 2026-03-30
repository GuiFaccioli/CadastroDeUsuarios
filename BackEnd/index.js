const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); // ← ESSENCIAL para o frontend acessar!

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // permite requisições do frontend
app.use(express.json()); // lê o body em JSON

// Conexão com o banco
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "X1x2x3x4-",
  database: "estudo",
});

connection.connect((erro) => {
  if (erro) {
    console.log("Erro ao conectar:", erro);
    return;
  }
  console.log("Conectado ao MySQL!");
});

// Rotas
const usuarioRouter = require("./routers/usuarioRoute")(connection);
app.use("/usuarios", usuarioRouter);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
