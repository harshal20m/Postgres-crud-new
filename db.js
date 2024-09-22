const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	password: "harshal",
	host: "localhost",
	port: 5432,
	database: "pern_db",
});

module.exports = pool;
