// stores/storyStore.js
import {
  defineStore
} from 'pinia';
import chapters from '@/data/chapters.json';

export const useStoryStore = defineStore('story', {
  state: () => ({
    storyData: chapters, // contient toutes les données de l'histoire
    choicesHistory: [], // <-- stocke les choix
  }),
  actions: {
    // Ajoute un choix à l'historique
    addChoice(choice) {
      this.choicesHistory.push(choice);
    },
    // Réinitialise l'historique des choix
    resetChoices() {
      this.choicesHistory = [];
    },
  },
});