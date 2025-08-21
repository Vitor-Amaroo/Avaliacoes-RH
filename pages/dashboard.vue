<template>
  <div class="admin-container">
    <div class="dashboard-wrapper">
      <h1 class="bemvindo">Dashboard do Administrador</h1>
      <p class="subtitle">Bem-vindo(a)! Escolha uma das opções abaixo.</p>
      
      <div class="button-container">
        <!-- Botão para gerenciar colaboradores -->
        <button class="action-button" @click="navigateTo('/admin/users')">
          Gerenciar Colaboradores
        </button>
        
        <!-- Botão para ver as opiniões -->
        <button class="action-button" @click="navigateTo('/admin/opinions')">
          Ver Opiniões
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { navigateTo } from '#app';
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
  padding: 20px;
}

.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
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

.button-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
}

.action-button {
  background-color: #419e9e;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.action-button:hover {
  background-color: #419e9e;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
