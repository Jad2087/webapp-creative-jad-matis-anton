<template>
  <div class="container">
    <div class="window-wrapper">
      <AppHeader />

      <div class="screen">
        <h1 class="title">{{ activeChapter.title }}</h1>
        <p class="story-text">{{ activeChapter.text }}</p>
      </div>
    </div>

    <div class="choices-container">
      <ChoiceButtons
        :choices="activeChapter.choices"
        @choice-selected="changeChapter"
      />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue';
import ChoiceButtons from '@/components/common/ChoiceButtons.vue';

export default {
  name: "GameView",
  components: { AppHeader, ChoiceButtons },
  data() {
    return {
      current: "intro",
      chapters: [
        { id:"intro", title:"Chapter 1 — Intro", text:"Bienvenue … mets ton vrai texte ici.", choices:[ { text:"Continuer", next:"fork01" } ] },
        { id:"fork01", title:"Chapter 1 — Fork 01", text:"Tu arrives à un embranchement...", choices:[ { text:"Aller vers Clue 01", next:"clue01" }, { text:"MiniGame 01", next:"minigame01" }, { text:"Aller vers Clue 02", next:"clue02" }, { text:"Retour", next:"intro" } ] },
        { id:"clue01", title:"Chapter 1 — Clue 01", text:"Voici l’indice numéro 1...", choices:[ { text:"Retour au fork", next:"fork01" } ] },
        { id:"minigame01", title:"Chapter 1 — Mini-jeu", text:"Voici l'interface du mini-jeu (placeholder).", choices:[ { text:"Retour", next:"fork01" } ] },
        { id:"clue02", title:"Chapter 1 — Clue 02", text:"Voici l’indice numéro 2...", choices:[ { text:"Retour au fork", next:"fork01" } ] }
      ],
    };
  },
  computed: {
    activeChapter() {
      return this.chapters.find(chap => chap.id === this.current) || { choices: [] };
    }
  },
  methods: {
    changeChapter(nextId) {
      this.current = nextId;
    }
  }
}
</script>

<style scoped>
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

.story-block {
  flex: 1;
  color: #03AB5E;
  text-align: left;
  padding-right: 2rem;
}

.title {
  font-family:'Courier New', Courier, monospace;
  font-size: 3rem;
  margin-bottom: 2rem;
}

.story-text {
  color: #03AB5E;
}

.choices-container {
  width: 300px;
  display: flex;
  align-items: flex-start;
}
</style>
