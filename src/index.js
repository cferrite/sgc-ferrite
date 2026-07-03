import { pool } from "./db/pool.js";

async function testarConexao() {
  try {
    const resultado = await pool.query("SELECT NOW()");
    console.log("Conectado! Hora do servidor:", resultado.rows[0].now);
  } catch (erro) {
    console.error("Falha na conexão:", erro.message);
  }
  process.exit();
}

testarConexao();
