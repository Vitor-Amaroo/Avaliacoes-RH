// server/api/login.post.ts

// Importa a instância do banco de dados SQLite
// O caminho foi corrigido para buscar o arquivo na mesma pasta
import db from './db';

// Importa a função para hash de senhas, se for necessário.
// Por enquanto, usaremos a senha em texto puro para simplificar.

// Define o manipulador de evento que será executado quando a rota for acessada com o método POST
export default defineEventHandler(async (event) => {
  try {
    // Lê o corpo da requisição para extrair os dados do formulário de login
    const body = await readBody(event);
    const { email, password } = body;

    // Lógica para permitir o login do administrador sem validação do banco de dados
    if (email === 'admin@gmail.com' && password === '123') {
      return {
        success: true,
        message: 'Login de administrador bem-sucedido!',
        role: 'admin',
      };
    }

    // Busca o usuário no banco de dados pelo e-mail
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(email);

    // Se o usuário não for encontrado
    if (!user) {
      return {
        success: false,
        message: 'E-mail ou senha incorretos.',
      };
    }
    
    // Verifica se a senha fornecida corresponde à senha do usuário
    if (user.password !== password) {
       return {
        success: false,
        message: 'E-mail ou senha incorretos.',
      };
    }
    
    // Retorna uma resposta de sucesso com o papel do usuário
    return {
      success: true,
      message: 'Login bem-sucedido!',
      role: user.role,
    };
  } catch (error) {
    // Em caso de erro, exibe a mensagem de erro no console do servidor
    console.error('Erro no login:', error);
    
    // Retorna uma resposta de falha com uma mensagem de erro
    return {
      success: false,
      message: 'Erro no login. Tente novamente.',
    };
  }
});
