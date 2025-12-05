import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: "postgres://postgres:admin@localhost:5432/pern_ecommerce"
});

export default pool;
