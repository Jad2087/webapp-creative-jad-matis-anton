# Cahier de Charges: Trace ton chemin

---

## 📌 Informations du Projet

**Nom du projet :** Codex  
**Nom de l'équipe :** jad-matis-anton

---

## 👥 Membres de l’équipe

### **Jad Saloumi – Chef de projet / Développeur principal**  
Responsable de la coordination générale, de l’architecture Vue.js, et de l’intégration des fonctionnalités essentielles. Il supervise la structure du code, organise les tâches et garantit la cohérence technique du projet.

### **Matis Ghariani – Conception visuelle & sonore / Direction artistique**  
Chargé de l’identité visuelle et sonore : création des maquettes, direction artistique, choix esthétiques, animations et ambiance générale. Il a conçu la majorité des concepts visuels qui définissent l’univers du jeu.

### **Anton Nikulin – Narration & Structure narrative / Chapitres et intégration**  
Responsable de la scénarisation complète : écriture des chapitres, création de l’arbre narratif, élaborations des variations et intégration logique des embranchements. Il assure la cohérence de l’histoire et la fluidité entre les différentes pages du jeu.

---

**Date de début :** 15 October 2025  
**Date de livraison finale :** 10 décembre 2025  
**Version du document :** 1.0  

---

## 🎯 1. Présentation du Projet

### 1.1 Concept général

**Codex** est une expérience interactive de science-fiction teintée de mystère et de tension psychologique. Le joueur incarne un individu anonyme qui se réveille d’une cryostase au cœur d’une station spatiale partiellement effondrée, silencieuse et abandonnée. Aucun souvenir, aucun contact extérieur — seulement des modules dépressurisés, des systèmes en panne, une réserve d’oxygène limitée et une étrange substance noire qui contamine certaines sections. L’objectif est simple en apparence : comprendre ce qui reste fonctionnel et trouver un moyen de quitter la station avant qu’elle ne se désintègre en orbite.

L’histoire repose sur l’exploration : le joueur choisit quels secteurs visiter (énergie, maintenance, communications, modules de service…), comment aborder des environnements dangereux, et dans quel ordre récolter les indices nécessaires pour progresser. La progression dépend de la capacité du joueur à analyser les indices, contourner les obstacles environnementaux et déverrouiller différents terminaux informatiques grâce à un mini-jeu de hacking basé sur la logique, les mots de passe et la similarité des caractères.

Le protagoniste reste volontairement neutre — un « personne » sans identité définie — mais de petits détails (compétences techniques, compréhension des systèmes, aisance avec les terminaux) suggèrent un passé de mécanicien ou technicien de bord. Ce choix renforce l’immersion : le joueur devient littéralement celui qui se réveille et tente de survivre, sans menace vivante qui le pourchasse, mais avec une atmosphère lourde, des risques bien réels et la pression constante d’un compte à rebours invisible : l’oxygène qui s’épuise.

### 1.2 Public cible

- *Âge:* 18–30 ans (cœur de cible ~24 ans)  
- *Profil:* Amateurs de récits interactifs, de science-fiction immersive, d’histoires atmosphériques et d’esthétique rétro/terminal  
- *Niveau technique:* Grand public (navigation par clic)  
- *Temps de lecture estimé:* ~20 minutes pour une partie complète  

### 1.3 Objectifs du projet

- [x] Créer une expérience narrative immersive et atmosphérique  
- [x] Développer un système de choix influençant réellement le parcours du joueur  
- [ ] Implémenter un système de sauvegarde de progression  
- [x] Démontrer la maîtrise de Vue.js, Pinia et GSAP  
- [x] Créer une interface accessible et responsive  
- [x] Implémenter un mini-jeu de hacking cohérent avec l’univers

---

## 📖 2. Architecture Narrative

### 2.1 Synopsis détaillé

Le joueur se réveille dans une cuve cryogénique, au cœur d’une station spatiale vieillissante et en décomposition. Aucun souvenir, aucun contact, aucun signe de vie. Les modules sont endommagés, les systèmes clignotent, et certaines sections sont contaminées par une substance noire d’origine inconnue. L’oxygène est limité et la station perd rapidement de l’altitude : le temps joue contre vous.

L’aventure repose sur l’exploration. Le joueur navigue entre différents secteurs, collecte des **indices**, évite les zones dangereuses (ventilateurs, conduits instables, zones dépressurisées, éclairage défaillant, contamination) et tente d’ouvrir des accès critiques grâce à plusieurs **mini-jeux de hacking**. Ces énigmes, basées sur la logique des mots de passe, sont essentielles pour progresser.

Le protagoniste reste volontairement anonyme — un individu sans identité claire — mais ses compétences en maintenance et en piratage suggèrent un passé de mécanicien ou de technicien de bord. L’histoire met l’accent sur la solitude, la survie et le mystère : aucun ennemi ne poursuit le joueur, mais l’environnement lui-même constitue une menace constante. Le seul objectif : trouver une issue avant que la station ne s’écrase.



