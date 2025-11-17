/* 
On importe les méthodes nécessaires depuis le module `vue-router`
pour créer et configurer le système de routage de l’application.
*/
import { createRouter, createWebHistory } from 'vue-router';

/*
On importe les différentes vues (pages) du projet.
Ici, ton application contient deux vues principales :
- HomeView : page d’accueil
- StoryView : page d’histoire ou de contenu narratif
*/
import HomeView from '../views/HomeView.vue';
import IntroView from '../views/IntroView.vue';
import GameView from '../views/GameView.vue';
/*
Définition des routes dans un tableau d’objets.
Chaque objet correspond à une "page" de l’application.
*/
const routes = [
  {
    path: '/', // (obligatoire) Partie de l’URL qui identifie la page
    component: HomeView, // (obligatoire) Composant (View) à afficher
    name: 'home' // (optionnel) Nom interne de la route (utile pour router.push({ name: 'home' }))
  },
  {
    path: '/intro', // Chemin pour accéder à la page Story
    component: IntroView,
    name: 'intro'
  },
  {
    path: '/game/:id', // ← ici on ajoute ":id" en optionnel
    component: GameView,
    name: 'game',
    props: true         // pour récupérer id via props si tu veux
  },
  
];

/*
Création du routeur grâce à la méthode `createRouter`.
On y définit :
- le mode d’historique (ici : `createWebHistory`)
- la liste des routes définies ci-dessus
*/
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

/*
On exporte le routeur pour pouvoir l’utiliser dans `main.js`.
Cela permettra d’activer le système de navigation dans l’app.
*/
export default router;
