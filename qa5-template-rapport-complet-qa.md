# Rapport de Contrôle Qualité

**Nom de votre équipe :** [Code³]  
**Nom du projet :** [Codex]  
**Type de projet :** [Trace ton chemin]  
**Date :** 8 décembre 2024

<a href="https://tim-montmorency.com/compendium/582-511-web5/projets/appweb-creative/qa5-template-rapport-complet-qa.md" class="md-button">📥 Télécharger template de départ en markdown</a>

## 📋 Table des matières

1. [Informations générales](#1-informations-générales)
2. [PARTIE 1 : Tests externes](#2-partie-1-tests-externes)
3. [PARTIE 2A : Tests internes](#3-partie-2a-tests-internes)
4. [PARTIE 2B : Bogues reçus](#4-partie-2b-bugs-reçus)
5. [PARTIE 2C : Plan de corrections](#5-partie-2c-plan-de-corrections)
6. [Accessibilité](#6-accessibilité)
7. [Performance](#7-performance)
8. [Conclusion](#8-conclusion)
9. [Annexes](#9-annexes)

---

## 1. Informations générales

### Équipe

| Membre | Rôle dans les tests | Heures consacrées |
|--------|---------------------|-------------------|
| [Matiheu Willet] | Tests externes + internes | [2h] heures |
| [NJad Saloumi] | Tests internes + corrections | [3h] heures |


**Total d'heures de QA :** [X] heures

### Liens importants

- **Projet en ligne :** [[https://votre-projet.netlify.app](https://jad2087.github.io/webapp-creative-jad-matis-anton/)]
- **GitHub :** [https://github.com/Jad2087/webapp-creative-jad-matis-anton]
- **Trello (bugs) :** [https://trello.com/b/bLSYDkwz/modele-kanban]
- **Projet testé (externe) :** [https://mathieuwillett.github.io/webapp-creative-justin-ahmed-mathieu/]

---

## 2. PARTIE 1 : Tests externes

### Ce que NOUS avons trouvé dans le projet de l'autre équipe

**Projet testé :**  [Les héros de l'éclipse]    
**Équipe testée :** [Équipe JDMania]  
**Type :** [Trace ton chemin]

### Résumé des tests effectués

**Environnements testés :**

- ✅ Chrome 120 (Desktop)
- ✅ Mobile 375px (DevTools)
- ✅ Tablette 768px (DevTools)


**Tests complétés :**

- ✅ Tests fonctionnels (checklist complète)
- ✅ Tests responsive (3 tailles)
- ✅ Tests multi-navigateurs (Chrome, Firefox)
- ✅ Tests d'accessibilité
- ✅ Tests de cas limites

### Statistiques des bugs trouvés

| Priorité | Nombre | % |
|----------|--------|---|
| 🔴 Critiques | [X] | [X]% |
| 🟠 Majeurs | [X] | [X]% |
| 🟡 Mineurs | [X] | [X]% |
| **TOTAL** | **[X]** | **100%** |

### Liste des bugs trouvés (résumé)

**Tous les détails sont dans notre board Trello :** [https://trello.com/b/JcKOFoZN/trelloprojetfinalweb]

#### 🟡 Bogues Mineurs

 - **Description :** [[Il y a une icône qui ne s’affiche pas sur la page d’accueil]]
 - **Impact :** [L’équipe a mal mis le lien une fois le site mis en ligne.]
 - **Statut chez eux :** [En cours]
 - **Carte Trello :** [https://trello.com/b/JcKOFoZN/trelloprojetfinalweb]

### Impression générale du projet testé

**Points forts observés :**

1. [Design cohérent et professionnel]
2. [Performance excellente]

**Axes d'amélioration identifiés :**

1. [Ex: Accessibilité au clavier à améliorer]
2. [Ex: Responsive mobile nécessite ajustements]

**Évaluation globale (1-5 étoiles) :**

- Facilité d'utilisation	[⭐⭐⭐⭐⭐]
- Stabilité	[⭐⭐⭐⭐⭐]
- Design[⭐⭐⭐⭐☆]
- Performance	[⭐⭐⭐⭐☆]
	
---

## 3. PARTIE 2A : Tests internes

### Ce que NOUS avons testé dans NOTRE projet

### Résumé des tests effectués

**Checklist complète (à ajuster en fonction de votre projet) :**

- [✅] Navigation entre toutes les salles/chapitres
- [✅] Ajout de mémoire / Lecture des chapitres
- [✅] Édition de mémoire / Système de choix
- [✅] Suppression de mémoire / Branches narratives
- [✅] Upload d'images / Tracking des conséquences
- [✅] Tags et filtres / Toutes les fins
- [✅] Recherche / Historique des décisions
- [✅] Responsive (mobile, tablette, desktop)
- [✅] Multi-navigateurs (Chrome, Firefox)
- [✅] Navigation au clavier
- [✅] Contraste des couleurs
- [✅] Alt text sur images
- [✅] Cas limites (formulaires vides, texte long, etc.)

### Environnements testés

RAS = Rien À Signaler

| Environnement | Testé | Résultat | Notes |
|---------------|-------|----------|-------|
| Chrome Desktop | ✅ | ✅ Fonctionne | RAS |
| Firefox Desktop | ✅ | ✅ Fonctionne | RAS |
| Edge Desktop | ✅ | ✅ | RAS|
| Mobile 375px | ✅ | ⚠️ Bogues trouvés | On voit pas les boutons |
| Tablette 768px | ✅ | ⚠️ Bogues trouvés | On voit pas les boutons |
| Desktop 1920px | ✅ | ✅ Fonctionne | RAS |

### Bogues trouvés dans notre propre projet

**En plus des bugs reçus de l'autre équipe, nous avons trouvé :**

| Bogue # | Titre | Priorité | Statut | Assigné à |
|-------|-------|----------|--------|-----------|
| [1] | [Image, une icône ne s’affiche pas sur la page d’accueil] | 🟡 |  En cours 🔄  | [Jad Saloumi] |
| [1] | [Mobile 375px, arranger la fin du texte de l’historique] | 🟡 |  En cours 🔄  | [Jad Saloumi] |

**Total bugs trouvés en interne :** [2]

---

## 4. PARTIE 2B : Bogues reçus

### Ce que l'AUTRE équipe a trouvé dans NOTRE projet

**Équipe qui nous a testés :** [Les Triples E]  
**Date de réception :** 6 décembre 2024

### Statistiques

| Priorité | Bogues reçus | Corrigés | En cours | Pas encore faits |
|----------|------------|----------|----------|------------------|
| 🔴 Critiques | [2] | ✅ |
| 🟠 Majeurs | [1] | 🔄|
| **TOTAL** | **[3]** | **[2]** | **[1]** | **[1]** |

### Liste détaillée des bugs reçus

#### 🔴 Bogues Critiques reçus

**Bogue #1 : [Absence de texte dans plusieurs passages narratifs]**

- **Description :** [Il n’y pas de narration pour expliquer le contexte.]
- **Étapes pour reproduire :** [Naviguer vers un chapitre, Observer que la narration n’est pas présente]
- **Notre analyse :** [Confirmons-nous ? Est-ce vraiment critique ?]
- **Statut actuel (8 décembre) :** ✅ Corrigé
- **Plan de correction :** [Corrigé]
- **Assigné à :** [Elie Daher]
- **Date de correction :** [4 décembre 2025]

#### 🔴 Bogues Critiques reçus

**Bogue #2 : [Le site se brise complètement lorsqu’on fait un refresh]**

- **Description :** [Actualiser la page (F5 ou refresh navigateur) brise totalement le routing du site, le jeu affiche une page blanche ou un 404, rendant la progression impossible.]
- **Étapes pour reproduire :** [Lancer le projet, naviguer dans n’importe quel chapitre, faire Refresh (F5), observer que le site ne se recharge pas correctement et devient inutilisable.]
- **Notre analyse :** [Bogue Critique]
- **Statut actuel (8 décembre) :** ✅ Corrigé
- **Plan de correction :** [Ccorrigé]
- **Assigné à :** [Elie Daher]
- **Date de correction :** [4 décembre 2025]

#### 🟡 Bogues Majeurs reçus

- **Description :** [Sur mobile (375px), la partie inférieure de certaines pages est cachée, Impossible de lire tous les textes ou d’atteindre certains boutons.]
- **Étapes pour reproduire :** [ouvrir le projet en mode mobile (375px), naviguer dans plusieurs chapitres, constater que le bas de la scène ou les boutons sont partiellement coupés, scroll impossible ou limité.]
- **Notre analyse :** [Bogues Mineurs]
- **Statut actuel (8 décembre) :** En cours
- **Plan de correction :** [En cours]
- **Assigné à :** [Elie Daher]
- **Date de correction :** [4 décembre 2025]

- Voir Trello pour détails complets : [https://trello.com/b/bLSYDkwz/modele-kanban]

### Notre réaction aux bugs reçus

**Bogues que nous confirmons :**

- X bugs confirmés comme vrais bugs

**Bogues que nous contestons (avec justification) :**

- [Bogue #1] : C’est un bug critique, car il empêche les utilisateurs de comprendre l’histoire et de poursuivre.
- [Bogue #2] : C’est un bug critique, car il empêche les utilisateurs de poursuivre l’histoire une fois refresh le site.
- [Bogue #3] : C’est un bug mineur, car il empêche les utilisateurs de choisir les choix pour poursuivre l’histoire dans la version mobile 375px.
  
---

## 5. PARTIE 2C : Plan de corrections

### État au 8 décembre (aujourd'hui)

**Résumé de nos corrections :**

| Statut | Nombre | % du total |
|--------|--------|------------|
| ✅ Corrigés et validés | [X] | [X]% |
| 🔄 En cours (sera fait d'ici le 10) | [X] | [X]% |
| ⏸️ Reportés (si temps) | [X] | [X]% |
| ❌ Non corrigés (justifiés) | [X] | [X]% |

### Priorités de correction (8→10 décembre)

#### ✅ Déjà corrigés (avant le 8)

**Bogues critiques corrigés :**

1. **Bogue #1 : [Absence de texte dans plusieurs passages narratifs]**
   - Corrigé par : [Anton]
   - Date : [5 décembre]
   - Solution : [On n’avait pas terminé.]
   - Re-testé : ✅ Confirmé OK
     
  **Bogue #2 : [Le site se brise complètement lorsqu’on fait un refresh]**
   - Corrigé par : [Jad]
   - Date : [6 décembre]
   - Solution : [Bien le mettre en ligne]
   - Re-testé : ✅ Confirmé OK

#### 🔄 En cours (sera fait d'ici le 10)

  **Bogue Majeur #3 : [Responsive mobile – Bas de la page coupé / inaccessible]**

### Plan de travail (8-10 décembre)

**Lundi 8 (soir) :**

- [ ] Finir Bogue #3 (Jad et Matis - 2h)

---

## 6. Accessibilité

### Tests effectués

#### Navigation au clavier

| Test | Résultat | Action |
|------|----------|--------|
| Tab fonctionne sur tous les éléments | ✅ / ⚠️ / ❌ | [Si problème : plan de correction] |
| Focus visible | ✅ / ⚠️ / ❌ | |
| Enter/Space activent les boutons | ✅ / ⚠️ / ❌ | |
| Skip links présents (optionnel) | ✅ / ⚠️ / ❌ | |

**Problèmes trouvés :** [X]  
**Corrigés :** [X]  
**En cours :** [X]

#### Contraste des couleurs

**Tests effectués avec WebAIM Contrast Checker :**

RAS = Rien À Signaler

| Élément | Couleurs | Ratio | Conforme WCAG AA | Action |
|---------|----------|-------|------------------|--------|
| Texte principal | #333 sur #FFF | 12.6:1 | ✅ Excellent | RAS |
| Boutons | #FFF sur #007BFF | 4.5:1 | ✅ Conforme | RAS |
| Liens | #0066CC sur #FFF | 7.5:1 | ✅ Excellent | RAS |
| Texte secondaire | #888 sur #FFF | 3.5:1 | ❌ Trop faible | À corriger |

**Problèmes de contraste :** [X]  
**Plan de correction :** [Détails]

#### Images et médias

| Test | Résultat | Notes |
|------|----------|-------|
| Toutes les images ont un alt | ✅ [X]/[Y] | [X] images sans alt à corriger |
| Alt descriptifs (pas "image1.jpg") | ✅ / ⚠️ | [Détails si problèmes] |
| Images décoratives avec alt="" | ✅ / ⚠️ | [Détails] |

### Score global d'accessibilité

**Résumé :**

- Navigation clavier : [X]/[Y] tests passés
- Contraste : [X]/[Y] éléments conformes
- Images : [X]/[Y] avec alt approprié

**Score estimé : [X]/100**

---

## 7. Performance

### Tests Lighthouse

**Configuration :**

- Mode : Desktop ET Mobile
- Options : Performance, Accessibility, Best Practices

#### Résultats Desktop

| Page | Performance | Accessibility | Best Practices | Notes |
|------|-------------|---------------|----------------|-------|
| Accueil | [X]/100 | [X]/100 | [X]/100 | [Commentaires] |
| [Page principale] | [X]/100 | [X]/100 | [X]/100 | [Commentaires] |

#### Résultats Mobile

| Page | Performance | Accessibility | Best Practices | Notes |
|------|-------------|---------------|----------------|-------|
| Accueil | [X]/100 | [X]/100 | [X]/100 | [Commentaires] |
| [Page principale] | [X]/100 | [X]/100 | [X]/100 | [Commentaires] |

**Screenshots Lighthouse :** Voir annexes

### Optimisations effectuées

#### Compression des images

| Avant | Après | Économie |
|-------|-------|----------|
| [X] MB total | [X] MB total | [X]% économisés |
| [X] images | [X] images compressées | Outil : TinyPNG |

**Exemples :**

- `image1.jpg` : 5.2 MB → 1.8 MB (65% économie)
- `background.png` : 3.1 MB → 800 KB (74% économie)

#### Autres optimisations

- ✅ Ajout de `loading="lazy"` sur [X] images
- ✅ Minification du code (build production)
- ✅ Suppression de console.log()
- ⏸️ À faire : [Si applicable]

### Temps de chargement

**Tests manuels (connexion normale) :**

- Page d'accueil : [X] secondes
- Page principale : [X] secondes
- Page la plus lourde : [X] secondes

**Objectif :** < 3 secondes  
**Atteint :** ✅ Oui / ⚠️ Partiellement / ❌ Non

---

## 8. Conclusion

### État global du projet au 8 décembre

**Le projet est-il prêt pour la remise finale ?**
⚠️ Presque, corrections en cours

**Résumé de la qualité :**

| Aspect | État | Commentaire |
|--------|------|-------------|
| **Fonctionnalités principales** | ✅ | 
| **Bogues critiques** | ✅ Tous corrigés |
| **Bogues majeurs** | ⚠️ | [1] corrigés |
| **Accessibilité** | ✅ | Score : [80]/100 |
| **Performance** | ✅ | Lighthouse : [80]/100 |
| **Responsive** | ⚠️ | [En cours] |

### Bilan des tests

**Statistiques globales :**

- **Bogues trouvés (tous) :** [X] (internes + reçus)
- **Bogues corrigés :** [X] ([X]%)
- **Bogues en cours :** [X] (seront corrigés d'ici le 10)
- **Bogues mineurs reportés :** [X]

**Temps total consacré au QA :** [X] heures

### Ce qui fonctionne bien ✅

1. [Toutes les fonctionnalités principales sont stables]
2. [Design responsive sur tous les appareils]

### Défis rencontrés et solutions 🔧

1. **Défi :** [Bogues difficiles à reproduire (Responsive mobile – Bas de la page coupé / inaccessible)]
   - **Solution :** [Faire des recherches]

### Apprentissages 📚

**Ce que nous avons appris durant le processus QA :**

1. [L'importance de tester sur vrais appareils, pas juste DevTools]

### Confiance pour la remise finale 🎯

**Sur une échelle de 1 à 10, notre confiance est : [8]/10**

**Justification :**
[2-3 phrases expliquant pourquoi vous êtes confiant ou quelles sont vos inquiétudes restantes]

Nous avons déjà complété la majorité des fonctionnalités essentielles et les tests réalisés jusqu’à maintenant montrent que le système est stable. Il reste toutefois quelques ajustements mineurs et validations finales à effectuer, ce qui explique pourquoi nous ne sommes pas encore à 10/10.
---

## 9. Annexes

**Board Trello avec tous les bugs :** [https://trello.com/b/bLSYDkwz/modele-kanban]

**Organisation du board :**

- Colonne "Bogues trouvés" : [3] cartes
- Colonne "En correction" : [1] cartes
- Colonne "À valider" : [1] cartes
- Colonne "Corrigé" : [2] cartes

### Annexe E : Métriques additionnelles

**Commits Git durant la phase QA :**

- [7 décembre] : [1] commits (corrections bugs)

---

## ✅ Signatures

**Ce rapport a été rédigé et validé par :**

- [Jad Saloumi] - [Chef] - Date : [7 décembre]

**Nous confirmons que ce rapport reflète fidèlement l'état de notre projet et de notre processus QA.**

---

**Date de dernière mise à jour :** 8 décembre 2024  
