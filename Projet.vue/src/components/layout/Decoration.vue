<template>
  <div class="decoration-container">
    <div class="green-square">
      <div class="intelligence-display">
        <div class="title">INTELLIGENCE</div>
        <div class="value">{{ player.intelligence }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePlayerStore } from "@/stores/playerStore";

export default {
  name: "Decoration",
  setup() {
    const player = usePlayerStore(); // récupérer le store
    return { player };               // exposer au template
  },
};
</script>

<style scoped>
/* Container global */
.decoration-container {
  width: 100%;
  height: 150px;   
  border: 2px solid #03ab5e;
  background-color: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex: 0 0 auto;  
}

/* Carré vert animé */
.green-square {
  width: 120px;
  height: 80px;
  background-color: #03ab5e;
  color: black;          
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: pulse 2s infinite;
  will-change: transform;
  border-radius: 8px;
}

/* Affichage du titre + valeur */
.intelligence-display {
  text-align: center;
}

.title {
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.value {
  font-size: 20px;
  font-weight: bold;
}

/* Animation pulse */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>
