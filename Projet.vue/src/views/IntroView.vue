<template>
  <div class="container">
    <div class="intro-layout">
      <!-- Header -->
      <AppHeader class="intro-header" />

      <div class="screen">
        <h1 class="title">Introduction</h1>

        <button class="start-btn" @click="startStory">Continuer</button>
        <!-- Si tu veux afficher un bouton retour -->
        <!-- <button class="back-btn" @click="goBack">Retour</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'

export default {
  name: "IntroView",

  components: { AppHeader },

  data() {
    return {};
  },
methods: {
  startStory() {
    this.$router.push({ name: 'game', params: { id: 'intro' } });
  },

  goBack() {
    this.$router.push({ name: 'home' });
  }
}
}

</script>

  
  <style scoped>

* {
  font-family: 'Courier New', Courier, monospace;
}

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
    font-family: 'Courier New', Courier, monospace;
    font-size: 3rem;
    margin-bottom: 3rem;
    letter-spacing: 2px;
  }
  
  /* Boutons */
  .start-btn {
    background-color: #000; 
    color: #03AB5E; 
    width: 250px;  
    font-weight: bold;
    font-size: 1.2rem;
    padding: 0.75rem 2.5rem;
    border: 2px solid #03AB5E; 
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    display: block;    
    margin: 1rem auto 0;    
  }
  
  .start-btn:hover,
  .back-btn:hover {
    background-color: #03AB5E; 
    color: #000; 
    transform: scale(1.1);
  }
  </style>
  