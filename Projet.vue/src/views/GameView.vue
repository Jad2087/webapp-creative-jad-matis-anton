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
        <ChoiceButtons
          :choices="activeChapter.choices"
          @choice-selected="changeChapter"
          @hover-choice="playHover"
          class="choicebuttons"
        />

        <!-- MiniGame overlay -->
        <MiniGame
          v-if="openMiniGame"
          :minigame-id="activeMiniGameId"
          @close="openMiniGame = false"
          @done="onMiniGameDone"
        />

        <Echec
          v-if="showEchec"
          :title="echecTitle"
          :description="echecDescription"
          @retry="retryGame"
          @menu="goToMenu"
        />

        <Reussite
          v-if="showReussite"
          :title="reussiteTitle"
          :description="reussiteDescription"
          @menu="goToMenu"
          @historique="showHistory = true"
        />

        <ChoiceMade
          v-if="showHistory"
          class="overlay"
          @close="showHistory = false"
        />
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

// Import des sons
import clickSound from "@/Sounds/futuristic_click.mp3"; // import du son
import hoverSound from "@/Sounds/futuristic_hover.mp3";

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
      showEchec: false,
      showReussite: false,
      reussiteTitle: "",
      reussiteDescription: "",
      reussiteTarget: null,
      echecTitle: "DEATH TITLE",
      echecDescription: "DEATH TEXT …",
      restartChapterId: "intro",
      activeMiniGameId: null,
      animatedChapters: [],
      clickAudio: null,
      hoverAudio: null,
      deathMessages: {
        /* ton objet deathMessages complet ici */
      },
      endingMessages: {
        /* ton objet endingMessages complet ici */
      },
    };
  },

  created() {
    this.current = this.$route.params.id;

    // Précharger les sons
    this.clickAudio = new Audio(clickSound);
    this.clickAudio.load();

    this.hoverAudio = new Audio(hoverSound);
    this.hoverAudio.load();
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
    // Sons
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

    // Change de chapitre
    changeChapter(next, choiceText) {
      this.playClick(); // joue le son au clic
      const storyStore = useStoryStore();
      const player = usePlayerStore();

      // Ajout dans l'historique
      const lastChoice = storyStore.choicesHistory.slice(-1)[0];
      if (lastChoice !== choiceText) {
        storyStore.addChoice(choiceText);
      }

      const nextId = next.id;

      // Gestion des indices
      const clueAwards = {
        "clue01-01": "clue01",
        "clue02-01": "clue02",
        // ... tes autres indices
      };
      const awardedClue = clueAwards[nextId];
      if (awardedClue) player.addClue(awardedClue);

      // Détection des morts
      if (next.type === "story" && next.good === false) {
        player.incrementDeaths(1);
        const custom = this.deathMessages[nextId];
        this.echecTitle = "Erreur Chronique";
        this.echecDescription =
          custom ||
          "Votre corps cède sous la pression... puis tout devient noir.";
        this.showEchec = true;
        return;
      }

      // Navigation normale ou mini-jeu
      if (next.type === "story") {
        this.current = nextId;
        this.$router.push({ name: "game", params: { id: nextId } });
        this.openMiniGame = false;
        return;
      }
      if (next.type === "game") {
        this.activeMiniGameId = nextId;
        this.openMiniGame = true;
        return;
      }

      // Fin secrète
      if (nextId.startsWith("ending")) {
        const ending = this.endingMessages[nextId];
        this.reussiteTitle = ending ? ending.title : "Fin";
        this.reussiteDescription = ending
          ? ending.description
          : "Vous avez atteint une fin du jeu.";
        this.showReussite = true;
      }
    },

    killPlayerByOxygen() {
      const player = usePlayerStore();
      player.incrementDeaths(1);
      this.echecTitle = "Oxygène épuisé";
      this.echecDescription =
        "Votre vision se trouble... l’air manque... puis tout devient noir.";
      this.showEchec = true;
    },

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
      }
    },

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
    },

    goToMenu() {
      const player = usePlayerStore();
      player.reset();
      this.showEchec = false;
      this.current = "intro";
      this.$router.push({ name: "home" });
    },

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
      gsap.killTweensOf(letters);
      gsap.fromTo(
        letters,
        { opacity: 0 },
        { opacity: 1, duration: 0.02, stagger: 0.02, ease: "none" }
      );

      this.animatedChapters.push(this.current);
    },
  },

  mounted() {
    this.animateText();
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
  column-gap: 1.5rem;
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
    /* halo vert */ 0 0 60px 15px rgba(0, 0, 0, 0.9),
    /* ombre profonde */ inset 0 0 20px rgba(0, 0, 0, 0.7),
    /* ombre interne pour effet vitre */ inset 0 0 40px rgba(3, 171, 94, 0.15);
  /* lueur interne légère */
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
  /* IMPORTANT : forces le viewport mobile correct */
  html,
  body {
    padding: 0;
    margin: 0;
    height: 100dvh;
    overflow: hidden;
    /* évite que 100% casse */
  }

  .container {
    width: 100%;
    height: 100vh;
    /* plein écran réel */
    padding: 0;
    margin: 0;
    display: flex;
  }

  .screen {
    display: flex;
    flex-direction: column;
    width: 95vw;
    height: 100dvh;
    padding: 1rem;
    gap: 1rem;
    justify-content: flex-start;

    border: none;
    border-radius: 0;
    transform: none;
    animation: none;
  }

  .columnright {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .story-box {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    /* IMPORTANT pour autoriser le scroll */
  }

  .choicebuttons {
    flex-shrink: 0;
    padding-top: 1rem;
    width: 100%;
    margin-top: auto;
  }
}
</style>
