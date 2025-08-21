// server/api/opinions/[mood].get.ts
import db from './../db';

// Define o manipulador de evento para a rota de API que busca os detalhes de um humor
export default defineEventHandler(async (event) => {
  try {
    // Obtém o parâmetro 'mood' da URL
    const mood = getRouterParam(event, 'mood');

    if (!mood) {
      return {
        success: false,
        message: 'Humor não fornecido.',
      };
    }

    // Consulta SQL para buscar todos os feedbacks com o humor especificado
    // A consulta foi modificada para incluir o nome do usuário da tabela 'users'
    const stmt = db.prepare(`
      SELECT 
        feedbacks.id, 
        feedbacks.comment, 
        users.name as userName, 
        feedbacks.created_at
      FROM 
        feedbacks
      JOIN 
        users ON feedbacks.user_id = users.id
      WHERE 
        feedbacks.mood = ?
    `);
    
    const details = stmt.all(mood);

    // Retorna os detalhes dos feedbacks
    return {
      success: true,
      data: details,
    };
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error);
    return {
      success: false,
      message: 'Erro ao buscar detalhes.',
    };
  }
});
