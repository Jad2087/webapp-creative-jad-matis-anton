<template>
  <div class="container">
    <div class="screen">
      <!-- TIMER à gauche -->
      <Timer />
      <MiniMap />
      
             <!-- Bouton Acte 2 -->
        <button class="act2-btn" @click="goToAct2">Acte 2 — Cauchemar</button>

      <!-- Contenu droit -->
      <div class="columnright">
        <!-- Header -->
        <AppHeader />

        <!-- Bloc texte du chapitre -->
        <div class="story-box">
          <p class="info-title">{{ activeChapter.title }}</p>
          <p class="info-content">{{ activeChapter.text }}</p>
        </div>

        <!-- Choix -->
        <ChoiceButtons
          :choices="activeChapter.choices"
          @choice-selected="changeChapter"
          class="choicebuttons"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader.vue";
import ChoiceButtons from "@/components/common/ChoiceButtons.vue";
import Timer from "@/components/layout/Timer.vue";
import MiniMap from "@/components/layout/MiniMap.vue";

// Import du store Pinia
import { useStoryStore } from "@/stores/storyStore";

export default {
  name: "GameView",
  components: { AppHeader, Timer, ChoiceButtons, MiniMap },

  data() {
    return {
      // Chapitre actuel (id)
      current: "intro",
    };
  },

  created() {
    // charge le chapitre actuel selon id passé dans la route
    this.current = this.$route.params.id;
  },

  computed: {
    // Crée une instance du store pour accéder aux chapitres
    // permet d'utiliser `storyStore` dans le template
    storyStore() {
      return useStoryStore();
    },

    // Retourne le chapitre actuellement actif
    activeChapter() {
      return (
        this.storyStore.storyData.find((chap) => chap.id === this.current) || {
          choices: [],
        }
      );
    },
  },

  methods: {
    changeChapter(next) {
      if (next.type === "story") {
        // Navigue vers la même route "game" avec le nouvel id
        this.$router.push({ name: "game", params: { id: next.id } });
        // met à jour le chapitre actuel
        this.current = next.id;
      } else if (next.type === "game") {
        // lance le mini-jeu
        console.log("Lancer le mini-jeu :", next.id);
        this.current = next.id; //affiche dans GameView
      }
    },
     goToAct2() {
    this.$router.push({ name: "millieu" }); // dirige vers MillieuView
  }
  },
};
</script>

<style scoped>
* {
  font-family: "Courier New", monospace;
}
/* Container et screen restent inchangés */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #111;
}

.screen {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(6, 1fr);
  column-gap: 2rem;
  width: 900px;
  height: 600px;
  padding: 2rem 2rem;
  background-color: #111;
  border: 2px solid #03ab5e;
  color: #03ab5e;
}

/* SCREEN: EFFET RETRO + COUBRE */
@keyframes crtFlicker {
  0% {
    opacity: 0.98;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.97;
  }
}

.screen {
  position: relative;
  overflow: hidden;
  animation: crtFlicker 0.15s infinite alternate;

  /* Effet de courbure CRT */
  transform: perspective(800px) rotateX(2deg) scale(1.02);
  transform-origin: center top;

  /* Optionnel : légère arrondie pour correspondre à un écran rétro */
  border-radius: 6px;
}

.screen::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.03) 0,
    rgba(255, 255, 255, 0.03) 2px,
    rgba(0, 0, 0, 0.06) 4px
  );
  pointer-events: none;
}

/* COLONNE DROITE */
.columnright {
  grid-column: 2;
  grid-row: 1 / 7;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Place AppHeader en haut de la colonne */
.columnright > *:first-child {
  margin-top: 0;
  align-self: flex-start;
}

/* Bloc texte */
.story-box {
  flex: 1;
  margin: 1rem 0;
  padding: 1rem;
  border: 2px solid #ffffff;
  background-color: #111;
  overflow-y: auto;
}

.info-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #03ab5e;
}

.info-content {
  white-space: pre-wrap;
  color: #03ab5e;
}

/* ChoiceButtons en bas */
.columnright > *:last-child {
  margin-top: auto;
  align-self: stretch;
}

.choicebuttons {
  width: 100%;
}

.act2-btn {
  background-color: #111;
  color: #03ab5e;
  font-weight: bold;
  border: 2px solid #03ab5e;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  margin: 0.5rem;
  cursor: pointer;
  width: 250px;
  transition: 0.3s ease;
}

.act2-btn:hover {
  background-color: #03ab5e;
  color: black;
  transform: scale(1.05);
}

</style>
