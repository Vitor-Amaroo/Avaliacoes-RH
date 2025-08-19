<template>
  <div>
    <header class="header-bar">
      <h1>Avaliações RH</h1>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.header-bar {
  position: fixed; /* Fixa a barra no topo da tela */
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 20px;
  background-color: #419e9e; /* Um tom de azul */
  color: white;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* Garante que a barra fique acima de outros elementos */
}

.header-bar h1 {
  margin: 0;
  font-size: 1.5rem;
}

main {
  /* Adiciona um padding no topo para o conteúdo não ficar por baixo da barra fixa */
  padding-top: 70px; 
}
</style>

<style>
/* Esta regra se aplica a todo o corpo do documento */
body {
  overflow: hidden; /* Impede a rolagem */
}
</style>