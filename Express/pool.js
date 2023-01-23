import pg from "pg";
function connectDatabase() {
  const pool = new pg.Pool({
    user: "postgres",
    password: "admin123",
    database: "ishowmo",
    host: "localhost",
    port: 5432,
  });
  return pool;
}
export { connectDatabase };
