import database from "/infra/database.js";

console.log("POSTGRES_HOST:", process.env.POSTGRES_HOST);
console.log("POSTGRES_USER:", process.env.POSTGRES_USER);
console.log("POSTGRES_PASSWORD:", process.env.POSTGRES_PASSWORD);
console.log("POSTGRES_DB:", process.env.POSTGRES_DB);

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const databaseVersion = await database.query("SHOW server_version");
  const databaseVersionResult = databaseVersion.rows[0].server_version;

  const databaseMaxConnections = await database.query("SHOW max_connections");
  const databaseMaxConnectionsResult =
    databaseMaxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseUsedConnections = await database.query({
    text: "SELECT count(*)::int from pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseUsedConnectionsResult = databaseUsedConnections.rows[0].count;

  console.log(`Database version: ${databaseVersionResult}`);
  console.log(`Database max connections: ${databaseMaxConnectionsResult}`);
  console.log(`Database used connections: ${databaseUsedConnectionsResult}`);

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionResult,
        max_connections: parseInt(databaseMaxConnectionsResult),
        opened_connections: parseInt(databaseUsedConnectionsResult),
      },
    },
  });
}

export default status;
