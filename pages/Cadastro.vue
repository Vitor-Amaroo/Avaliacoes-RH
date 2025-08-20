<template>
  <!-- Container principal que centraliza o conteúdo na tela -->
  <div class="register-container">
    <!-- Wrapper que agrupa o cabeçalho e o formulário de cadastro -->
    <div class="header-and-form-wrapper">
      <!-- Título principal da página de cadastro -->
      <h1 class="bemvindo">Cadastre-se</h1>
      <!-- Subtítulo para instruir o usuário -->
      <p class="subtitle">Preencha os dados para criar sua conta.</p>

      <!-- Formulário de cadastro que chama a função 'handleRegister' ao ser submetido -->
      <form @submit.prevent="handleRegister">
        <!-- Campo para o nome completo -->
        <input v-model="name" type="text" placeholder="Nome completo" required />
        <!-- Campo de e-mail -->
        <input v-model="email" type="email" placeholder="E-mail" required />
        <!-- Campo de CPF com formatação automática -->
        <input v-model="cpf" type="text" placeholder="CPF" @input="formatCPF" maxlength="14" required />
        <!-- Mensagem de erro do CPF -->
        <span v-if="cpfError" class="error-message">{{ cpfError }}</span>

        <!-- Label e input de data de nascimento -->
        <label for="birthdate" class="form-label">Data de Nascimento:</label>
        <input id="birthdate" v-model="birthdate" type="date" required />
        <!-- Mensagem de erro de idade -->
        <span v-if="ageError" class="error-message">{{ ageError }}</span>
        
        <!-- Campo de senha com ícone de visibilidade -->
        <div class="password-container">
          <input v-model="password" :type="passwordFieldType" placeholder="Criar senha" required />
          <!-- Alterna visibilidade da senha -->
          <span class="password-toggle" @click="togglePasswordVisibility">
            <!-- Olho aberto (senha escondida) -->
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="eye-icon">
              <path d="M12 4.5c5.31 0 9.77 3.65 11.23 8.5a1 1 0 01-1.23.83A9.88 9.88 0 0012 5.5c-4.43 0-8.24 2.8-9.52 6.83a1 1 0 01-1.23-.83C1.23 8.15 5.69 4.5 12 4.5zM12 7.5a4.5 4.5 0 100 9A4.5 4.5 0 0012 7.5zM12 9.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />
            </svg>
            <!-- Olho riscado (senha visível) -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="eye-icon">
              <path d="M12 4.5c5.31 0 9.77 3.65 11.23 8.5a1 1 0 01-1.23.83A9.88 9.88 0 0012 5.5c-4.43 0-8.24 2.8-9.52 6.83a1 1 0 01-1.23-.83C1.23 8.15 5.69 4.5 12 4.5zM12 7.5a4.5 4.5 0 100 9A4.5 4.5 0 0012 7.5zM12 9.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />
              <path fill-rule="evenodd" d="M16.92 18.08a1 1 0 01-1.41 1.41L12 15.41l-3.51 3.51a1 1 0 11-1.41-1.41L10.59 14l-3.51-3.51a1 1 0 011.41-1.41L12 12.59l3.51-3.51a1 1 0 011.41 1.41L13.41 14l3.51 3.51z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>

        <!-- Campo de confirmação de senha -->
        <div class="password-container">
          <input v-model="confirmPassword" :type="confirmPasswordFieldType" placeholder="Confirmar senha" required />
          <!-- Alterna visibilidade da confirmação -->
          <span class="password-toggle" @click="toggleConfirmPasswordVisibility">
            <!-- Ícone olho aberto -->
            <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="eye-icon">
              <path d="M12 4.5c5.31 0 9.77 3.65 11.23 8.5a1 1 0 01-1.23.83A9.88 9.88 0 0012 5.5c-4.43 0-8.24 2.8-9.52 6.83a1 1 0 01-1.23-.83C1.23 8.15 5.69 4.5 12 4.5zM12 7.5a4.5 4.5 0 100 9A4.5 4.5 0 0012 7.5zM12 9.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />
            </svg>
            <!-- Ícone olho riscado -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="eye-icon">
              <path d="M12 4.5c5.31 0 9.77 3.65 11.23 8.5a1 1 0 01-1.23.83A9.88 9.88 0 0012 5.5c-4.43 0-8.24 2.8 -9.52 6.83a1 1 0 01-1.23-.83C1.23 8.15 5.69 4.5 12 4.5zM12 7.5a4.5 4.5 0 100 9A4.5 4.5 0 0012 7.5zM12 9.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />
              <path fill-rule="evenodd" d="M16.92 18.08a1 1 0 01-1.41 1.41L12 15.41l-3.51 3.51a1 1 0 11-1.41-1.41L10.59 14l-3.51-3.51a1 1 0 011.41-1.41L12 12.59l3.51-3.51a1 1 0 011.41 1.41L13.41 14l3.51 3.51z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <!-- Mensagem para erro de senha -->
        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
        
        <!-- Campo para digitar o setor -->
        <input v-model="sector" type="text" placeholder="Setor" required />
        <!-- Campo para digitar o gestor -->
        <input v-model="manager" type="text" placeholder="Gestor" required />

        <!-- Botão de submissão do formulário -->
        <button type="submit">Finalizar Cadastro</button>
      </form>
      
      <!-- Link para voltar ao login -->
      <p class="login-link" @click="navigateTo('/')">Voltar para o Login</p>
    </div>
  </div>
