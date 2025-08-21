// server/api/users.get.ts
import db from './db';

// Define o manipulador de evento para a rota de API que lista todos os usuários
export default defineEventHandler(() => {
  try {
    // Prepara e executa a instrução SQL para buscar todos os usuários da tabela 'users'
    // As colunas 'sector' e 'manager' foram adicionadas
    const stmt = db.prepare('SELECT id, name, email, sector, manager FROM users');
    const users = stmt.all();

    // Retorna uma resposta de sucesso com a lista de usuários
    return {
      success: true,
      data: users,
    };
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);

    // Retorna uma resposta de falha em caso de erro
    return {
      success: false,
      message: 'Erro ao buscar usuários.',
    };
  }
});
