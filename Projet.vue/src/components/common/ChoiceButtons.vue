<template>
  <div class="choice-buttons">
      <!-- Boucle du tableau choice pour créer un composant NavChoice pour chaque élément -->
    <NavChoice
      v-for="(choice, idx) in choices"  
      :key="idx"
      :choice="choice"
      @choose="selectChoice"
    />
  </div>
</template>

<script>
import NavChoice from "@/components/common/NavChoice.vue";

export default {
  name: "ChoiceButtons",
  components: { NavChoice },
  props: {
    choices: {
      type: Array,
      required: true,
    },
  },
  methods: {
     // nextID` est l'identifiant du chapitre suivante
    selectChoice(nextId) {
      this.$emit("choice-selected", nextId);
    },
  },
};
</script>

<style scoped>

* {
  font-family: "Courier New", monospace;
}

.choice-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}
</style>
