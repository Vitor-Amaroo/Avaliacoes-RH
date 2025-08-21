<template>
  <div class="feedback-container">
    <div class="content-wrapper">
      <h1 class="bemvindo">Olá! Como você se sente hoje?</h1>
      <p class="subtitle">Seu feedback é importante para nós.</p>
      
      <div class="emojis">
        <!-- Botões de emoji com classe condicional para seleção -->
        <button
          @click="selectMood('feliz', '😊')"
          class="emoji-button"
          :class="{ 'selected': selectedEmoji === '😊' }"
          aria-label="Feliz"
        >
          😊
        </button>
        <button
          @click="selectMood('neutro', '😐')"
          class="emoji-button"
          :class="{ 'selected': selectedEmoji === '😐' }"
          aria-label="Neutro"
        >
          😐
        </button>
        <button
          @click="selectMood('triste', '😢')"
          class="emoji-button"
          :class="{ 'selected': selectedEmoji === '😢' }"
          aria-label="Triste"
        >
          😢
        </button>
      </div>

      <!-- Caixa de texto que aparece após a seleção do emoji -->
      <div v-if="showCommentInput" class="comment-section">
        <p>Gostaria de adicionar um comentário?</p>
        <input v-model="comment" type="text" placeholder="Digite seu comentário aqui..." />
        <button @click="submitFeedback" class="submit-button">Enviar Feedback</button>
      </div>

      <!-- Mensagem de feedback após o envio -->
      <div v-if="feedbackReceived" class="message">
        <p>Obrigado pelo seu feedback! Ele foi registrado com sucesso.</p>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Variável reativa para controlar a exibição da mensagem de agradecimento
const feedbackReceived = ref(false);
const showCommentInput = ref(false);
const selectedMood = ref('');
const selectedEmoji = ref('');
const comment = ref('');

/**
 * Função para selecionar o humor e exibir a caixa de comentário.
 * @param {string} mood - O humor selecionado (ex: 'feliz', 'neutro', 'triste').
 * @param {string} emoji - O emoji correspondente para o estado de seleção.
 */
const selectMood = (mood, emoji) => {
  selectedMood.value = mood;
  selectedEmoji.value = emoji;
  showCommentInput.value = true;
  feedbackReceived.value = false;
};

/**
 * Função para enviar o feedback de humor para a API.
 * Será chamada após o envio do comentário.
 */
const submitFeedback = async () => {
  try {
    // Envia o feedback e o comentário para a rota de API no servidor
    const response = await $fetch('/api/feedback', {
      method: 'POST',
      body: {
        mood: selectedMood.value,
        comment: comment.value,
      },
    });

    if (response.success) {
      console.log('Feedback salvo:', response.message);
      feedbackReceived.value = true;
      // Reseta o estado após o envio
      showCommentInput.value = false;
      comment.value = '';
      selectedEmoji.value = ''; // Limpa o emoji selecionado
    } else {
      console.error('Falha ao salvar feedback:', response.message);
      alert('Falha ao enviar feedback.');
    }
  } catch (error) {
    console.error('Erro de rede:', error);
    alert('Erro de conexão ao enviar feedback.');
  }
};
</script>

<style scoped>
.feedback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
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

.emojis {
  display: flex;
  gap: 30px;
}

.emoji-button {
  background: none;
  border: none;
  font-size: 4rem;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
  padding: 10px;
  border-radius: 50%;
}

.emoji-button:hover {
  transform: scale(1.1);
  background-color: #e0e0e0;
}

/* Novo estilo para o emoji selecionado */
.emoji-button.selected {
  transform: scale(1.1);
  background-color: #419e9e;
  box-shadow: 0 0 10px rgba(65, 158, 158, 0.5);
  transition: all 0.3s ease-in-out;
}

.comment-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin-top: 20px;
}

.comment-section input {
  width: 80%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.submit-button {
  background-color: #419e9e;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  background-color: #003666;
  transform: scale(1.05);
}

.message {
  margin-top: 30px;
  padding: 15px;
  background-color: #e9f5e9;
  border: 1px solid #d4eac9;
  border-radius: 8px;
  color: #2e7d32;
  font-weight: bold;
}
</style>
