### Cria uma migration para mapear o modelo de dados para o esquema do banco
npx prisma migrate dev --name init

### Aplica as migrations pendentes ao banco de dados (útil para quem clonar a aplicação e startar o projeto)
npx prisma migrate dev

### Gera o cliente Prisma que é usado no código da aplicação para consultar e modificar dados no banco de dados.
npx prisma generate