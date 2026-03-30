const { Router } = require("express");

module.exports = (connection) => {
  const router = Router();

  // GET — listar todos
  router.get("/", (req, res) => {
    const sql = "SELECT * FROM usuario";

    connection.query(sql, (erro, resultados) => {
      if (erro) {
        return res.status(500).json({ erro: "Erro ao buscar usuários" });
      }
      res.json(resultados);
    });
  });

  // POST — cadastrar
  router.post("/", (req, res) => {
    const { Nome, email, age } = req.body;

    if (!Nome || !email || age === undefined || age === null) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    const idadeNumero = Number(age);

    if (Number.isNaN(idadeNumero)) {
      return res.status(400).json({ erro: "O campo age deve ser um número" });
    }

    const sql = "INSERT INTO usuario (Nome, email, age) VALUES (?, ?, ?)";
    const valores = [Nome, email, idadeNumero];

    console.log("BODY:", req.body);
    console.log("VALORES:", valores);

    connection.query(sql, valores, (erro, resultado) => {
      if (erro) {
        console.log("ERRO MYSQL:", erro);
        return res.status(500).json({
          erro: "Erro ao cadastrar usuário",
          detalhe: erro.message,
          code: erro.code,
        });
      }

      res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso",
        id: resultado.insertId,
      });
    });
  });
  // DELETE — remover
  router.delete("/:id", (req, res) => {
    const { id } = req.params;

    connection.query("DELETE FROM usuario WHERE id = ?", [id], (erro) => {
      if (erro) return res.status(500).json({ erro: "Erro ao deletar" });
      res.status(204).send();
    });
  });

  return router;
};
