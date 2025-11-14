<template>
    <div class="container">
      <div class="screen">
        <h1 class="title">Introduction</h1>
  
        <button class="start-btn" @click="startStory">Commencer</button>
  
        <!-- Bouton Retour sous Commencer -->
        <button class="back-btn" @click="goBack">Retour</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  function startStory() {
    console.log("Commencer cliqué")
  }
  
  function goBack() {
    router.push({ name: 'home' })
  }
  </script>
  
  <style scoped>
  /* Fond de la page */
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
  
  /* Titre */
  .title {
    color: #03AB5E; 
    font-family: 'Courier New', Courier, monospace;
    font-size: 3rem;
    margin-bottom: 3rem;
    letter-spacing: 2px;
  }
  
  /* Boutons */
  .start-btn,
  .back-btn {
    background-color: #000; 
    color: #03AB5E; 
    width: 250px;   /* même largeur pour tous les boutons */
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
  