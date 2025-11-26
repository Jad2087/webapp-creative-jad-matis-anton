<template>
  <div class="container">
    <div class="screen">
      <!-- TIMER à gauche -->
      <div class="columnleft">
        <Timer />
        <Decoration />
        <MiniMap :currentChapterId="current" />
      </div>
      <!-- Contenu droit -->
      <div class="columnright">
        <!-- Header -->
        <AppHeader />

        <!-- Bloc texte du chapitre -->
        <div class="story-box">
          <p class="info-title">{{ activeChapter.title }}</p>

          <!-- <p class="info-content">{{ activeChapter.text }}</p> -->

          <p class="info-content" ref="infoContent"></p>

        </div>

        <!-- Choices show up as buttons from ChoiceButtons component -->
        <ChoiceButtons :choices="activeChapter.choices" @choice-selected="changeChapter" class="choicebuttons" />

        <!-- MiniGame overlay component, shown only when openMiniGame is true -->
        <MiniGame v-if="openMiniGame" @close="openMiniGame = false" @done="onMiniGameDone" />

        <Echec v-if="showEchec" :title="echecTitle" :description="echecDescription" @retry="retryGame"
          @menu="goToMenu" />


      </div>

    </div>
  </div>


</template>

<script>
import MiniGame from "@/components/common/MiniGame.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import ChoiceButtons from "@/components/common/ChoiceButtons.vue";
import Timer from "@/components/layout/Timer.vue";
import MiniMap from "@/components/layout/MiniMap.vue";
import Decoration from "@/components/layout/Decoration.vue";
import Echec from "@/components/specific/Echec.vue";


// Import du store Pinia
import { useStoryStore } from "@/stores/storyStore";
import { usePlayerStore } from "@/stores/playerStore";


// Import de GSAP
import { gsap } from "gsap";

export default {
  name: "GameView",
  components: { AppHeader, Timer, ChoiceButtons, MiniMap, Decoration, MiniGame, Echec },

  data() {
    return {
      current: this.$route.params.id || "intro",
      openMiniGame: false,     // <-- your flag for showing/hiding the overlay
      // currentChapter is computed below so you can remove it from data
      showEchec: false,
      echecTitle: "DEATH TITLE",
      echecDescription: "DEATH TEXT …",
      restartChapterId: "intro", // par défaut : Acte 1 intro
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
       //  On récupère le store du joueur
         const player = usePlayerStore();

      // On modifie l'intelligence AVANT de changer de chapitre
      if (next.good === true) {
         player.bonneDecision(3); // +3 intelligence
    } 
     else if (next.good === false) {
         player.mauvaiseDecision(2); // -2 intelligence
    }
      if (next.type === "story") {
        this.$router.push({ name: "game", params: { id: next.id } });
        this.current = next.id;
        // ensure if we exit mini-game we reset the flag
        this.openMiniGame = false;
        // Si mort → afficher l'écran d'échec
        if (next.id === "clue01-02") {
          this.echecTitle = "Erreur Chronique";
          this.echecDescription =
            "Votre corps cède sous la pression de l’effondrement. Tout devient noir.";
          this.showEchec = true;
        }
      }
      else if (next.type === "game") {
        console.log("Lancer le mini-jeu :", next.id);
        console.log("openMiniGame set to true");
        this.openMiniGame = true;
      }
    },


    // MINIGAME GAMEOVER

    onMiniGameDone(result) {
      // on ferme le mini-jeu
      this.openMiniGame = false;

      // si le joueur a échoué au mini-jeu (4 mauvaises réponses)
      if (!result || !result.success) {
        this.echecTitle = "Erreur Chronique";
        this.echecDescription =
          "Une surcharge parcourt le terminal. Une décharge électrique vous traverse le corps… puis plus rien.";
        this.showEchec = true;   // 👉 affiche <Echec /> avec ce texte
      }
      // si result.success === true, on ne fait rien :
      // le joueur a réussi, tu gères déjà la suite (Acte 2)
    },

    retryGame() {
      this.showEchec = false;
      this.$router.push({ name: "game", params: { id: this.restartChapterId } });
      this.current = this.restartChapterId;
    },


    goToMenu() {
      this.showEchec = false;
      this.$router.push({ name: "home", params: { id: "" } });
      this.current = "intro";
    },

    // TEXT ANIMATION
    animateText() {
      const el = this.$refs.infoContent;
      if (!el) return;

      const rawText = this.activeChapter.text || "";

      // on vide le paragraphe
      el.innerHTML = "";

      // on recrée le texte caractère par caractère
      [...rawText].forEach((char) => {
        if (char === "\n") {
          // garde les sauts de ligne (paragraphes)
          el.appendChild(document.createElement("br"));
        } else {
          const span = document.createElement("span");
          span.textContent = char;   // on laisse les espaces normaux pour le retour à la ligne
          el.appendChild(span);
        }
      });

      const letters = el.querySelectorAll("span");

      // au cas où une ancienne anim tourne encore
      gsap.killTweensOf(letters);

      // animation “vieux PC” : lettres une par une
      gsap.fromTo(
        letters,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.02,   // vitesse de chaque lettre
          stagger: 0.03,    // délai entre lettres
          ease: "none",
        }
      );
    },
  },

  // TEXT ANIMATION
  mounted() {
    this.animateText();          // animation au chargement
  },

  watch: {
    current() {
      this.$nextTick(() => this.animateText());
      // If user navigated away, ensure mini game closed
      this.openMiniGame = false;
    },

    "$route.params.id"(newId) {  // watch route change too
      this.current = newId;
      this.openMiniGame = false;
    }
  }
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
  background: repeating-linear-gradient(to bottom,
      rgba(255, 255, 255, 0.03) 0,
      rgba(255, 255, 255, 0.03) 2px,
      rgba(0, 0, 0, 0.06) 4px);
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
.columnright>*:first-child {
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
.columnright>*:last-child {
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

/* Colonne gauche */
.columnleft {
  grid-column: 1;
  grid-row: 1 / 7;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}
</style>
