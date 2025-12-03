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
        <!-- Header -->
        <AppHeader />

        <!-- Bloc texte du chapitre -->
        <div class="story-box">
          <p class="info-title">{{ activeChapter.title }}</p>

          <!-- <p class="info-content">{{ activeChapter.text }}</p> -->
          <p class="info-content" ref="infoContent"></p>
        </div>

        <!-- Choices show up as buttons from ChoiceButtons component -->
        <ChoiceButtons
          :choices="activeChapter.choices"
          @choice-selected="changeChapter"
          class="choicebuttons"
        />

        <!-- MiniGame overlay component, shown only when openMiniGame is true -->
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

        <!-- Réussite overlay -->
        <Reussite
          v-if="showReussite"
          @menu="goToMenu"
          @historique="showHistory = true"
        />

        <!-- Historique overlay par-dessus Réussite -->
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
// Import des composantes
import MiniGame from "@/components/common/MiniGame.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import ChoiceButtons from "@/components/common/ChoiceButtons.vue";
import Timer from "@/components/layout/Timer.vue";
import MiniMap from "@/components/layout/MiniMap.vue";
import Stats from "@/components/layout/Stats.vue";
import Echec from "@/components/specific/Echec.vue";
import ChoiceMade from "@/components/specific/ChoiceMade.vue";
import Reussite from "@/components/specific/Reussite.vue";

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
    ChoiceMade,
    Reussite,
  },

  data() {
    return {
      current: this.$route.params.id || "intro",
      openMiniGame: false,
      showEchec: false,
      showReussite: false,
      reussiteTarget: null,
      echecTitle: "DEATH TITLE",
      echecDescription: "DEATH TEXT …",
      restartChapterId: "intro",
      activeMiniGameId: null,

      // textes de mort personnalisés
      deathMessages: {
  "clue01-02":
    "Vous attrapez le bras du corps pour tenter de le dégager. Le métal au-dessus de vous gémit… un craquement sec retentit. Avant que vous puissiez réagir, la structure cède et tout devient noir.",

  "clue02-02":
    "Vous avancez dans la flaque noire.\n\nLe liquide visqueux se colle à vos pieds et vous immobilise peu à peu. Votre vision se trouble… puis tout disparaît.",

  "clue03-01":
    "Un souffle de gaz s’échappe derrière vous. Une étincelle jaillit d’un appareil renversé — un flash de lumière, puis tout s’éteint instantanément.",

  "clue04-01":
    "Votre pied touche l’eau inondée. Un bourdonnement soudain envahit la pièce — puis votre esprit sombre dans le noir.",

  "clue05-01":
    "Un bruit sec résonne derrière vous. La structure cède brusquement — puis tout disparaît dans un flou silencieux.",

  "clue06-01":
    "Le sol se dérobe sous vos pieds. Une secousse brusque vous projette dans l’obscurité totale, sans laisser le temps de réagir.",

  "clue07-01":
    "Une vibration étrange envahit la zone. Votre vision se brouille… puis tout s’efface dans un noir profond.",

  "clue08-01":
    "Un souffle glacial vous fige sur place. Le monde se dissout dans l’obscurité, sans un son.",

    "ventA1-death": 
  "Le métal sous vous vibre… puis se déchire d’un seul coup. Vous basculez dans le vide avant de comprendre ce qu’il se passe.",

  "vent-slither":
  "Un bruit humide se rapproche dans le noir. Avant même que vous puissiez reculer, quelque chose de glissant s’enroule autour de votre jambe et vous tire violemment dans l’obscurité. Vous n’avez même pas le temps de crier.",

"vent-fans-button-death":
  "Vous appuyez sur le bouton. Les ventilateurs ralentissent… puis redémarrent d’un coup. Les pales vous happent à pleine vitesse, sans vous laisser la moindre chance.",

  "ventDeep-greenDeath":
  "La rouille se brise sous vous. Le conduit s’effondre d’un coup, et vous tombez dans le vide sans pouvoir vous rattraper.",

  "ventDeep-blackDeath":
  "Dans l’obscurité totale, vous perdez le sens de l’orientation. Épuisé et désorienté, vous finissez par vous effondrer, incapable de retrouver la sortie.",

  "clue07-01":
  "Votre saut dévie d’un simple centimètre. La substance noire agrippe votre jambe, remonte le long de votre corps et vous immobilise avant que vous ne puissiez atteindre la porte.",


},

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
      const player = usePlayerStore(); // On récupère le store du joueur (pinia)
      const storyStore = useStoryStore(); // On récupère le store de l'histoire (pinia)

      // Vérifie que "next" existe et qu'il contient un id valide
      if (!next || !next.id) {
        console.warn("[changeChapter] next object invalide :", next);
        return;
      }
      // récupère id du prochain chapitre
      const nextId = next.id;
      // ajoute id à historique des choix dans le store
      storyStore.addChoice(nextId);

      console.log("[changeChapter] ----");
      console.log("[changeChapter] Choix reçu :", next);
      console.log(
        "[changeChapter] nextId =",
        nextId,
        "type =",
        next.type,
        "good =",
        next.good
      );

      // AJOUT DES INDICES
      const clueAwards = {
        "clue01-01": "clue01",
        "clue02-01": "clue02",
        "clue03-02": "clue03",
        "clue04-02": "clue04",
        "clue05-02": "clue05",
        "clue06-02": "clue06",
        "clue07-02": "clue07",
        "clue08-02": "clue08",
        "clue09-02": "clue09",
        "clue10-02": "clue10",
        "engine04-success": "engine",
        "clue100-01": "clue100",
"clue111-02": "clue111",


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

      // DÉTECTION AUTOMATIQUE DES MORTS
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

      // REDIRECTION VERS LES CHAPITRES "DÉJÀ EXPLORÉS"
      const dejaExplores = {
        clue01: { clue: "clue01", target: "clue01-03" },
        clue02: { clue: "clue02", target: "clue02-03" },
        clue03: { clue: "clue03", target: "clue03-03" },
        clue04: { clue: "clue04", target: "clue04-03" },
        clue05: { clue: "clue05", target: "clue05-03" },
        clue06: { clue: "clue06", target: "clue06-03" },
        clue07: { clue: "clue07", target: "clue07-03" },
        clue08: { clue: "clue08", target: "clue08-03" },
        clue09: { clue: "clue09", target: "clue09-03" },
        clue10: { clue: "clue10", target: "clue10-03" },
        engine01: { clue: "engine", target: "engine01-03" },
        clue100: { clue: "clue100", target: "clue100-03" },
clue111: { clue: "clue111", target: "clue111-03" },

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

      if (nextId === "engine04-success") {
        player.addClue("engine");
      }

      // FIN SECRÈTE — déclenche Réussite.vue
      if (nextId === "ending") {
        console.log("[changeChapter] Fin secrète détectée");
        this.showReussite = true;
        return;
      }

      if (nextId === "ending-cryo") {
  this.showReussite = true;
  return;
}


      // NAVIGATION NORMALE : STORY
      if (next.type === "story") {
        console.log(
          "[changeChapter] Navigation normale vers le chapitre",
          nextId
        );
        this.current = nextId;
        this.$router.push({ name: "game", params: { id: nextId } });
        this.openMiniGame = false;
        return;
      }

      // NAVIGATION VERS UN MINI-JEU
      if (next.type === "game") {
        console.log("[changeChapter] Lancement du mini-jeu", nextId);
        this.activeMiniGameId = nextId;
        this.openMiniGame = true;
        return;
      }

      // TYPE INCONNU
      console.warn(
        "[changeChapter] Type de next inconnu :",
        next.type,
        "pour",
        next
      );
    },

    // MORT OXYGEN
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
        // Si c'est minigame08 → afficher Reussite.vue
        if (this.activeMiniGameId === "minigame08") {
          this.showReussite = true;
          this.reussiteTarget = result.target; // souvent FINALE
          return;
        }

        // sinon navigation normale
        this.changeChapter({
          type: "story",
          id: result.target,
          good: true,
        });

        return;
      }

      // 2. FAILURE → death screen
      const player = usePlayerStore();
      player.reset();

      this.echecTitle = "Erreur Chronique";
      this.echecDescription =
        "Une surcharge parcourt le terminal. Une décharge électrique vous traverse le corps… puis plus rien.";

      this.showEchec = true;
    },

    retryGame() {
      const player = usePlayerStore(); //add this line

      if (this.activeMiniGameId === "minigame08") {
        // Naviguer vers EndingView
        this.$router.push({ name: "ending" }); // assuming your route name is "ending"
        return;
      }

      player.reset(); // reset intelligence + clues
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
          stagger: 0.02, // délai entre lettres
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
  background-image: url("/src/Images/space_background.png"); /* mets ton chemin ici */
  background-size: cover; /* prend tout l'écran */
  background-position: center; /* centré */
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
    /* ombre interne pour effet vitre */ inset 0 0 40px rgba(3, 171, 94, 0.15); /* lueur interne légère */
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
    min-height: 0; /* IMPORTANT pour autoriser le scroll */
  }

  .choicebuttons {
    flex-shrink: 0;
    padding-top: 1rem;
    width: 100%;
    margin-top: auto;
  }
}
</style>
