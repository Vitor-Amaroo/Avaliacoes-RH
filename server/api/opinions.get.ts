// server/api/opinions.get.ts
import db from './db';

// Define o manipulador de evento que busca os feedbacks do último mês
export default defineEventHandler(() => {
  try {
    // Calcula a data de 30 dias atrás
    const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();

    // Consulta SQL para contar os feedbacks por humor no último mês
    const stmt = db.prepare(`
      SELECT
        mood,
        COUNT(*) as count
      FROM
        feedbacks
      WHERE
        created_at >= ?
      GROUP BY
        mood
    `);
    
    const results = stmt.all(thirtyDaysAgo);

    // Retorna os resultados da contagem
    return {
      success: true,
      data: results,
    };
  } catch (error) {
    console.error('Erro ao buscar opiniões:', error);
    return {
      success: false,
      message: 'Erro ao buscar opiniões.',
    };
  }
});
