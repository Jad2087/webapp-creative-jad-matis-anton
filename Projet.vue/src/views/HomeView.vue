<template>
  <div class="container">
    <div class="screen">
      <h1 class="title">Codex</h1>
      <button class="start-btn" @click="startStory">Commencer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",

  data() {
    return {};
  },

  methods: {
    startStory() {
      this.$router.push({ name: 'intro' });
    }
  }
};
</script>

<style scoped>

* {
  font-family: 'Courier New', Courier, monospace;
}

/* Fond de la page */
.container {
  display: flex;
  justify-content: center;   /* centers horizontally */
  align-items: center;       /* centers vertically */
  height: 100vh;             /* full viewport height */
  background-color: #000;
}

.screen {
  width: 700px;
  height: 500px;
  padding: 4rem 6rem;
  background-color: #000;
  border: 3px solid #03AB5E;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Titre */
.title {
  color: #03AB5E; 
  font-size: 3rem;
  margin-bottom: 3rem;
  letter-spacing: 2px;
}

/* Bouton Commencer */
.start-btn {
  background-color: #000; 
  color: #03AB5E; 
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.75rem 2.5rem;
  border: 2px solid #03AB5E; 
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.start-btn:hover {
  background-color: #03AB5E; 
  color: #000; 
  transform: scale(1.1);
}

</style>
