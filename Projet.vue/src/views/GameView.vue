<template>
  <div class="container">
    <div class="screen">
      <!-- TIMER à gauche -->
      <div class="columnleft">
        <Timer />
        <Stats />
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
        <MiniGame v-if="openMiniGame" :minigame-id="activeMiniGameId" @close="openMiniGame = false"
          @done="onMiniGameDone" />

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
import Stats from "@/components/layout/Stats.vue";
import Echec from "@/components/specific/Echec.vue";

// Import du store Pinia
import { useStoryStore } from "@/stores/storyStore";
import { usePlayerStore } from "@/stores/playerStore";

// Import de GSAP
import { gsap } from "gsap";

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
  },

  data() {
    return {
      current: this.$route.params.id || "intro",
      openMiniGame: false,
      showEchec: false,
      echecTitle: "DEATH TITLE",
      echecDescription: "DEATH TEXT …",
      restartChapterId: "intro",
      activeMiniGameId: null,

      // 🔥 textes de mort personnalisés
      deathMessages: {
        "clue01-02":
          "En tentant de vous faufiler sous les décombres, votre corps cède brusquement. Tout s'efface.",
        "clue02-02":
          "L'étagère s'écroule sur vous dans un fracas sourd. Le choc vous projette dans l'inconscience.",
        "clue03-01":
          "Une erreur de jugement — tout devient flou avant de basculer dans le vide.",
        "clue04-01":
          "Un mécanisme instable se déclenche, et la lumière s'éteint autour de vous.",
        "clue05-01":
          "Quelque chose se brise net… puis le silence.",
        "clue06-01":
          "La structure cède sans prévenir. Une dernière secousse, puis plus rien.",
        "clue07-01":
          "Votre vision se trouble — l’environnement se dissout dans l’obscurité.",
        "clue08-01":
          "Une force invisible vous stoppe net. Le froid vous envahit et tout disparaît."
      }
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
      const player = usePlayerStore();

      if (!next || !next.id) {
        console.warn("[changeChapter] next object invalide :", next);
        return;
      }

      const nextId = next.id;
      console.log("[changeChapter] ----");
      console.log("[changeChapter] Choix reçu :", next);
      console.log("[changeChapter] nextId =", nextId, "type =", next.type, "good =", next.good);

      // ----- AJOUT DES INDICES -----
      const clueAwards = {
        "clue01-01": "clue01",
        "clue02-01": "clue02",
        "clue03-02": "clue03",
        "clue04-02": "clue04",
        "clue05-02": "clue05",
        "clue06-02": "clue06",
        "clue07-02": "clue07",
        "clue08-02": "clue08"
      };

      const awardedClue = clueAwards[nextId];
      if (awardedClue) {
        console.log(
          "[changeChapter] Ajout de l'indice",
          awardedClue,
          "depuis le chapitre",
          nextId
        );
        player.addClue(awardedClue);
      }

      // ----- DÉTECTION AUTOMATIQUE DES MORTS -----
      if (next.type === "story" && next.good === false) {
        console.log("[changeChapter] MORT détectée au chapitre", nextId);
        player.incrementDeaths(1);

        const custom = this.deathMessages[nextId];
        this.echecTitle = "Erreur Chronique";
        this.echecDescription =
          custom ||
          "Votre corps cède sous la pression... puis tout devient noir.";

        this.showEchec = true;

        // (optionnel) définir où recommencer plus tard
        // this.restartChapterId = this.current;

        console.log("[changeChapter] Écran d'échec affiché");
        return; // on ne navigue pas plus loin
      }

      // ----- REDIRECTION VERS LES CHAPITRES "DÉJÀ EXPLORÉS" -----
      const dejaExplores = {
        clue01: { clue: "clue01", target: "clue01-03" },
        clue02: { clue: "clue02", target: "clue02-03" },
        clue03: { clue: "clue03", target: "clue03-03" },
        clue04: { clue: "clue04", target: "clue04-03" },
        clue05: { clue: "clue05", target: "clue05-03" },
        clue06: { clue: "clue06", target: "clue06-03" },
        clue07: { clue: "clue07", target: "clue07-03" },
        clue08: { clue: "clue08", target: "clue08-03" }
      };

      const deja = dejaExplores[nextId];
      if (deja && player.hasClue(deja.clue)) {
        console.log(
          "[changeChapter] Déjà exploré détecté pour",
          nextId,
          "→ redirection vers",
          deja.target
        );
        this.current = deja.target;
        this.$router.push({ name: "game", params: { id: deja.target } });
        this.openMiniGame = false;
        return;
      }

      // ----- NAVIGATION NORMALE : STORY -----
      if (next.type === "story") {
        console.log("[changeChapter] Navigation normale vers le chapitre", nextId);
        this.current = nextId;
        this.$router.push({ name: "game", params: { id: nextId } });
        this.openMiniGame = false;
        return;
      }

      // ----- NAVIGATION VERS UN MINI-JEU -----
      if (next.type === "game") {
        console.log("[changeChapter] Lancement du mini-jeu", nextId);
        this.activeMiniGameId = nextId;
        this.openMiniGame = true;
        return;
      }

      // ----- TYPE INCONNU -----
      console.warn(
        "[changeChapter] Type de next inconnu :",
        next.type,
        "pour",
        next
      );
    },

    // MINIGAME GAMEOVER

    onMiniGameDone(result) {
      // on ferme le mini-jeu
      this.openMiniGame = false;

      // si le joueur a échoué au mini-jeu (4 mauvaises réponses)
      if (!result || !result.success) {
        const player = usePlayerStore();
        player.reset();
        this.echecTitle = "Erreur Chronique";
        this.echecDescription =
          "Une surcharge parcourt le terminal. Une décharge électrique vous traverse le corps… puis plus rien.";
        this.showEchec = true; // 👉 affiche <Echec /> avec ce texte
      }
      // si result.success === true, on ne fait rien :
      // le joueur a réussi, tu gères déjà la suite (Acte 2)
    },

    retryGame() {
      const player = usePlayerStore(); // 🔥 add this line

      player.reset(); // 🔥 reset intelligence + clues
      this.showEchec = false;
      this.$router.push({
        name: "game",
        params: { id: this.restartChapterId },
      });
      this.current = this.restartChapterId;
    },

    goToMenu() {
      const player = usePlayerStore();

      console.log("[goToMenu] Reset du joueur et retour au menu principal");

      player.reset();
      this.showEchec = false;

      // FIX: do NOT pass params
      this.$router.push({ name: "home" });

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
          span.textContent = char; // on laisse les espaces normaux pour le retour à la ligne
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
          duration: 0.02, // vitesse de chaque lettre
          stagger: 0.03, // délai entre lettres
          ease: "none",
        }
      );
    },
  },

  // TEXT ANIMATION
  mounted() {
    this.animateText(); // animation au chargement
  },

  watch: {
    current() {
      this.$nextTick(() => this.animateText());
      // If user navigated away, ensure mini game closed
      this.openMiniGame = false;
    },

    "$route.params.id"(newId) {
      // watch route change too
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

/* ---------------------- */
/* VERSION MOBILE FULL HEIGHT + Hide Map & Border */
/* ---------------------- */
@media (max-width: 1080px) {
  .container {
    height: 100vh;
    /* prend toute la hauteur de l'écran */
    padding: 0;
  }

  .screen {
    display: flex;
    flex-direction: column;
    width: 95vw;
    height: 100%;
    /* plein écran */
    padding: 1rem;
    gap: 1rem;

    /* Effet CRT */
    transform: perspective(800px) rotateX(1.5deg) scale(1.01);

    /* Supprimer la bordure */
    border: none;
  }

  /* Barre en haut */
  .columnleft {
    order: 1;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    gap: 1rem;
    flex: 0 0 auto;
    /* hauteur automatique selon le contenu */
  }

  /* Cacher la mini-map en mobile */
  .columnleft MiniMap {
    display: none;
  }

  /* Colonne droite prend tout le reste */
  .columnright {
    order: 2;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    /* prend le reste de la hauteur */
  }

  /* Header reste en haut */
  .columnright>*:first-child {
    margin-top: 0;
  }

  /* Story-box occupe l’espace restant avant les boutons */
  .story-box {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  /* Boutons TOUJOURS visibles en bas */
  .choicebuttons {
    flex: 0 0 auto;
    position: sticky;
    bottom: 0;
    background: #111;
    padding: 0.5rem 0;
    border-top: 2px solid #03ab5e;
    z-index: 20;
  }
}
</style>