### 2.2 Structure générale de l’arbre narratif

L’histoire suit une structure à embranchements contrôlés (*branch-and-bottleneck*), divisée en **3 Actes** :

#### **Acte 1 – Réveil & Initiation**
- Réveil dans la cryo-pod (intro).
- Premier embranchement : Clue01 / Clue02.
- Introduction au premier mini-jeu de hacking (Minigame 01).
- Apprentissage de la boucle narrative : **explorer → collecter indice → ouvrir terminal → avancer**.

#### **Acte 2 – Exploration & Dangers**

Acte le plus long, comprenant plusieurs forks successifs et plusieurs routes alternatives permettant déjà d’accéder à certaines fins.

- **Fork 02** → *Clue03* / *Clue04* → **Minigame 02**  
- **Fork 03** → Trois chemins :  
  - **Chemin Droite**  
  - **Chemin Gauche**  
  - **Chemin Bloqué** (mène à une mort immédiate)  
- Zones dangereuses : ventilateurs industriels, conduits sombres, contamination par la substance noire, zones structurellement instables.  
- Plusieurs embranchements mènent à des fins prématurées ou à des morts environnementales selon les choix effectués.
- **Fork 04** → *Clue07* / *Clue08* → **Minigame 04**

Cet acte introduit également les **premières fins possibles**, accessibles avant Acte 3 :

- **Fin Évasion (Hangar Militaire)** → Si le joueur parvient à atteindre le hangar, il peut tenter de s’échapper immédiatement via un appareil encore fonctionnel.  
- **Fin — Sommeil Éternel (Cryo-Pods)** → Un chemin secondaire mène aux modules cryogéniques ; le joueur peut choisir de retourner en stase plutôt que de continuer l’exploration.

De plus, certains choix dans Acte 2 permettent au joueur de :  
- découvrir des indices critiques liés à l’état du **générateur principal**,  
- apprendre que la station nécessite une **réparation du générateur** pour stabiliser la descente.

Ces informations deviennent essentielles dans Acte 3 :  
la **fin secrète** ne peut être débloquée que si le joueur a obtenu l’indice prouvant comment réparer ou stabiliser le générateur, et qu’il applique cette solution lors des derniers mini-jeux.

#### **Acte 3 – Fuite & Résolution**
- **Fork 05** → Clue09 / Clue10 → Minigame 05  
- Dernier embranchement final : Fork 06  
- Terminal final (Minigame 06) ouvrant les issues possibles  
- Plusieurs fins dépendant :
  - des chemins choisis  
  - des indices trouvés  
  - des succès ou échecs aux mini-jeux  


### 2.2 Schéma narratif

### 2.2 Schéma narratif

<p align="center">
  <img src="./Codex Narative.png" alt="Schéma narratif — Codex" width="900">
</p>

---

<small>(noms provisoires, 3 actes, modèle branch-and-bottleneck)</small>

| #  | Nom du chapitre                | Type                 | Description courte                                                                 | Choix proposés                                   | Conséquences |
|----|--------------------------------|----------------------|------------------------------------------------------------------------------------|--------------------------------------------------|--------------|
| 1  | Réveil — Cryo-B                | Linéaire / Texte     | Le jeu commence : court texte d’explication, prise en main.                        | Continuer / Examiner la pièce                    | Débloque le premier carrefour |
| 2  | Premier carrefour              | Choix                | Première page de choix : plusieurs directions possibles.                           | Route A / Route B                                | A → Scène 3 · B → Scène 4 |
| 3  | Couloirs — A                   | Texte / Indice       | Exploration d’une zone : ambiance + petit indice sur la station.                   | Inspecter / Passer                               | Gagne **indice A** |
| 4  | Couloirs — B                   | Texte / Indice       | Deuxième zone d’explo : ambiance + autre indice.                                   | Fouiller / Passer                                | Gagne **indice B** |
| 5  | Premier terminal               | Mini-jeu (hack)      | Premier hacking pour ouvrir une porte.                                             | Hacker / Chercher un indice                      | Ouvre l’accès vers l’Acte 2 |
| 6  | Carrefour — Acte 2             | Choix                | Début de l’Acte 2 : nouvelles sections à parcourir.                                | Aller vers Énergie / Maintenance / Comms         | Lance l’exploration centrale |
| 7  | Sections supplémentaires       | À décider            | Longueur/ordre non fixés (exploration de chambres/sections, lore, indices).        | Explorer / Revenir                               | Progression variable (à préciser) |
| 8  | Clé d’accès optionnelle        | Objet / Indice       | On peut trouver une **clé** qui débloque une **fin bonus**.                        | Prendre / Ignorer                                | Débloque une **seconde fin** (plus tard) |
| 9  | Accès — Acte 3                 | Choix                | Entrée dans l’Acte 3 : carrefour final, 3 zones au choix.                          | Zone 1 Capsule / Zone 2 Leurre / Zone 3 Cabine   | 10 / 11 / 12 selon la zone choisie |
| 10 | Capsule de sauvetage           | Mini-jeu (hack)      | Terminal verrouillé avant la capsule; issue possible par 2 variantes.             | Hacker / Revenir plus tard                       | **2 fins** selon flags/état (avec ou sans preuves) |
| 11 | Générateur de leurre           | Objet / Texte        | Dispositif pour **attirer** la créature et gagner du temps pour fuir.              | Activer / Conserver                               | Réduit le risque; ouvre fenêtre d’évasion |
| 12 | Cabine du capitaine            | Objet / Fin cachée   | Si l’objet requis est trouvé, on peut déverrouiller une **troisième fin** cachée.  | Chercher l’objet / Utiliser l’objet              | Débloque la **fin cachée** |

