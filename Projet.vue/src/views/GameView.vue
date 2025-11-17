<template>
  <div class="container">
      <div class="screen">

        <!-- TIMER à gauche -->
            <Timer />
            <MiniMap />
        
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
          />
        </div>

      </div>
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue';
import ChoiceButtons from '@/components/common/ChoiceButtons.vue';
import Timer from '@/components/layout/Timer.vue';
import MiniMap from '@/components/layout/MiniMap.vue';

// Import du store Pinia
import { useStoryStore } from '@/stores/storyStore';

export default {
  name: "GameView",
  components: { AppHeader, Timer, ChoiceButtons, MiniMap },

data() {
    return {
      // Chapitre actuel (id)
      current: "intro"
    };
  },

created() {
      // charge le chapitre actuel selon id passé dans la route
      this.current = this.$route.params.id;
  },

  computed: {
    // Crée une instance du store pour accéder aux chapitres
    storyStore() {
      return useStoryStore();
    },

    // Retourne le chapitre actuellement actif
    activeChapter() {
      return this.storyStore.storyData.find(chap => chap.id === this.current) || { choices: [] };
    }
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
   }
 }
}
</script>

<style scoped>
/* Container et screen restent inchangés */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
}

.screen {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(6, 1fr);
  column-gap: 2rem;
  width: 900px;
  height: 600px;
  padding: 2rem 3rem;
  background-color: #1F1F1F;
  border: 3px solid #03AB5E;
  color: #03AB5E;
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
  border: 3px solid #ffffff;
  background-color: #111;
  overflow-y: auto;
  border-radius: 8px;
}

.info-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #03AB5E;
}

.info-content {
  white-space: pre-wrap;
  color: #03AB5E;
}

/* ChoiceButtons en bas */
.columnright > *:last-child {
  margin-top: auto;
  align-self: center;
}
</style>
