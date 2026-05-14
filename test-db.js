const { Client } = require("pg");

const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  user: "local_user",
  database: "local_db",
  password: "senha123",
  ssl: false,
});

client
  .connect()
  .then(() => {
    console.log("Conectou com sucesso!");
    return client.end();
  })
  .catch((err) => {
    console.error("Erro:", err.message);
    console.error("Code:", err.code);
  });
