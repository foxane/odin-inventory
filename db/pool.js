import pg from 'pg';

const { Pool } = pg; // Importing commonjs module
export default new Pool({
  connectionString: process.env.DATABASE_URL,
});