### 2.4 Fins possibles

Listez toutes les fins de votre histoire (minimum 3, idéal 4–6):

<small>(noms provisoires — basées sur vos conditions)</small>

| # | Nom de la fin                | Condition pour l'atteindre                                                | Type (bonne/mauvaise/neutre) |
|---|------------------------------|---------------------------------------------------------------------------|------------------------------|
| 1 | **Purge orbitale**           | Déclencher la destruction de la station (vous périssez avec le monstre)  | Neutre / Sombre              |
| 2 | **Retour sur Terre**         | Atteindre la capsule et s’échapper (preuves/états suffisants)            | Bonne                        |
| 3 | **Rattrapé par la créature** | Lancer l’évasion, mais la créature vous rejoint et vous tue en fuite     | Mauvaise                     |


### 2.5 Personnages principaux
### 2.5 Personnages principaux

| Nom          | Rôle        | Description courte                           | Apparaît dans          |
|--------------|-------------|----------------------------------------------|------------------------|
| **Interloper** | Protagoniste | Avatar du joueur, amnésique, seul à bord     | Tous les chapitres     |
| **La Créature** | Antagoniste | Présence traquante, apparitions aléatoires    | Événements clés / fins |


### 2.6 Système de conséquences

Comment les choix influencent l'histoire?

*Mécanisme choisi:*

- [ ] *Système de karma/moralité* (points bons/mauvais)
- [ ] *Stats du personnage* (courage, intelligence, empathie)
- [X] *Inventaire d'objets* (collecte d'items)
- [ ] *Relations avec personnages* (affinités)
- [ ] *Flags de choix* (choix X débloque scène Y)
- [ ] *Combinaison de plusieurs systèmes*

*Exemple de tracking:*
```javascript
playerState: {
  karma: 0,  // -10 à +10
  inventory: ['clé', 'journal'],
  relationships: {
    marcus: 5,  // 0 à 10
    chronos: -3
  },
  flags: {
    hasActivatedMachine: true,
    knowsTheSecret: false
  }
}
```


## 🎨 3. Design et Identité Visuelle

### 3.1 Moodboard

Insérez ici 3-5 images d'inspiration (ou liens):

