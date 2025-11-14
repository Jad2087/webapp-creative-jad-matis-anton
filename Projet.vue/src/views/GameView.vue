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
  
  <script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import NavChoice from '../components/common/NavChoice.vue'
  import TextParagraph from '../components/common/TextParagraph.vue'
  

  export default {
  name: 'GameView',
  
  data() {
    return {
      chapterId: null,
      
      // Données temporaires placées ici pour tester pour l'exercice mais ultimement vos données de chapitre seront dans un json
      chapters: {
        '1': {
          title: 'La forêt mystérieuse',
          text: 'Tu te trouves à l\'entrée d\'une forêt sombre. Deux chemins s\'offrent à toi.',
          choices: [
            { id: 1, text: 'Prendre le chemin de gauche 🌲', nextChapter: '2' },
            { id: 2, text: 'Prendre le chemin de droite 🏔️', nextChapter: '3' }
          ]
        },
        '2': {
          title: 'Le pont suspendu',
          text: 'Tu arrives devant un vieux pont suspendu au-dessus d\'une rivière.',
          choices: [
            { id: 1, text: 'Traverser le pont 🌉', nextChapter: '4' },
            { id: 2, text: 'Longer la rivière 🏞️', nextChapter: '5' }
          ]
        },
        '3': {
          title: 'La montagne',
          text: 'Le chemin monte vers une montagne enneigée.',
          choices: [
            { id: 1, text: 'Grimper au sommet ⛰️', nextChapter: '6' },
            { id: 2, text: 'Chercher une grotte 🕳️', nextChapter: '7' }
          ]
        },
        '4': {
          title: 'Village abandonné',
          text: 'Après le pont, tu découvres un village abandonné...',
          choices: [
            { id: 1, text: 'Recommencer', nextChapter: '1' }
          ]
        },
        '5': {
          title: 'Cascade cachée',
          text: 'En longeant la rivière, tu trouves une magnifique cascade !',
          choices: [
            { id: 1, text: 'Recommencer', nextChapter: '1' }
          ]
        },
        '6': {
          title: 'Le sommet',
          text: 'Tu arrives au sommet et la vue est à couper le souffle !',
          choices: [
            { id: 1, text: 'Recommencer', nextChapter: '1' }
          ]
        },
        '7': {
          title: 'La grotte du dragon',
          text: 'Dans la grotte, tu découvres un trésor gardé par un dragon endormi...',
          choices: [
            { id: 1, text: 'Recommencer', nextChapter: '1' }
          ]
        }
      }
    };
  },
  
  computed: {
    currentChapter() {
      // Retourne le chapitre actuel ou un chapitre par défaut
      return this.chapters[this.chapterId] || {
        title: 'Chapitre introuvable',
        text: 'Ce chapitre n\'existe pas encore.',
        choices: []
      };
    }
  },
  
  created() {
    this.chapterId = this.$route.params.id
    // TODO: Récupérer le paramètre dynamique ID du chapitre depuis l'URL
    // Note de cours: https://tim-montmorency.com/compendium/582-511-web5/vue/router-and-views.html#41-routes-avec-parametres-dynamiques
    
  },
  
  methods: {
    makeChoice(nextChapterId) {
      this.$router.push({
    name: 'chapter',
    params: { id: nextChapterId }
  });
 
  this.chapterId = nextChapterId
      // TODO: Naviguer vers le prochain chapitre
      // Note de cours: https://tim-montmorency.com/compendium/582-511-web5/vue/router-and-views.html#32-navigation-programmatique-dans-les-methodes
     
     
     
      // TODO: Mettre à jour l'ID local du chapitre
      // this.chapterId = ...
     
    },
   
    goBack() {
      this.$router.push({ name: 'home' });
    }
  }
};


    /*
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
  }*/
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
  