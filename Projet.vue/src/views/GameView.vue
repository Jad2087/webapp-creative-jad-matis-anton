<template>
  <div class="container">
    <div class="window-wrapper">
    
    <div class="screen">
      <div class="columnleft"><Timer /></div>
      
      <div class="columnright">
        <AppHeader/>
        <ChoiceButtons
        :choices="activeChapter.choices"
        @choice-selected="changeChapter"
      />
      </div>
    </div>
    </div>
  </div>
</template>

<script>

import AppHeader from '@/components/layout/AppHeader.vue';
import ChoiceButtons from '@/components/common/ChoiceButtons.vue';
import Timer from '@/components/layout/Timer.vue';

export default {
  name: "GameView",
  components: { AppHeader, Timer, ChoiceButtons },

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
  display: grid;
  grid-template-columns: 1fr 3fr;     /* 2 colonnes */
  grid-template-rows: repeat(6, 1fr); /* 6 rangées */
  column-gap: 2rem;
  width: 900px;
  height: 600px;
  padding: 2rem 3rem;
  background-color: #1F1F1F;
  border: 3px solid white;
  color: #03AB5E;
}

/* --- ROW 1 : Timer + Header --- */
.columnleft {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: flex-start;
}

.columnright {
  grid-column: 2;
  grid-row: 1 / 7; /* occupe rows 1 à 6 */
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Place AppHeader en haut de la colonne */
.columnright > *:first-child {
  margin-top: 0;
  align-self: flex-start;
}

/* Place ChoiceButtons tout en bas */
.columnright > *:last-child {
  margin-top: auto;     /* pousse vers le bas */
  align-self: center;
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
  background-color: red;
}
</style>
