<template>
  <div class="container">
    <AppHeader/>
    <Timer />
    <div class="screen">
      <h1 class="title">{{ activeChapter.title }}</h1>
      <p class="story-text">{{ activeChapter.text }}</p>
      <div class="choices">
        <button
          v-for="(choice, i) in activeChapter.choices"
          :key="i"
          class="choice-btn"
          @click="changeChapter(choice.next)"
        >
          {{ choice.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TextParagraph from "@/components/common/TextParagraph.vue";
import NavChoice from "@/components/common/NavChoice.vue";
import AppHeader from '@/components/layout/AppHeader.vue';
import Timer from '@/components/layout/Timer.vue';

export default {
  name: "GameView",
  components: { TextParagraph, NavChoice, AppHeader, Timer },

  data() {
    return {
      current: "intro",
      chapters: [
        {
          id: "intro",
          title: "Chapter 1 — Intro",
          text: "Bienvenue dans l’aventure… mets ton vrai texte ici.",
          choices: [
            { text: "Continuer", next: "fork01" }
          ]
        },

        {
          id: "fork01",
          title: "Chapter 1 — Fork 01",
          text: "Tu arrives à un embranchement...",
          choices: [
            { text: "Aller vers Clue 01", next: "clue01" },
            { text: "MiniGame 01", next: "minigame01" },
            { text: "Aller vers Clue 02", next: "clue02" },
            { text: "Retour", next: "intro" }
          ]
        },

        {
          id: "clue01",
          title: "Chapter 1 — Clue 01",
          text: "Voici l’indice numéro 1...",
          choices: [
            { text: "Retour au fork", next: "fork01" }
          ]
        },

        {
          id: "minigame01",
          title: "Chapter 1 — Mini-jeu",
          text: "Voici l'interface du mini-jeu (placeholder).",
          choices: [
            { text: "Retour", next: "fork01" }
          ]
        },

        {
          id: "clue02",
          title: "Chapter 1 — Clue 02",
          text: "Voici l’indice numéro 2...",
          choices: [
            { text: "Retour au fork", next: "fork01" }
          ]
        }
      ],
    };
  },

  computed: {
    activeChapter() {
      return this.chapters.find(current => current.id === this.current);
    }
  },

  methods: {
    changeChapter(nextId) {
      this.current = nextId;
    }
  }
};
</script>

<style scoped>

* {
  font-family: 'Courier New', Courier, monospace;
}

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
    width: 700px;  
    height: 500px;      
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
  
.choice-btn {
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

.choice-btn:hover {
  background-color: #03AB5E; 
  color: #000; 
  transform: scale(1.1);
}

.story-text{
  color: #03AB5E;
}

</style>
