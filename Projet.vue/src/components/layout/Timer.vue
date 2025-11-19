<template>
  <div class="timer-container">
    <div class="label">Timer</div>

    <!-- Barre contenant les segments -->
    <div class="bars">
      <div
        v-for="(bar, index) in totalBars"
        :key="index"
        class="bar"
        :class="{ active: index < activeBars }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",

  data() {
    return {
      duration: 5 * 60, // 5 minutes en secondes
      elapsed: 0,
      totalBars: 8, // nombre de segments affichés comme sur l’image
    };
  },

  computed: {
     // Calcule le nombre de segments activé d'une barre
    // nombre de segments activés en fonction du progrès
    activeBars() {
      return Math.floor((this.elapsed / this.duration) * this.totalBars);
    },
  },

  mounted() {
    // lorsque le composant est monté ca on le timer
    this.startTimer();
  },

  methods: {
      // démarre le timer qui incrémente `elapsed` toutes les secondes
    startTimer() {
      this.interval = setInterval(() => {
        if (this.elapsed < this.duration) {
          this.elapsed++; // ca augmente le temps écoulé d'une seconde
        } else {
          clearInterval(this.interval); // si le temps est écoulé ca arrête le timer
        }
      }, 1000); // intervalle de 1000 ms = 1 seconde
    },
  },

  beforeUnmount() {
     // avant que le composant soit détruit ca nettoie l'intervalle
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
/* Timer fixe */
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
  min-height: 85px; /* hauteur fixe */
  flex: 0 0 auto;  /* ne s'étire pas */
}

.label {
  color: #03ab5e;
  font-family: monospace;
  font-size: 20px;
  margin: 0; /* plus de margin-bottom */
  text-align: left; /* pas centré */
  min-width: 80px; /* pour éviter que ça bouge */
}

.bars {
  display: flex;
  gap: 4px;
}

.bar {
  width: 12px; /* plus petit */
  height: 40px; /* plus petit */
  background: #222;
  border: 2px solid #555;
}

.bar.active {
  background: #d6d6d6;
}
</style>