- [Image 1: Ambiance générale](https://www.bing.com/images/search?view=detailV2&ccid=Cada1IDV&id=B6365AD34B9A6507D250AC0CDE3369970464874A&thid=OIP.Cada1IDVA-uSx-gYfhqNCgHaEK&mediaurl=https%3a%2f%2fdavescomputertips.com%2fwp-content%2fuploads%2f2015%2f03%2faliensign-in.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.09a75ad480d503eb92c7e8187e1a8d0a%3frik%3dSodkBJdpM94MrA%26pid%3dImgRaw%26r%3d0&exph=675&expw=1200&q=alien+isolation+computer&FORM=IRPRST&ck=F8D622281E50FABA58B0FC3BB0E0B4FA&selectedIndex=1&itb=0&ajaxhist=0&ajaxserp=0)
- [Image 2](https://www.bing.com/images/search?view=detailV2&ccid=YOUaIvSz&id=A4D4430C180D67BB6DF5E12689485901B35C5F43&thid=OIP.YOUaIvSzj4QkvrxuuVMXjgHaEK&mediaurl=https%3A%2F%2F4.bp.blogspot.com%2F-sOZgIW-Lwrw%2FVQsnohowThI%2FAAAAAAAA0f0%2FryjMilnf5S8%2Fs1920%2FAlien_Isolation_(PC)_14.jpg&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.60e51a22f4b38f8424bebc6eb953178e%3Frik%3DQ19cswFZSIkm4Q%26pid%3DImgRaw%26r%3D0&exph=1080&expw=1920&q=alien+isolation+computer&form=IRPRST&ck=EEDFA5AF4E64AF499F38EDE2EB6ECBB3&selectedindex=7&itb=0&ajaxhist=0&ajaxserp=0&pivotparams=insightsToken%3Dccid_jtw5ILC1*cp_24FC41BEE274E124CDFF31986F24DBC5*mid_E23553DE2A472D889A2CDCB39DBD3C75CDE34725*thid_OIP.jtw5ILC1jDLxrLDz7JQrEwHaEK&vt=0&sim=11&iss=VSI&ajaxhist=0&ajaxserp=0)
- [Image 3](https://www.bing.com/images/search?view=detailV2&ccid=ktP65tHB&id=DB481A2ADAF83DB40CA909E32C90985EEF3D09E8&thid=OIP.ktP65tHB_MxUU7TzEEH2uAHaEL&mediaurl=https%3a%2f%2fwww.nerdean.com%2fwp-content%2fuploads%2f2024%2f02%2fhacking.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.92d3fae6d1c1fccc5453b4f31041f6b8%3frik%3d6Ak9716YkCzjCQ%26pid%3dImgRaw%26r%3d0&exph=360&expw=639&q=hacking&FORM=IRPRST&ck=4FA7DAB14911824EE704FC1B8669E25D&selectedIndex=42&itb=0&ajaxhist=0&ajaxserp=0)

### 3.2 Palette de couleurs

*Couleurs par ambiance/chapitre:*

- *Chapitres introduction:* [#03AB5E] - Tons neutres
- *Chapitres tension:* [#1F1F1F] - Tons sombres/dramatiques
- *Chapitres espoir:* [#FFFFFF et #03AB5E] - Tons clairs/lumineux
- *Chapitres danger:* [#E35E5E] - Rouge/orange

*Couleurs système:*

- Primaire (actions principales): [#03AB5E]
- Secondaire (choix): [#FFFFFF]
- Succès: [#03AB5E]
- Danger: [#E35E5E]
- Neutre: [#FFFFFF]

### 3.3 Typographie

- [monospace] - Courier New

### 3.4 Style visuel

Choisissez un ou plusieurs styles:

- [ ] Cinématique (film noir, thriller)
- [ ] Illustratif (dessins, concept art)
- [X] Minimaliste (focus sur le texte)
- [ ] Immersif (photos, ambiances réalistes)
- [ ] Stylisé (flat design, géométrique)

### 3.5 Éléments visuels par chapitre

| Chapitre | Image de fond | Effets visuels | Sons/musique |
|----------|---------------|----------------|--------------|
| acceuil | Ecran d'ordinateur | Leger bug | Musique douce mais intensse |
| page principale |Ecran d'ordinateur |bug de haut en bas | son boutons |
| echec |Ecran d'ordinateur | bug clignotement |son alerte |
| victoire |Ecran d'ordinateur |bug clignotement | son vitoire |


## 💻 4. Spécifications Techniques

### 4.1 Stack technologique

*Frontend obligatoire:*

- ✅ Vue.js 3 (Composition API ☐ / Options API ☐)
- ✅ Vite
- ✅ Vue Router
- ✅ Pinia (state management)
- ✅ CSS
- ✅ GSAP + ScrollTrigger (optionnel selon style)

*Librairies additionnelles envisagées:*

- [ ] VueUse (composables utilitaires)
- [X] Typed.js (effet de machine à écrire)
- [X] Howler.js (gestion audio avancée)
- [ ] [Autre]

### 4.2 Architecture des composants

Listez vos composants Vue principaux:

*Composants de layout:*

- `AppHeader.vue` - Navigation et menu
- `SaveSlotManager.vue` - Gestion des sauvegardes
- `ProgressBar.vue` - Barre de progression dans l'histoire

*Composants de contenu:*

- `ChapterView.vue` - Vue d'un chapitre/scène
- `NarrativeText.vue` - Affichage du texte narratif
- `DialogueBox.vue` - Boîte de dialogue pour personnages
- `ChoiceButton.vue` - Bouton de choix interactif
- `ChoicePanel.vue` - Panel contenant tous les choix

*Composants système:*

- `InventoryDisplay.vue` - Affichage de l'inventaire
- `StatsPanel.vue` - Affichage des stats du joueur
- `EndingScreen.vue` - Écran de fin avec récapitulatif
- `Modal.vue` - Fenêtre modale (sauvegarde, options)

*Composants UI:*

- `ButtonPrimary.vue` - Bouton principal
- `LoadingSpinner.vue` - Indicateur de chargement
- `AudioController.vue` - Contrôle de la musique/sons

### 4.3 Routes (Vue Router)

| Route | Composant | Description | Params |
|-------|-----------|-------------|--------|
| `/` | `HomeView.vue` | Menu principal | - |
| `/nouvelle-partie` | `CharacterSetupView.vue` | Config initiale (nom, etc.) | - |
| `/chapitre/:id` | `ChapterView.vue` | Vue d'un chapitre | id du chapitre |
| `/fin/:endingId` | `EndingView.vue` | Écran de fin | id de la fin |
| `/sauvegardes` | `SavesView.vue` | Gestion des sauvegardes | - |
| `/credits` | `CreditsView.vue` | Crédits | - |

### 4.4 Gestion de l'état (Pinia)

*Stores prévus:*

1. *`useStoryStore`*
   - State: `currentChapterId`, `visitedChapters`, `storyData`, `availableChoices`
   - Actions: `loadChapter()`, `makeChoice()`, `goToChapter()`
   - Getters: `currentChapter`, `isChapterUnlocked()`

2. *`usePlayerStore`*
   - State: `playerName`, `karma`, `stats`, `inventory`, `flags`, `relationships`
   - Actions: `addToInventory()`, `updateStat()`, `setFlag()`, `updateRelationship()`
   - Getters: `hasItem()`, `getRelationship()`, `canAccessEnding()`

3. *`useSaveStore`*
   - State: `saveSlots` (array de 3 slots)
   - Actions: `saveGame()`, `loadGame()`, `deleteSave()`, `getSaveInfo()`
   - Getters: `hasSaves`, `latestSave`

4. *`useAudioStore`* (optionnel)
   - State: `currentMusic`, `soundEffects`, `volume`, `isMuted`
   - Actions: `playMusic()`, `playSound()`, `toggleMute()`, `setVolume()`

### 4.5 Persistance des données

*Méthode choisie:*

- [x] LocalStorage (obligatoire pour sauvegardes)
- [ ] Firebase Firestore (bonus optionnel pour galerie publique)

*Structure de données LocalStorage:*

```json
{
  "saveSlot1": {
    "savedAt": "2025-01-15T14:30:00Z",
    "playerName": "Alex",
    "currentChapterId": "chapter-5",
    "playerState": {
      "karma": 5,
      "stats": {
        "courage": 7,
        "intelligence": 8,
        "empathy": 6
      },
      "inventory": ["clé", "journal", "photo"],
      "flags": {
        "hasActivatedMachine": true,
        "knowsTheSecret": true,
        "savedMarcus": false
      },
      "relationships": {
        "marcus": 8,
        "chronos": -5
      }
    },
    "visitedChapters": ["ch-1", "ch-2", "ch-3a", "ch-4", "ch-5"],
    "choiceHistory": [
      { "chapterId": "ch-2", "choiceId": "activate", "timestamp": "..." },
      { "chapterId": "ch-3a", "choiceId": "go-past", "timestamp": "..." }
    ]
  },
  "saveSlot2": null,
  "saveSlot3": null,
  "settings": {
    "volume": 0.7,
    "textSpeed": "normal",
    "autoSave": true
  }
}
```

### 4.6 Structure de données de l'histoire

Comment stockez-vous les chapitres et choix?

*Option A: JSON statique* (recommandé)
```javascript
// data/chapters.json
{
  "ch-1": {
    "id": "ch-1",
    "title": "Le Réveil",
    "text": "Vous vous réveillez dans votre laboratoire...",
    "backgroundImage": "/images/bg-lab.jpg",
    "music": "intro-theme.mp3",
    "choices": null,  // Chapitre linéaire
    "nextChapter": "ch-2"
  },
  "ch-2": {
    "id": "ch-2",
    "title": "La Découverte",
    "text": "Face à la machine, vous devez décider...",
    "backgroundImage": "/images/bg-machine.jpg",
    "music": "tension-theme.mp3",
    "choices": [
      {
        "id": "activate",
        "text": "Activer la machine",
        "consequence": "Vous entrez dans l'inconnu...",
        "nextChapter": "ch-3a",
        "effects": {
          "karma": -2,
          "stats": { "courage": +1 },
          "flags": { "hasActivatedMachine": true }
        }
      },
      {
        "id": "report",
        "text": "Rapporter la découverte",
        "consequence": "La prudence avant tout...",
        "nextChapter": "ch-3b",
        "effects": {
          "karma": +2,
          "stats": { "intelligence": +1 },
          "flags": { "hasReported": true }
        }
      }
    ]
  }
}
```
## 🎬 5. Fonctionnalités et User Stories

### 5.1 Fonctionnalités MVP (Minimum Viable Product)

*Obligatoires pour la livraison:*

- [X] *F1 - Lecture de l'histoire*
  - Affichage du texte narratif chapitre par chapitre
  - Navigation linéaire dans l'intro
  - Transitions fluides entre chapitres

- [X] *F2 - Système de choix*
  - Affichage de 2-4 choix par chapitre décisionnel
  - Sélection d'un choix
  - Redirection vers le chapitre suivant approprié
  - Minimum 8 chapitres avec au moins 3 fins

- [X] *F3 - Tracking des conséquences*
  - État du joueur (karma/stats/flags)
  - Mise à jour après chaque choix
  - Conditions pour débloquer fins

- [ ] *F4 - Système de sauvegarde*
  - 3 slots de sauvegarde
  - Sauvegarde manuelle
  - Chargement d'une sauvegarde
  - Affichage des infos de sauvegarde (date, progression)

- [x] *F5 - Historique des choix*
  - Garder trace des décisions prises
  - Affichage dans un menu (optionnel mais recommandé)

- [X] *F6 - Écrans de fin*
  - Affichage de la fin atteinte
  - Récapitulatif des choix faits
  - Option de recommencer ou charger

- [x] *F7 - Interface responsive*
  - Mobile (320px+)
  - Tablette (768px+)
  - Desktop (1024px+)

- [X] *F8 - Animations de texte*
  - Apparition progressive du texte (optionnel: effet typewriter)
  - Transitions entre chapitres avec GSAP

- [ ] *F9 - Accessibilité*
  - Navigation au clavier
  - ARIA labels
  - Contraste WCAG AA
  - Option skip animations

- [X] *F10 - Médias intégrés*
  - Images de fond par chapitre
  - Musique d'ambiance (avec contrôle volume)

### 5.2 Fonctionnalités bonus (optionnelles)

- [ ] *B1 - Auto-save*
  - Sauvegarde automatique à chaque chapitre
  - Indication visuelle de la sauvegarde

- [ ] *B2 - Inventaire visuel*
  - Affichage graphique des items
  - Description des objets au survol

- [X] *B3 - Stats visuelles*
  - Barres de progression pour stats
  - Graphique radar des caractéristiques

- [ ] *B4 - Arbre de choix visualisé*
  - Carte interactive des chemins possibles
  - Indication des chapitres visités/non-visités

- [ ] *B5 - Galerie des fins*
  - Collection de toutes les fins débloquées
  - Pourcentage de complétion

- [ ] *B6 - Mode rejouabilité*
  - Fast-forward pour texte déjà lu
  - Skip to choice (sauter au prochain choix)

- [X] *B7 - Effets sonores contextuels*
  - Sons lors de choix importants
  - Ambiances sonores par scène

- [ ] *B8 - Animations avancées GSAP*
  - Parallax sur les backgrounds
  - Animations de transition complexes

- [ ] *B9 - Firebase (équipes avancées)*
  - Partage de fins débloquées
  - Galerie publique d'histoires

### 5.3 User Stories

*Format:* En tant que [rôle], je veux [action] afin de [bénéfice]

1. *US-01:* En tant que lecteur, je veux lire une histoire interactive afin de vivre une expérience narrative immersive.

2. *US-02:* En tant que joueur, je veux faire des choix qui ont des conséquences afin de sentir que mes décisions comptent.

3. *US-03:* En tant qu'utilisateur, je veux sauvegarder ma progression afin de reprendre plus tard sans perdre mon avancement.

4. *US-04:* En tant que lecteur, je veux voir l'impact de mes choix afin de comprendre comment ils influencent l'histoire.

5. *US-05:* En tant que joueur, je veux atteindre différentes fins afin de découvrir toutes les possibilités de l'histoire.

6. *US-06:* En tant qu'utilisateur mobile, je veux lire l'histoire sur mon téléphone afin d'en profiter partout.

7. *US-07:* En tant que lecteur, je veux consulter l'historique de mes choix afin de me rappeler mes décisions passées.

8. *US-08:* En tant que joueur, je veux collecter des objets/débloquer des stats afin de me sentir progresser dans l'aventure.

9. *US-09:* En tant qu'utilisateur, je veux contrôler le volume sonore afin d'adapter l'expérience à mon environnement.

10. [Ajoutez vos user stories]

## 📊 6. Maquettes et Wireframes

### 6.1 Lien vers les maquettes Figma

## Lien de Figma
[Design Figma](https://www.figma.com/design/NYORCfer7iDWWjMfVaiR2e/webapp-creative-jad-matis-anton?node-id=0-1&p=f&t=xRa0dvTbMNhjV2NU-0)

### 6.2 Écrans principaux à maquetter

- [ ] Menu principal (nouvelle partie, charger, options)
- [ ] Écran de chapitre avec texte narratif
- [ ] Panel de choix (2-4 options)
- [ ] Inventaire/Stats (si applicable)
- [ ] Écran de fin avec récapitulatif
- [ ] Gestion des sauvegardes (3 slots)
- [ ] Version mobile d'au moins 2-3 écrans

### 6.3 Interactions clés à maquetter

- Apparition progressive du texte
- Animations des boutons de choix
- Transition entre chapitres
- Ouverture de l'inventaire/stats
- États des boutons (hover, actif, disabled)


## 📊 7. Plan de Réalisation

### 7.1 Répartition des rôles

| Membre | Rôle principal | Responsabilités |
|--------|----------------|-----------------|
| [Jad Saloumi] | Chef de projet + Architecture Vue | Coordination, Vue Router, stores Pinia, structure de l'histoire, stats |
| [Matis Ghariani] | Design + Animations | CSS, design visuel, animations GSAP, transitions |
| [Anton Nikulin] | Contenu + Narration | Écriture des chapitres, création de l'arbre narratif, dialogues, logique de choix |

*Note:* Tous participent au développement, mais chacun a sa spécialité.

### 7.2 Tâches transversales

*À répartir entre tous:*

- Tests de l'histoire (lecture complète)
- Correction de fautes et relecture
- Tests et debugging
- Documentation du code
- Présentation finale

### 7.3 Outils de collaboration

- *Git/GitHub:* [[Lien du repo](https://github.com/Jad2087/webapp-creative-jad-matis-anton)]
- *Gestion de projet:* [[Trello / Word / GitHub Projects](https://trello.com/b/bLSYDkwz/modele-kanban)]
- *Communication:* [2257715@cmontmorency.qc.ca, 2014470@cmontmorency.qc.ca, 2278673@cmontmorency.qc.ca]
- *Design:* [[Figma](https://www.figma.com/design/NYORCfer7iDWWjMfVaiR2e/webapp-creative-jad-matis-anton?node-id=0-1&p=f&t=j1SahqeOevGKEd14-0)]
- *Documentation:* [Word / Google Docs / README.md]
- *Écriture collaborative:* [Google Docs / Word]

## 🚀 8. Critères de Succès

### 8.1 Critères techniques

- [x] Application Vue.js fonctionnelle sans erreurs console
- [x] Minimum 8 composants Vue bien structurés
- [x] Vue Router avec 5+ routes
- [x] Pinia implémenté avec state management cohérent
- [x] CSS organisé avec variables
- [x] Animations GSAP fluides
- [x] Système de sauvegarde fonctionnel
- [x] Code validé (ESLint)
- [x] Responsive sur 3 breakpoints
- [x] Accessibilité WCAG AA

### 8.2 Critères narratifs

- [x] Histoire cohérente du début à la fin
- [x] Minimum 8 chapitres/scènes
- [x] Au moins 3 fins différentes
- [x] Choix ayant un impact réel sur l'histoire
- [x] Aucune faute d'orthographe majeure
- [x] Dialogues naturels et crédibles
- [x] Rythme narratif bien dosé

### 8.3 Critères de qualité

- [x] Interface intuitive et facile à utiliser
- [x] Design cohérent et esthétique
- [x] Lisibilité du texte (taille, contraste, police)
- [x] Animations pertinentes (pas excessives)
- [x] Temps de chargement < 2 secondes
- [x] Aucun bug bloquant
- [x] Musique/sons appropriés
- [x] Documentation complète (README)

### 8.4 Critères créatifs

- [x] Histoire originale et engageante
- [x] Personnages mémorables
- [x] Twist ou surprise dans l'intrigue
- [x] Expérience émotionnelle impactante
- [x] Rejouabilité (envie de tester d'autres chemins)

## 📅 9. Calendrier du projet: Planning prévisionnel

### 9.1 *PHASE 1: PLANIFICATION ET DESIGN*
<!--Semaine 1-2 (la 2 étant la semaine de rattrapage)-->

**Du 8 au 22 octobre**

*Remise 22 octobre | 15%*

- Rédaction du cahier de charges
- Écriture de l'arbre narratif complet
- Design: Création des maquettes Figma
- Définition de l'architecture technique
- Setup du projet (Vite + Vue + dépendances)

### 9.2 *PHASE 2: FONDATION*
<!--Semaine 3-4-->

**Du 22 octobre au 2 novembre environ**

*Remise Phases 2 FONDATION et 3 INTERACTIVITÉ : vendredi 14 novembre | 15%*

!!! tip "Le projet portfolio en parallèle"
    Notez que mercredi le 29 octobre c'est la remise et présentation de votre portfolio donc nous laissons un peu plus qu'une semaine pour cette phase car vous allez probablement finaliser votre portfolio en même temps.

- Structure des composants de base
- Vue Router configuré
- Pinia stores créés
- Premiers chapitres (texte + affichage)

### 9.3 *PHASE 3: INTERACTIVITÉ - Système de Choix*
<!-- Semaine 4-5-->

**Environ du 2 novembre au 12 novembre**

*Remise Phases 2 FONDATION et 3 INTERACTIVITÉ : vendredi 14 novembre | 15%*

- Logique de branches narratives
- Système de tracking des conséquences
- Composants de choix interactifs
- Plus de chapitres écrits et intégrés

### 9.4 *PHASE 4: ANIMATIONS ET MÉDIAS*
<!-- Semaine 6 -->

**Du 12 au 19 novembre**

*Remise Phases 4 ANIMATIONS+MÉDIAS et 5 PERSISTANCE : 26 novembre | Formatif*

- Intégration GSAP (transitions)
- Images de fond par chapitre
- Musiques/sons d'ambiance
- Animations de texte

### 9.x *ÉVALUATION PAR LES PAIRS ET AUTO-ÉVALUATION DE MI PARCOURS*

**Sera fait en classe le 19 novembre**

*Remise de l'évaluation par les pairs et auto-évaluation de mi parcours: 19 novembre | 5%*

### 9.5 *PHASE 5: PERSISTANCE ET SAUVEGARDE DES DONNÉES + Fin de l'histoire*
<!-- Semaine 7 -->

**Du 19 au 26 novembre**

*Remise Phases 4 ANIMATIONS+MÉDIAS et 5 PERSISTANCE : 26 novembre | Formatif*

- Système de sauvegarde (3 slots)
- LocalStorage complet
- Toutes les fins écrites et intégrées
- Écrans de fin avec récapitulatif

### 9.6 *PHASE 6: AFFINAGE ET ACCESSIBLITÉ* pour la version *BETA*

**Du 26 novembre au 3 décembre**

*Remise version *BETA* le 3 décembre | Formatif*

- Responsive final
- Accessibilité (ARIA, keyboard)

### 9.7 *PHASE 7:  CONTRÔLE QUALITÉ ET CORRECTIONS*
<!-- Semaine 8 -->
**Du 3 au 8 décembre**

*Remise Phase 7 RAPPORT DU CONTRÔLE DE LA QUALITÉ : 8 décembre | 10%*

- Tests de toutes les branches de l'histoire
- Tests fonctionnels
- Tests multi-plateformes (navigateurs et appareils)
- Relecture et corrections
- Optimisation de la performance
- Gestion des bogues

### 9.8 *PHASE 8:  FINALISATION*
<!-- Semaine 8 + 2 jours-->

**Du 3 au 10 décembre** (peut-être fait en parallèle avec la phase 7)

*Remise et présentation finale : 10 décembre | 50%*

- Documentation (README complet)
- Déploiement - Mise en ligne (GitHub/Netlify/Vercel)
- Vidéo de présentation
- Préparation de la démo en classe

### 9.9 *PHASE 9: POST-MORTEM*

**Du 10 au 12 décembre**

*Remise de l'analyse réflexive et suivi de l'évaluation de mi-parcours: 12 décembre | 5%*

## 🎯 10. Risques et Solutions

| Risque | Probabilité | Impact | Solution préventive |
|--------|-------------|--------|---------------------|
| Scope creep narratif (trop d'histoire) | Élevée | Élevé | Limiter à 8-10 chapitres max, garder histoires simples |
| Manque de temps pour écrire | Élevée | Élevé | Écrire les chapitres AVANT de coder, paralléliser |
| Bugs dans la logique de branches | Moyenne | Élevé | Tester chaque branche manuellement, diagramme clair |
| Incohérences narratives | Moyenne | Moyen | Relecture croisée, document de tracking des flags |
| Fautes d'orthographe | Élevée | Faible | Utiliser correcteur, relecture collective |
| Sauvegardes corrompues | Faible | Élevé | Validation JSON, gestion d'erreurs, tests intensifs |

## 📝 11. Annexes

### 11.1 Ressources et références

*Documentation officielle:*

- Contenu du cours Web 5 https://tim-montmorency.com/compendium/582-511-web5/
- Guide étudiant du projet appli web créative: https://tim-montmorency.com/compendium/582-511-web5/projets/appweb-creative/syllabus_guide_etudiant.html
- Vue.js: https://vuejs.org
- Pinia: https://pinia.vuejs.org
- GSAP: https://greensock.com/docs/

*Inspiration narrative:*

- Bandersnatch (Black Mirror)
- Life is Strange
- Detroit: Become Human
- Twine games

*Tutoriels utiles:*

- [Lien vers tuto 1]
- [Lien vers tuto 2]

### 11.2 Glossaire

- *Branche:* Chemin narratif distinct selon les choix
- *Flag:* Variable booléenne qui track un événement
- *Ending:* Fin possible de l'histoire
- *Karma:* Système de moralité basé sur les choix
- *Node:* Point de décision dans l'arbre narratif
- *Save slot:* Emplacement de sauvegarde

## ✅ Validation du Cahier de Charges

*Date de validation:* [Date]

*Signatures:*

- Chef de projet: Jad Saloumi
- Membre 2: Matis Ghariani
- Membre 3: Anton Nikulin

*Validation enseignant:* _______________  
*Date:* _______________  
*Commentaires:*

---

*Version du document cahier de charge:* 1.0  
*Dernière mise à jour:* [Écrire ici la date]
