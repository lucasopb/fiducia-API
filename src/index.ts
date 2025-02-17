import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import chuchRoutes from './routes/churchRoutes';
import { pool } from './database/database';
import { errorHandler } from "./middlewares/errorHandlerMiddleware";


dotenv.config();

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/churches', chuchRoutes)

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.use(errorHandler)

// Testar a conexão antes de iniciar o servidor
pool
  .connect()
  .then(() => {
    console.log('✅ Conexão com o banco estabelecida com sucesso!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
    process.exit(1); // Encerra o processo em caso de erro
});