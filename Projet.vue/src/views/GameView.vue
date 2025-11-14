<template>
    <div class="container">
      <div class="screen">
        <h1 class="title">Bienvenue dans le jeu!</h1>
  
        <!-- Bouton Continuer -->
        <button v-if="!showText" class="start-btn" @click="continueGame">Continuer</button>
  
        <!-- Texte narratif via TextParagraph -->
        <TextParagraph v-if="showText" />
  
        <!-- Ensuite, on peut afficher les choix -->
        <NavChoice v-if="showText" @playerChoice="onChoiceMade" />
  
        <!-- Retour -->
        <button class="back-btn" @click="goBack">Retour à l'accueil</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import NavChoice from '../components/common/NavChoice.vue'
  import TextParagraph from '../components/common/TextParagraph.vue'
  
  const router = useRouter()
  const showText = ref(false)
  const choice = ref('')
  
  function continueGame() {
    showText.value = true
  }
  
  function onChoiceMade(selectedChoice) {
    choice.value = selectedChoice
  }
  
  function goBack() {
    router.push({ name: 'home' })
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000;
  }
  
  .screen {
    background-color: #000;
    padding: 4rem 6rem;
    width: 600px;  
    height: 400px;       
    border: 3px solid #03AB5E; 
    text-align: center;
  }
  
  .title {
    color: #03AB5E; 
    font-family: 'Courier New', monospace;
    font-size: 3rem;
    margin-bottom: 2rem;
  }
  
  .story-text {
    color: #03AB5E;
    font-family: 'Courier New', monospace;
    font-size: 1.2rem;
    margin: 2rem 0;
  }
  
  .start-btn,
  .back-btn {
    background-color: #000; 
    color: #03AB5E; 
    font-weight: bold;
    width: 250px;
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
  