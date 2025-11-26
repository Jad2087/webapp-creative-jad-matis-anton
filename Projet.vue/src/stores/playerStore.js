import {
  defineStore
} from 'pinia';

export const usePlayerStore = defineStore('player', {
  state: () => ({
    intelligence: 50,

    // 🔥 Clue already found
    cluesFound: []
  }),
  actions: {
    bonneDecision(points = 1) {
      this.intelligence += points;
    },
    mauvaiseDecision(points = 1) {
      this.intelligence -= points;
    },

    // 🔥 Clue already found
    addClue(id) {
      if (!this.cluesFound.includes(id)) {
        this.cluesFound.push(id);
      }
    },

    // 🔥 Clue already found
    hasClue(id) {
      return this.cluesFound.includes(id);
    },

    // 🔥 Reset complet quand on recommence la partie
    reset() {
      this.intelligence = 50;
      this.cluesFound = [];
    }
  },
});