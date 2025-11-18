# Documenter vos routes dans ROUTES.md

# Créer un fichier ROUTES.md
# Pour chaque route, lister: path, name, composant (la view) et une description

---



## Route 1 – Page d’accueil

- **path** : `/`
- **name** : `home`
- **composant (view)** : `HomeView`

- **Description** :  
  Page d’accueil de l’application. Affiche le titre *Codex* et un bouton **« Commencer »**.  
  Quand l’utilisateur clique sur le bouton, la méthode `startStory()` redirige vers la route nommée **`intro`** (`this.$router.push({ name: "intro" })`).

---

## Route 2 – Introduction

- **path** : `/intro`
- **name** : `intro`
- **composant (view)** : `IntroView`

- **Description** :  
  Page d’introduction du projet narratif. Affiche le header (`AppHeader`), un titre **« Introduction »** et un bouton **« Continuer »**.  
  Le bouton déclenche `startStory()` qui redirige vers la route nommée **`game`** avec le premier chapitre :  
  `this.$router.push({ name: "game", params: { id: "intro" } })`.

---

## Route 3 – Jeu / Chapitre

- **path** : `/game/:id`
- **name** : `game`
- **composant (view)** : `GameView`

- **Description** :  
  Écran principal du récit interactif.  
  La route utilise un paramètre dynamique **`:id`** qui correspond à l’identifiant du chapitre (par ex. `/game/intro`).  
  `GameView` :
  - récupère le chapitre actif à partir de l’`id` (via le store),
  - affiche le texte, le titre, le `Timer`, la `MiniMap` et les choix (`ChoiceButtons`),
  - change de chapitre en réutilisant la même route `game` avec un nouvel `id` :  
    `this.$router.push({ name: "game", params: { id: next.id } })`.
