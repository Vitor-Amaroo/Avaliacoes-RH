<!-- Página de Login principal -->
<template>
  <!-- Container principal da tela de login -->
  <div class="login-container">
    <!-- Wrapper contendo o título e o formulário -->
    <div class="header-and-form-wrapper">
      <!-- Título de boas vindas -->
      <h1 class="bemvindo">Bem-vindo!</h1>
      <!-- Texto explicativo abaixo do título -->
      <p class="subtitle">Faça login para continuar.</p>
      <!-- Formulário principal de login -->
      <form @submit.prevent="handleLogin">
        <!-- Campo de usuário -->
        <input v-model="username" type="text" placeholder="Nome de usuário" required />
        <!-- Campo de senha -->
        <input v-model="password" type="password" placeholder="Senha" required />
        <!-- Links secundários (esqueci senha e cadastro) -->
        <div class="link-container">
          <!-- Link para recuperação de senha -->
          <p class="esquecisenha" @click="handlePasswordReset">Esqueci minha senha</p>
          <br>
          <!-- Link para cadastro -->
          <p class="senha" @click="navigateTo('/register')">Cadastrar</p>
          
        </div>
        <!-- Botão principal de envio -->
        <button type="submit">Entrar</button>
        
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { navigateTo } from '#app'; 

// Variáveis reativas para armazenar login e senha
const username = ref('');
const password = ref('');

// Função chamada ao submeter o formulário
const handleLogin = () => {
  // Caso seja o admin
  if (username.value === 'admin' && password.value === '123') {
    alert('Login de administrador bem-sucedido!');
    navigateTo('/admin/dashboard');
  } 
  // Caso seja o colaborador
  else if (username.value === 'colaborador' && password.value === '123') {
    alert('Login de colaborador bem-sucedido!');
    navigateTo('/feedback');
  } 
  // Caso contrário, usuário incorreto
  else {
    alert('Usuário ou senha incorretos!');
  }
};

// Função de recuperação de senha (temporariamente indisponível)
const handlePasswordReset = () => {
  alert('Funcionalidade de recuperação de senha temporariamente desabilitada.');
};
</script>

<style scoped>
/* Novo container para o "Esqueci minha senha" e "Cadastrar" */
.link-container {
  display: flex;
   /* Espaça os itens para as extremidades */
  width: 100%;
}

/* Estilo para os elementos de ação */
.esquecisenha, .senha {
  background-color: #419e9e;
  color: white;
  border-radius: 5px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  margin-left: 35px;

}

/* Estilização individual do botão de "Esqueci minha senha" */
.esquecisenha {
  width: auto;
  font-size: 15px;
  padding: 8px 15px;
}

/* Estilização individual do botão de "Cadastrar" */
.senha {
  width: auto; /* Ajuste para não ocupar 50% da largura, deixando espaço para o outro item */
  font-size: 15px;
  padding: 8px 15px;
}

/* Efeito hover nos links de ação */
.esquecisenha:hover, .senha:hover {
  transform: scale(1.05);
}

/* Wrapper do formulário */
.header-and-form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* Estilo do título */
.bemvindo {
  background-color: #419e9e;
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  text-align: center;
}

/* Estilo do subtítulo */
.subtitle {
  color: #666;
  margin-bottom: 10px;
}

/* Estilo geral do container */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
  padding: 20px;
}

/* Estilo padrão do <h1> */
h1 {
  color: #333;
  margin: 0;
}

/* Estilo do formulário e espaçamento dos campos */
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

/* Estilo dos campos de input */
input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

/* Estilo do botão de login */
button {
  padding: 12px;
  background-color: #419e9e;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease-in-out;
}

/* Efeito hover do botão */
button:hover {
  background-color: #419e9e;
  transform: scale(1.05);
}
</style>
