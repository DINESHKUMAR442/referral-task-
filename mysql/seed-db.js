import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  const dotEnvPath = path.join(__dirname, '..', 'backend', '.env');
  const sqlPath = path.join(__dirname, 'seed.sql');

  console.log(`\x1b[36mLoading environment from ${dotEnvPath}\x1b[0m`);

  if (!fs.existsSync(dotEnvPath)) {
    console.error(`\x1b[31mError: Backend .env file not found at ${dotEnvPath}\x1b[0m`);
    process.exit(1);
  }

  const envContent = fs.readFileSync(dotEnvPath, 'utf8');
  const env = {};
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#].*?)=(.*)$/);
    if (match) {
      env[match[1].trim()] = match[2].trim();
    }
  });

  const config = {
    host: env.DB_HOST || 'localhost',
    port: parseInt(env.DB_PORT || '3306'),
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'referral_db',
    multipleStatements: true
  };

  console.log(`\x1b[33mSeeding database '${config.database}' on ${config.host}:${config.port} as ${config.user}...\x1b[0m`);

  try {
    const connection = await mysql.createConnection(config);
    console.log('\x1b[32mConnected to MySQL successfully.\x1b[0m');

    const sql = fs.readFileSync(sqlPath, 'utf8');
    console.log('\x1b[30mExecuting seed.sql...\x1b[0m');

    await connection.query(sql);
    console.log('\x1b[32mDatabase seeded successfully.\x1b[0m');

    await connection.end();
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.error('\x1b[31mError: mysql2 package not found.\x1b[0m');
      console.log('\x1b[33mPlease run: npm install mysql2\x1b[0m');
    } else {
      console.error('\x1b[31mError seeding database:\x1b[0m', err.message);
    }
    process.exit(1);
  }
}

seed();
