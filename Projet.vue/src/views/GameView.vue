<template>
  <div class="container">
    <div class="screen">
      <!-- TIMER à gauche -->
      <div class="columnleft">
        <Timer @timeout="killPlayerByOxygen" />
        <Stats />
        <MiniMap :currentChapterId="current" />
      </div>

      <!-- Contenu droit -->
      <div class="columnright">
        <AppHeader :clickAudio="clickAudio" :hoverAudio="hoverAudio" />

        <!-- Bloc texte du chapitre -->
        <div class="story-box">
          <p class="info-title">{{ activeChapter.title }}</p>
          <p class="info-content" ref="infoContent"></p>
        </div>

        <!-- Choices -->
        <ChoiceButtons :choices="activeChapter.choices" @choice-selected="changeChapter" @hover-choice="playHover"
          class="choicebuttons" />

        <!-- MiniGame overlay -->
        <MiniGame v-if="openMiniGame" :minigame-id="activeMiniGameId" @close="openMiniGame = false"
          @done="onMiniGameDone" />

        <!-- ECHEC -->
        <Echec v-if="showEchec" :title="echecTitle" :description="echecDescription" @retry="retryGame"
          @menu="goToMenu" />

        <!-- REUSSITE -->
        <Reussite v-if="showReussite" :title="reussiteTitle" :description="reussiteDescription" @menu="goToMenu"
          @historique="showHistory = true" />

        <ChoiceMade v-if="showHistory" class="overlay" @close="showHistory = false" />
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
import Stats from "@/components/layout/Stats.vue";
import Echec from "@/components/specific/Echec.vue";
import ChoiceMade from "@/components/specific/ChoiceMade.vue";
import Reussite from "@/components/specific/Reussite.vue";

import { useStoryStore } from "@/stores/storyStore";
import { usePlayerStore } from "@/stores/playerStore";
import { gsap } from "gsap";

// SOUNDS
import clickSound from "@/Sounds/futuristic_click.mp3";
import hoverSound from "@/Sounds/futuristic_hover.mp3";
import deathSound from "@/Sounds/error_sound.mp3";
import successSound from "@/Sounds/win_sound.mp3";
import backgroundMusic from "@/Sounds/background_music.mp3";
import typingSoundFile from "@/Sounds/texte_typing.mp3";

