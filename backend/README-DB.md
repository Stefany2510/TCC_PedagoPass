# Banco de Dados - Operações úteis

## Adicionar coluna `password` na tabela `users`

O repositório inclui um script Node que adiciona a coluna `password` na tabela `users` caso ela ainda não exista.

Pré-requisitos
- Ter `node` e `npm` instalados
- Variáveis de ambiente configuradas em `backend/.env` contendo `DATABASE_URL` (formato mysql://user:pass@host:port/dbname)

Como executar (no Windows CMD):

```cmd
cd c:\Users\Pass\Desktop\PedagoPass\backend
npm install
node scripts/addPasswordColumn.ts
```

O script usa `mysql2/promise` para conectar ao banco e executa:

```sql
ALTER TABLE `your_db`.`users` ADD COLUMN `password` VARCHAR(255) NOT NULL DEFAULT '' AFTER `email`;
```

Ele primeiro verifica se a coluna já existe usando `SHOW COLUMNS ... LIKE 'password'` para evitar duplicação.

Se preferir, execute manualmente no MySQL:

```sql
ALTER TABLE `facerec_pedagopass`.`users` ADD COLUMN `password` VARCHAR(255) NOT NULL DEFAULT '' AFTER `email`;
```
