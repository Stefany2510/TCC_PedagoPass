import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Carregar .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('DATABASE_URL não encontrada em .env');
    process.exit(1);
  }

  // Parse DATABASE_URL simples (mysql://user:pass@host:port/dbname)
  const match = databaseUrl.match(/^mysql:\/\/(.*?):(.*?)@(.*?):(\d+)\/(.*?)$/);
  if (!match) {
    console.error('DATABASE_URL com formato inesperado:', databaseUrl);
    process.exit(1);
  }

  const [, user, password, host, port, database] = match;

  console.log(`Conectando em ${host}:${port} database ${database} como ${user}`);

  const conn = await mysql.createConnection({
    host,
    port: Number(port),
    user,
    password,
    database,
  });

  try {
    // Verificar se a coluna já existe
    const [rows] = await conn.query<mysql.RowDataPacket[]>(
      `SHOW COLUMNS FROM \`${database}\`.\`users\` LIKE 'password'`
    );

    if (rows.length > 0) {
      console.log('Coluna `password` já existe. Nenhuma ação necessária.');
      return;
    }

    // Executar ALTER TABLE para adicionar a coluna
    console.log('Adicionando coluna `password` na tabela users...');
    await conn.execute(
      `ALTER TABLE \`${database}\`.\`users\` ADD COLUMN \`password\` VARCHAR(255) NOT NULL DEFAULT '' AFTER \`email\``
    );

    console.log('Coluna `password` adicionada com sucesso.');
  } catch (err: any) {
    console.error('Erro ao executar o script:', err.message || err);
    process.exit(1);
  } finally {
    await conn.end();
  }
}

run();