export default {
  name: "GameView",
  components: {
    AppHeader,
    Timer,
    ChoiceButtons,
    MiniMap,
    Stats,
    MiniGame,
    Echec,
    ChoiceMade,
    Reussite,
  },

  data() {
    return {
      current: this.$route.params.id || "intro",
      openMiniGame: false,

      // MODALES
      showEchec: false,
      showReussite: false,
      showHistory: false,

      // ECHEC & REUSSITE TEXTES
      reussiteTitle: "",
      reussiteDescription: "",
      echecTitle: "DEATH TITLE",
      echecDescription: "DEATH TEXT …",
      restartChapterId: "intro",

      // MINIJEUX
      activeMiniGameId: null,

      // ANIMATION
      animatedChapters: [],

      // AUDIOS
      clickAudio: null,
      hoverAudio: null,
      deathAudio: null,
      successAudio: null,
      bgAudio: null,
      typingAudio: null,

      // CUSTOM MESSAGES
      deathMessages: {},
      endingMessages: {},
    };
  },

  created() {
    // Pré-chargement sons
    this.clickAudio = new Audio(clickSound);
    this.clickAudio.load();

    this.hoverAudio = new Audio(hoverSound);
    this.hoverAudio.load();

    this.deathAudio = new Audio(deathSound);
    this.deathAudio.load();

    this.successAudio = new Audio(successSound);
    this.successAudio.load();

    this.bgAudio = new Audio(backgroundMusic);
    this.bgAudio.loop = true;
    this.bgAudio.volume = 0.4;
    this.bgAudio.load();
    this.bgAudio.isPlaying = false;

    this.typingAudio = new Audio(typingSoundFile);
    this.typingAudio.loop = true;
    this.typingAudio.volume = 0.9;
    this.typingAudio.load();
  },

  computed: {
    storyStore() {
      return useStoryStore();
    },
    activeChapter() {
      return (
        this.storyStore.storyData.find((chap) => chap.id === this.current) || {
          choices: [],
        }
      );
    },
  },

  methods: {
    /* ------------------------ SONS ------------------------ */
    playClick() {
      if (this.clickAudio) {
        this.clickAudio.currentTime = 0;
        this.clickAudio.play();
      }
    },
    playHover() {
      if (this.hoverAudio) {
        this.hoverAudio.currentTime = 0;
        this.hoverAudio.play();
      }
    },
    playDeath() {
      if (this.deathAudio) {
        this.deathAudio.currentTime = 0;
        this.deathAudio.play();
      }
      this.stopBackgroundMusic();
      this.stopTypingAudio();
    },
    playSuccess() {
      if (this.successAudio) {
        this.successAudio.currentTime = 0;
        this.successAudio.play();
      }
      this.stopBackgroundMusic();
      this.stopTypingAudio();
    },

    playBackgroundMusic() {
      if (this.bgAudio && !this.bgAudio.isPlaying) {
        this.bgAudio.currentTime = 0;
        this.bgAudio.play();
        this.bgAudio.isPlaying = true;
      }
    },

    stopBackgroundMusic() {
      if (this.bgAudio) {
        this.bgAudio.pause();
        this.bgAudio.currentTime = 0;
        this.bgAudio.isPlaying = false;
      }
    },

    stopTypingAudio() {
      if (this.typingAudio) {
        this.typingAudio.pause();
        this.typingAudio.currentTime = 0;
      }
    },

    /* ------------------- CHANGEMENT DE CHAPITRE ------------------- */
    changeChapter(next, choiceText) {
      this.playClick();

      const storyStore = useStoryStore();
      const player = usePlayerStore();

      const lastChoice = storyStore.choicesHistory.slice(-1)[0];
      if (lastChoice !== choiceText) storyStore.addChoice(choiceText);

      const nextId = next.id;

      // Récompense indices
      const clueAwards = {
        // Act 1
        "clue01-01": "clue01",
        "clue02-01": "clue02",

        // Act 2
        "clue03-02": "clue03",
        "clue04-02": "clue04",
        "clue07-02": "clue07",
        "clue08-02": "clue08",
        "clue09-02": "clue09",
        "clue10-02": "clue10",
        "clue100-01": "clue100",
        "clue111-02": "clue111",
        "engine04-success": "engine01",

      };

      // Award from chapter JSON itself
if (next.award) {
  player.addClue(next.award);
}


      const awardedClue = clueAwards[nextId];
      if (awardedClue) player.addClue(awardedClue);

      // ----- MORT -----
      if (next.type === "story" && next.good === false) {
        player.incrementDeaths(1);
        const custom = this.deathMessages[nextId];

        this.echecTitle = "Erreur Chronique";
        this.echecDescription =
          custom ||
          "Votre corps cède sous la pression... puis tout devient noir.";

        this.showEchec = true;
        this.playDeath();
        return;
      }

      // Passage normal
      if (next.type === "story") {
        this.current = nextId;
        this.$router.push({ name: "game", params: { id: nextId } });
        this.openMiniGame = false;
        return;
      }

      // Mini-jeu
      if (next.type === "game") {
        this.activeMiniGameId = nextId;
        this.openMiniGame = true;
        return;
      }

      // Ending
      if (nextId.startsWith("ending")) {
        const ending = this.endingMessages[nextId];
        this.reussiteTitle = ending ? ending.title : "Fin";
        this.reussiteDescription = ending
          ? ending.description
          : "Vous avez atteint une fin du jeu.";
        this.showReussite = true;
        this.$nextTick(() => this.playSuccess());
      }
    },

    

    /* ----------------------- MORT PAR OXYGENE ----------------------- */
    killPlayerByOxygen() {
      const player = usePlayerStore();
      player.incrementDeaths(1);

      this.echecTitle = "Oxygène épuisé";
      this.echecDescription =
        "Votre vision se trouble... l’air manque... puis tout devient noir.";

      this.showEchec = true;
      this.playDeath();
    },

    /* ----------------------- FIN MINI-JEU ----------------------- */
    onMiniGameDone(result) {
      this.openMiniGame = false;

      if (result && result.success) {
        if (this.activeMiniGameId === "minigame08") {
          this.showReussite = true;
          this.reussiteTarget = result.target;
          return;
        }
        this.changeChapter({ type: "story", id: result.target, good: true });
      } else {
        const player = usePlayerStore();
        player.reset();

        this.echecTitle = "Erreur Chronique";
        this.echecDescription =
          "Une surcharge parcourt le terminal... puis plus rien.";

        this.showEchec = true;
        this.playDeath();
      }
    },

    /* ---------------------------- RETRY ---------------------------- */
    retryGame() {
      const player = usePlayerStore();
      const storyStore = useStoryStore();

      player.reset();
      storyStore.resetChoices();

      this.showEchec = false;
      this.current = this.restartChapterId;

      this.$router.push({
        name: "game",
        params: { id: this.restartChapterId },
      });

      this.playBackgroundMusic();
    },

    goToMenu() {
      const player = usePlayerStore();
      player.reset();
      this.showEchec = false;
      this.showReussite = false;
      this.current = "intro";
      this.$router.push({ name: "home" });

      // Stop tous les sons spécifiques au GameView
      this.stopBackgroundMusic();
      this.stopTypingAudio();
    },

    /* ----------------------- ANIMATION TEXTE ----------------------- */
    animateText() {
      const el = this.$refs.infoContent;
      if (!el) return;

      const rawText = this.activeChapter.text || "";

      if (this.animatedChapters.includes(this.current)) {
        el.innerHTML = rawText.replace(/\n/g, "<br>");
        return;
      }

      el.innerHTML = "";
      [...rawText].forEach((char) => {
        if (char === "\n") el.appendChild(document.createElement("br"));
        else {
          const span = document.createElement("span");
          span.textContent = char;
          el.appendChild(span);
        }
      });

      const letters = el.querySelectorAll("span");

      // Démarre le son de frappe
      if (this.typingAudio) this.typingAudio.play();

      gsap.killTweensOf(letters);

      gsap.fromTo(
        letters,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.02,
          stagger: 0.02,
          ease: "none",
          onComplete: () => {
            // Stoppe le son quand l'animation est finie
            this.stopTypingAudio();
          },
        }
      );

      this.animatedChapters.push(this.current);
    },
  },

  mounted() {
    this.playBackgroundMusic(); // lance la musique une seule fois
    this.animateText();
  },

  beforeUnmount() {
    // stop tous les sons quand on quitte GameView
    this.stopBackgroundMusic();
    this.stopTypingAudio();
  },

  watch: {
    current() {
      this.$nextTick(() => this.animateText());
      this.openMiniGame = false;
    },
    "$route.params.id"(newId) {
      this.current = newId;
      this.openMiniGame = false;
    },
    "$route.name"(newVal) {
      if (newVal === "home") {
        this.stopBackgroundMusic();
        this.stopTypingAudio();
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Courier New", monospace;
}

/* Overlay général au-dessus de Reussite */
.overlay {
  position: absolute;
  width: 500px;
  top: 72%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Container et screen restent inchangés */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("@/Images/space_background.png");
  /* mets ton chemin ici */
  background-size: cover;
  /* prend tout l'écran */
  background-position: center;
  /* centré */
  background-repeat: no-repeat;
}

.screen {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(6, 1fr);
  column-gap: 1rem;
  width: 900px;
  height: 600px;
  padding: 2rem 2rem;
  background-color: rgb(17, 17, 17);
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

  box-shadow: 0 0 25px 5px rgba(3, 171, 94, 0.5),
    /* halo vert */
    0 0 60px 15px rgba(0, 0, 0, 0.9),
    /* ombre profonde */
    inset 0 0 20px rgba(0, 0, 0, 0.7),
    /* ombre interne pour effet vitre */
    inset 0 0 40px rgba(3, 171, 94, 0.15);
  /* lueur interne légère */
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

@media (max-width: 1080px) {

  /* Permet à la page de scroller normalement */
  html,
  body {
    padding: 0;
    margin: 0;
    height: auto;
    /* NE PAS forcer 100dvh */
    min-height: 100dvh;
    overflow-y: auto;
  }

  .container {
    width: 100%;
    min-height: 100dvh;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: stretch;
    /* important */
  }

  .screen {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: auto;
    /* height fixe */
    min-height: 100dvh;
    /* autorise l’agrandissement */

    padding: 1rem;
    gap: 1rem;

    border: none;
    border-radius: 0;

    overflow: visible;
    /* indispensable */
    transform: none;
    animation: none;
  }

  .columnright {
    flex: 1;
    display: flex;
    flex-direction: column;

    height: auto;
    min-height: 0;
  }

  .story-box {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
  }

  .choicebuttons {
    flex-shrink: 0;
    margin-top: 1rem;
    width: 100%;
  }
}
</style>
