const { Client } = require('pg');

const createDatabaseConnection = () => {
  const client = new Client({
    user: "admin",
    host: "localhost",
    database: "postgres",
    password: "adminpg",
    port: 5433,
  });

  return client;
};

module.exports = {
  createDatabaseConnection,
};
