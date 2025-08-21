<template>
  <div class="opinions-container">
    <div class="content-wrapper">
      <h1 class="bemvindo">Opiniões do Mês</h1>
      <p class="subtitle">Visão geral dos feedbacks dos últimos 30 dias.</p>
      
      <!-- Tabela para exibir os resultados da contagem de emojis -->
      <table class="opinions-table" v-if="!showDetails">
        <thead>
          <tr>
            <th>Humor</th>
            <th>Votos</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop para exibir cada resultado na tabela -->
          <tr v-for="opinion in opinions" :key="opinion.mood">
            <td>{{ getEmoji(opinion.mood) }}</td>
            <td>{{ opinion.count }}</td>
            <td>
              <button @click="fetchDetailedOpinions(opinion.mood)" class="details-button">
                Ver Detalhes
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Seção de detalhes que é exibida ao clicar no botão -->
      <div v-else class="detailed-view">
        <h2 class="mood-title">{{ getEmoji(selectedMood) }} - Detalhes</h2>
        <ul class="comments-list">
          <li v-for="(comment, index) in detailedOpinions" :key="index">
            <p>{{ comment.comment || 'Nenhum comentário.' }}</p>
          </li>
        </ul>
        <p class="back-link" @click="showDetails = false">Voltar</p>
      </div>
      
      <!-- Link para voltar ao menu do administrador -->
      <p class="back-link" @click="navigateTo('/admin/dashboard')">Voltar</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { navigateTo } from '#app';

// Variável reativa para armazenar a lista de opiniões
const opinions = ref([]);
const showDetails = ref(false);
const selectedMood = ref('');
const detailedOpinions = ref([]);

// Função para mapear o humor para o emoji correspondente
const getEmoji = (mood) => {
  switch (mood) {
    case 'feliz': return '😊';
    case 'neutro': return '😐';
    case 'triste': return '😢';
    default: return '';
  }
};

// Função assíncrona para buscar os dados de opiniões
const fetchOpinions = async () => {
  try {
    const response = await $fetch('/api/opinions');
    if (response.success) {
      opinions.value = response.data;
    } else {
      alert('Erro ao carregar as opiniões.');
    }
  } catch (error) {
    console.error('Erro ao buscar opiniões:', error);
    alert('Erro de conexão ao buscar opiniões.');
  }
};

// Função para buscar os detalhes de um humor específico
const fetchDetailedOpinions = async (mood) => {
  try {
    selectedMood.value = mood;
    const response = await $fetch(`/api/opinions/${mood}`);
    if (response.success) {
      detailedOpinions.value = response.data;
      showDetails.value = true;
    } else {
      alert('Erro ao carregar os detalhes.');
    }
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error);
    alert('Erro de conexão ao buscar detalhes.');
  }
};

// Chama a função para buscar as opiniões quando a página é montada
onMounted(fetchOpinions);
</script>

<style scoped>
.opinions-container {
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
  max-width: 600px;
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

.opinions-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.opinions-table th, .opinions-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.opinions-table th {
  background-color: #419e9e;
  color: white;
}

.opinions-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.detailed-view {
  width: 100%;
  text-align: left;
}

.mood-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #419e9e;
}

.comments-list {
  list-style-type: none;
  padding: 0;
}

.comments-list li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.details-button {
  background-color: #419e9e;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.details-button:hover {
  background-color: #003666;
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
