# Documentation des composants et views dans un fichier COMPONENTS.md

## Documenter vos components et vos views dans COMPONENTS.ms

## Liste dans un fichier COMPONENTS.md (sauvegarder dans le dossier src de votre projet)
## Pour chaque composant: nom, responsabilité, props attendues, événements émis (emits)

---

## ChoiceButtons.vue

- **Nom du composant :** `ChoiceButtons`

- **Responsabilité :** Afficher la liste des choix du joueur sous forme de boutons et relayer au parent le choix sélectionné (changement de chapitre).

- **Props attendues :**
  - `choices` (Array) – tableau d’objets représentant les choix possibles du chapitre.
- **Événements émis (emits) :**

  - `choice-selected` – émis lorsqu’un bouton est cliqué, avec comme payload la destination du prochain chapitre (`next`).

---

## NavChoice.vue

- **Nom du composant :** `NavChoice`

- **Responsabilité :** Afficher un choix individuel (bouton)

- **Props attendues :**
  - `choice` (Object) – objet représentant un choix, contenant notamment la propriété `next` qui indique la prochaine étape..

- **Événements émis (emits) :**
  - `choose` – émis lorsque l’utilisateur clique sur le choix, avec comme payload la valeur de `choice.next`.

---

## TextParagraph.vue

- **Nom du composant :** `TextParagraph`

- **Responsabilité :** Afficher un paragraphe de texte.

- **Props attendues :**
  - `text` (String) – contenu text du paragraphe affiché.

- **Événements émis (emits) :**
  - Aucun.

---

## AppHeader.vue

- **Nom du composant :** `AppHeader`

- **Responsabilité :** Afficher l’en-tête de l’application avec le titre du projet, le sous-titre et la navigation vers l’Accueil.

- **Props attendues :**
  - Aucune pour le moment.

- **Événements émis (emits) :**
  - Aucun.

---

## MiniMap.vue

- **Nom du composant :** `MiniMap`

- **Responsabilité :** Afficher un encadré de mini-carte, avec pour l’instant quelques points servant de placeholder.

- **Props attendues :**
  - Aucune pour le moment.

- **Événements émis (emits) :**
  - Aucun.

---

## Timer.vue

- **Nom du composant :** `Timer`

- **Responsabilité :** Afficher un minuteur visuel sous forme de barres verticales.

- **Props attendues :**
  - Aucune pour le moment (toute la logique du temps est interne au composant).

- **Événements émis (emits) :**
  - Aucun.

---

## Stats.vue

- **Nom du composant :** `Stats`

- **Responsabilité :**  Afficher les statistiques du joueur, à savoir le nombre de morts (deaths) et le nombre d’indices collectés (collectedClues)

- **Props attendues :**
  - Aucune (toutes les données sont récupérées depuis le store playerStore)

- **Événements émis (emits) :**
  - Aucun
    
---

## ChoiceMade.vue

- **Nom du composant :** `ChoiceMade`

- **Responsabilité :** Afficher l’historique des choix effectués par le joueur et permettre de fermer cette fenêtre. Gère également les sons de survol et de clic sur le bouton de fermeture 

- **Props attendues :**
  - Aucune (les données sont récupérées depuis le store storyStore)

- **Événements émis (emits) :**
  - "close" : émis lorsque l’utilisateur clique sur le bouton pour fermer l’historique
    
---

## Echec.vue

- **Nom du composant :** `Echec`

- **Responsabilité :** Afficher un écran de fin ou d’échec avec un titre et une description, et proposer trois actions au joueur : recommencer, retourner au menu principal ou consulter l’historique des choix. Gère également les sons de survol et de clic pour les boutons.

- **Props attendues :**
- title (String) : Titre de l’écran d’échec. Par défaut "Erreur Chronique", description (String) : Texte descriptif de l’échec. Par défaut "Informations …"

- **Événements émis (emits) :**
  - "retry" : émis lorsque l’utilisateur clique sur le bouton Recommencer
  - "menu" : émis lorsque l’utilisateur clique sur le bouton Menu Principal.
    
---


## Reussite.vue

- **Nom du composant :** `Reussite`

- **Responsabilité :** Afficher un écran de réussite avec un titre et une description, et proposer deux actions au joueur : retourner à l’accueil ou consulter l’historique des choix. Gère également les sons de survol et de clic pour les boutons.

- **Props attendues :** 
  - title (String) : Titre de l’écran de réussite. Par défaut "Réussite".
  - description (String) : Texte descriptif de la réussite. Par défaut "Bravo ! Vous avez complété le jeu."

- **Événements émis (emits) :**
  - "menu" : émis lorsque l’utilisateur clique sur le bouton Accueil.
    
---
