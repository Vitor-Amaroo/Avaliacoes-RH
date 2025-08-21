<template>
  <div class="users-container">
    <div class="content-wrapper">
      <h1 class="bemvindo">Gerenciamento de Colaboradores</h1>
      <p class="subtitle">Lista de todos os usuários cadastrados.</p>
      
      <!-- Tabela para exibir os usuários -->
      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Setor</th>
            <th>Gestor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop para exibir cada usuário na tabela -->
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>
              <!-- Exibe o nome ou um campo de edição -->
              <span v-if="!user.editing">{{ user.name }}</span>
              <input v-else v-model="user.name" type="text" />
            </td>
            <td>
              <!-- Exibe o e-mail ou um campo de edição -->
              <span v-if="!user.editing">{{ user.email }}</span>
              <input v-else v-model="user.email" type="text" />
            </td>
            <td>
              <!-- Exibe o setor ou um campo de edição -->
              <span v-if="!user.editing">{{ user.sector }}</span>
              <input v-else v-model="user.sector" type="text" />
            </td>
            <td>
              <!-- Exibe o gestor ou um campo de edição -->
              <span v-if="!user.editing">{{ user.manager }}</span>
              <input v-else v-model="user.manager" type="text" />
            </td>
            <!-- Célula com os botões de ação -->
            <td class="action-buttons">
              <!-- Botão para editar ou salvar -->
              <button @click="user.editing = !user.editing" class="edit-button">
                {{ user.editing ? 'Salvar' : 'Editar' }}
              </button>
              <!-- Botão para deletar o usuário -->
              <button @click="deleteUser(user.id)" class="delete-button">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Link para voltar ao menu do administrador -->
      <p class="back-link" @click="navigateTo('/dashboard')">Voltar</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { navigateTo } from '#app';

// Variável reativa para armazenar a lista de usuários
const users = ref([]);

// Função assíncrona para buscar todos os usuários do banco de dados
const fetchUsers = async () => {
  try {
    const response = await $fetch('/api/users');
    if (response.success) {
      users.value = response.data.map(user => ({ ...user, editing: false }));
    } else {
      alert('Erro ao carregar a lista de usuários.');
    }
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    alert('Erro de conexão ao buscar usuários.');
  }
};

// Função para deletar um usuário pelo ID
const deleteUser = async (userId) => {
  if (confirm('Tem certeza de que deseja deletar este usuário?')) {
    try {
      const response = await $fetch(`/api/users/${userId}`, { method: 'DELETE' });
      if (response.success) {
        alert('Usuário deletado com sucesso!');
        // Recarrega a lista de usuários após a exclusão
        fetchUsers();
      } else {
        alert('Erro ao deletar usuário.');
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro de conexão ao deletar usuário.');
    }
  }
};

// Chama a função para carregar os usuários quando a página é montada
onMounted(fetchUsers);
</script>

<style scoped>
.users-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
  padding: 20px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
}

.bemvindo {
  background-color: #419e9e;
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  text-align: center;
}

.subtitle {
  color: #666;
  margin-bottom: 10px;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.users-table th, .users-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.users-table th {
  background-color: #419e9e;
  color: white;
}

.users-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Container flex para os botões de ação na tabela */
.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.delete-button {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #c62828;
}

.edit-button {
  background-color: #f39c12;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button:hover {
  background-color: #e67e22;
}

.back-link {
  margin-top: 20px;
  background-color: #419e9e;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  padding: 12px 20px;
  transition: background-color 0.3s ease, transform 0.3s ease-in-out;
}

.back-link:hover {
  background-color: #003666;
  transform: scale(1.05);
}
</style>
