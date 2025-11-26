import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('player', {
  state: () => ({
    deaths: 0,
    flags: {},       // compteur pour chaque indice
    cluesFound: [],  // liste des indices déjà trouvés
  }),
  actions: {
    // Ajouter un indice
    addClue(id) {
      // incrémente le compteur
      if (!this.flags[id]) this.flags[id] = 0;
      this.flags[id] += 1;

      // ajoute à la liste des indices uniques
      if (!this.cluesFound.includes(id)) {
        this.cluesFound.push(id);
      }
    },

    // Vérifie si l’indice a déjà été trouvé
    hasClue(id) {
      return this.cluesFound.includes(id);
    },

    // Ajouter une mort
    incrementDeaths(count = 1) {
      this.deaths += count;
    },

    // Reset complet du store
    reset() {
      this.flags = {};
      this.cluesFound = [];
    },
  },
});
