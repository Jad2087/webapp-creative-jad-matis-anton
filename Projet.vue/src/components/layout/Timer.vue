<template>
  <div class="timer-container">
    <div class="label">Oxygène</div>

    <!-- Barre contenant les segments -->
    <div class="bars">
      <!-- crée autant de segments qu'il y a de barres -->
      <div v-for="(bar, index) in totalBars" :key="index" class="bar" :class="{ active: index < remainingBars }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    duration: { type: Number, default: 10 } // durée en secondes
  },
  data() {
    return {
      elapsed: 0, // temps écoulé depuis le début du timer
      totalBars: 8, // nb de segments affichés dans la barre
      interval: null // pour pouvoir l'arrêter
    };
  },
  computed: {
    // Calcule combien de barres doivent rester 
    remainingBars() {
      const progress = this.elapsed / this.duration;
      // retire les barres au temps écoulé
      return Math.max(this.totalBars - Math.floor(progress * this.totalBars), 0);
    },
    // Pourcentage complet écoulé
    percent() {
      return Math.min((this.elapsed / this.duration) * 100, 100);
    }
  },
  mounted() {
    // démarre le timer quand le composant est affiché
    this.startTimer();
  },
  methods: {
    // Démarrage du timer
    startTimer() {
      if (this.interval) return; // déjà démarré
      //incrémente chaque seconde
      this.interval = setInterval(() => {
        if (this.elapsed < this.duration) {
          this.elapsed++;
        } else {
          this.stopTimer(); // arrête l'intervalle
          this.$emit("timeout"); // notifie GameView
        }
      }, 1000);
    },
    // Arrêt du timer
    stopTimer() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    // Remise à zéro du timer 
    resetTimer() {
      this.stopTimer();
      this.elapsed = 0;
    }
  },
  beforeUnmount() {
    // Nettoyage si le composant est retiré
    this.stopTimer();
  }
};
</script>

<style scoped>
* {
  font-family: "Courier New", monospace;
}

.timer-container {
  border: 2px solid #ffffff;
  padding: 1rem;
  background-color: #111;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 73px;
}

.label {
  color: #03ab5e;
  font-size: 18px;
  font-weight: bold;
  min-width: 80px;
}

.bars {
  display: flex;
  gap: 4px;
  margin-left: auto;
  /* pousse les barres complètement à droite */
}

.bar {
  width: 12px;
  height: 34px;
  background: #222;
  border: 2px solid #555;
}

.bar.active {
  background: #d6d6d6;
}

/* Version mobile */
@media (max-width: 1080px) {
  .timer-container {
    padding: 0.5rem;
    min-height: 70px;
    gap: 10px;
  }
}
</style>
