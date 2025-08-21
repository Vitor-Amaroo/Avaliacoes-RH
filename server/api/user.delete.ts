// server/api/users.delete.ts
import db from './db';

// Define o manipulador de evento para a rota de API que deleta um usuário
export default defineEventHandler(async (event) => {
  try {
    // Obtém o ID do usuário a partir dos parâmetros da URL
    const userId = getRouterParam(event, 'id');

    if (!userId) {
      return {
        success: false,
        message: 'ID do usuário não fornecido.',
      };
    }

    // Prepara e executa a instrução SQL para deletar o usuário
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const info = stmt.run(userId);

    // Verifica se o usuário foi deletado com sucesso
    if (info.changes > 0) {
      return {
        success: true,
        message: `Usuário com ID ${userId} deletado com sucesso.`,
      };
    } else {
      return {
        success: false,
        message: 'Usuário não encontrado.',
      };
    }
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return {
      success: false,
      message: 'Erro ao deletar usuário.',
    };
  }
});
