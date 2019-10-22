module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "database_dev",
    host    : "localhost",
    port    : 32768,
    dialect : "postgres"
  },
  test       : {
    username: "postgres",
    password: "postgres",
    database: "database_test",
    host    : "localhost",
    port    : 32768,
    dialect : "postgres"
  },
  production : {
    username: "postgres",
    password: "postgres",
    database: "database_prod",
    host    : "localhost",
    port    : 32768,
    dialect : "postgres"
  }
};
