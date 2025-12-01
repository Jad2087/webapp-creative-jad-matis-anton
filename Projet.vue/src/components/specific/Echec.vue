<template>
  <div class="echec-container">
    <div class="echec-box">
      <h2 class="titre">{{ title }}</h2>
      <p class="description">{{ description }}</p>

      <div class="buttons">
        <button class="btn retry" @click="$emit('retry')">Recommencer</button>

        <button class="btn menu" @click="$emit('menu')">Menu Principal</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Echec",
  props: {
    title: {
      type: String,
      default: "Erreur Chronique",
    },
    description: {
      type: String,
      default: "Informations …",
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Courier New", monospace;
}

/* Fond semi-transparent pour l’overlay */
.echec-container {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* La fenêtre rouge */
.echec-box {
  width: 480px;
  padding: 30px;
  border: 3px solid #e35e5e;
  background: #1b1b1b;
  color: #e35e5e;
}

/* Titre */
.titre {
  margin: 0 0 15px 0;
  font-size: 1.4rem;
}

/* Texte */
.description {
  margin-bottom: 30px;
  color: #e35e5e;
}

/* Boutons */
.buttons {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  border: 2px solid #e35e5e;
  background: transparent;
  color: #e35e5e;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #e35e5e;
  transform: scale(1.05);
  color: black;
}
</style>