</template>

<script setup>
// Import de ref e computed para reatividade
import { ref, computed } from 'vue';
// Navegação entre páginas (Nuxt)
import { navigateTo } from '#app';

// Dados reativos do formulário
const name = ref('');
const email = ref('');
const cpf = ref('');
const birthdate = ref('');
const password = ref('');
const confirmPassword = ref('');
const sector = ref('');
const manager = ref('');

// Mensagens de erro e variáveis de estado
const passwordError = ref('');
const cpfError = ref('');
const ageError = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Alterna tipo do campo de senha
const passwordFieldType = computed(() => {
  return showPassword.value ? 'text' : 'password';
});
// Alterna tipo do campo de confirmação
const confirmPasswordFieldType = computed(() => {
  return showConfirmPassword.value ? 'text' : 'password';
});

/**
 * Alterna visibilidade da senha principal
 */
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

/**
 * Alterna visibilidade da senha de confirmação
 */
const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

/**
 * Formata o valor do CPF conforme o usuário digita
 */
const formatCPF = () => {
  // Remove caracteres não numéricos
  let value = cpf.value.replace(/\D/g, '');
  // Limita a 11 dígitos
  if (value.length > 11) value = value.slice(0, 11);
  // Adiciona a máscara (###.###.###-##)
  if (value.length > 3)
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
  if (value.length > 7)
    value = value.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
  if (value.length > 11)
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  cpf.value = value;
};

/**
 * Valida os dígitos do CPF
 */
const validateCPF = (rawCpf) => {
  const cpf = rawCpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0; let remainder;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

/**
 * Verifica se o usuário possui 18 anos ou mais
 */
const validateAge = () => {
  const today = new Date();
  const birthdateValue = new Date(birthdate.value);
  let age = today.getFullYear() - birthdateValue.getFullYear();
  const m = today.getMonth() - birthdateValue.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdateValue.getDate())) {
    age--;
  }
  return age >= 18;
};

/**
 * Função disparada ao submeter o formulário
 */
const handleRegister = async () => {
  passwordError.value = '';
  cpfError.value = '';
  ageError.value = '';

  // Validação das senhas
  if (password.value !== confirmPassword.value) {
    passwordError.value = 'As senhas não coincidem.';
    return;
  }

  // Validação do CPF
  if (!validateCPF(cpf.value)) {
    cpfError.value = 'CPF inválido.';
    return;
  }

  // Validação de idade
  if (!validateAge()) {
    ageError.value = 'Você deve ter mais de 18 anos.';
    return;
  }

  // Dados a serem enviados
  const formData = {
    name: name.value,
    email: email.value,
    cpf: cpf.value,
    birthdate: birthdate.value,
    password: password.value,
    sector: sector.value,
    manager: manager.value,
  };

  try {
    // Envio para API
    const response = await $fetch('/api/register', {
      method: 'POST',
      body: formData,
    });
    
    // Sucesso ou erro
    if (response.success) {
      alert('Cadastro realizado com sucesso!');
      navigateTo('/');
    } else {
      alert('Erro no cadastro. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro de rede ao cadastrar:', error);
    alert('Erro de conexão. Tente novamente.');
  }
};
</script>

<style scoped>
/* Label da data de nascimento */
.form-label {
  color: #666;
  font-size: 0.9rem;
  align-self: flex-start;
  margin-top: -10px;
}

/* Wrapper do campo de senha com ícone de visibilidade */
.password-container {
  display: flex;
  align-items: center;
  position: relative;
}

/* Input com espaço para o ícone */
.password-container input {
  width: 100%;
  padding-right: 40px;
}

/* Botão/ícone para alternar visibilidade */
.password-toggle {
  position: absolute;
  right: 12px;
  cursor: pointer;
  z-index: 10;
}

/* Ícone de olho */
.eye-icon {
  width: 24px;
  height: 24px;
  color: #666;
}

/* Mensagens de erro */
.error-message {
  color: #e53e3e;
  font-size: 0.8rem;
  margin-top: -10px;
  margin-bottom: 10px;
  align-self: flex-start;
}

/* Link para voltar ao login */
.login-link {
  background-color: #419e9e;
  color: white;
  border-radius: 5px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  width: 50%;
  padding: 12px;
  font-weight: bold;
}

/* Efeito hover no link */
.login-link:hover {
  background-color: #003666;
  transform: scale(1.05);
}

/* Container geral de registro */
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
  padding: 20px;
}

/* Wrapper de formulário */
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

/* Título principal */
.bemvindo {
  background-color: #419e9e;
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  text-align: center;
}

/* Subtítulo */
.subtitle {
  color: #666;
  margin-bottom: 10px;
}

/* Layout do form */
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

/* Estilo dos inputs */
input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

/* Botão de cadastro */
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

/* Hover do botão */
button:hover {
  background-color: #003666;
  transform: scale(1.05);
}
</style>
