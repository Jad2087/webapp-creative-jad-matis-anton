<template>
  <div class="minimap-container">
    <p class="minimap-title">Mini Map</p>
    <!-- Ici tu peux ajouter ton contenu de carte / icônes / points -->
    <div class="minimap-content">
      <!-- Placeholder -->
      <div class="map-point">●</div>
      <div class="map-point">●</div>
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
.minimap-container {
  border: 3px solid #ffffff;
  border-radius: 8px;
  background-color: #111;
  padding: 0.8rem;
  margin-top: 1rem;     
  width: 100%;
  height: 150px;         
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
}

.minimap-title {
  color: #03AB5E;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
  font-size: 1rem;
}

.minimap-content {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.map-point {
  color: #03AB5E;
  font-size: 1.2rem;
}
</style>
