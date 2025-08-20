// server/api/register.post.ts

// Importa a instância do banco de dados SQLite
import db from './db';

// Define o manipulador de evento que será executado quando a rota for acessada com o método POST
export default defineEventHandler(async (event) => {
  try {
    // Lê o corpo da requisição para extrair os dados do formulário de cadastro
    const body = await readBody(event);
    const { name, email, cpf, password, sector, manager, birthdate } = body;

    // Prepara a instrução SQL para inserir um novo usuário na tabela 'users'
    // Os '?' são placeholders que evitam ataques de injeção de SQL
    const stmt = db.prepare('INSERT INTO users (name, email, cpf, password, sector, manager, birthdate) VALUES (?, ?, ?, ?, ?, ?, ?)');
    
    // Executa a instrução, passando os valores recebidos do formulário
    const info = stmt.run(name, email, cpf, password, sector, manager, birthdate);

    // Retorna uma resposta de sucesso com uma mensagem e o ID do novo usuário
    return {
      success: true,
      message: 'Usuário cadastrado com sucesso!',
      id: info.lastInsertRowid,
    };
  } catch (error) {
    // Em caso de erro, exibe a mensagem de erro no console do servidor
    console.error('Erro ao cadastrar usuário:', error);
    
    // Retorna uma resposta de falha com uma mensagem de erro
    return {
      success: false,
      message: 'Erro ao cadastrar usuário. Tente novamente.',
    };
  }
});
