<template>
  <div class="minimap-container">
    <p class="minimap-title">Mini Map</p>
    <div class="minimap-content">
      <div class="map-point">●</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniMap",
};
</script>

<style scoped>

/* MiniMap flexible */
.minimap-container {
  border: 2px solid #ffffff;
  background-color: #111;
  padding: 0.8rem;
  margin-top: 0;   
  width: 100%;
  flex: 1 1 auto;  /* prend tout l'espace restant */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
}

.minimap-title {
  color: #03ab5e;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
  font-size: 1rem;
}

.minimap-content {
  flex: 1;  
  width: 100%;
  display: flex;
  flex-direction: column;  
  justify-content: space-around; 
  align-items: center;
}

.map-point {
  color: #03ab5e;
  font-size: 1.2rem;
}
</style>
