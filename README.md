# 💰 Mon Pourboire

Application web de calcul et distribution équitable de pourboires entre membres d'une équipe, selon les jours réellement travaillés.

---

## ⚡ Fonctionnalités principales

🍽️ **Distribution équitable** : Calcul automatique du pourboire selon les jours travaillés par chaque membre

📅 **Sélection par calendrier** : Marquage des jours complets et demi-journées pour chaque employé

⚖️ **Calcul au prorata** : Part calculée selon le poids réel (jours pleins + ½ demi-journées) de chaque présence

👥 **Gestion d'équipe** : Ajout et suppression de membres avec persistance automatique

💾 **Sauvegarde locale** : L'équipe est mémorisée entre les sessions via le stockage du navigateur

---

## 🛠️ Architecture technique

**APIs utilisées :**
- Aucune API externe — 100% local, zéro dépendance réseau

**Composants clés :**
- `useMembers` : Hook de gestion de l'équipe avec persistance localStorage
- `useSelections` : Hook de sélection des jours/demi-journées par membre
- `Calendar` : Composant de sélection de plages de dates (jour, mois, années)
- `DistributeTab` : Onglet principal de calcul et affichage des parts
- `ResultCard` : Affichage du résultat de distribution
- `TeamTab` : Gestion de l'équipe persistée

**Utilitaires :**
- `dates.js` : Comptage et calcul des jours travaillés
- `format.js` : Formatage des montants

---

## 🚀 Lancer le projet

```bash
npm install
npm run dev
```

L'app tourne sur [http://localhost:5173](http://localhost:5173)

**Autres commandes :**

```bash
npm run build    # Build de production
npm run preview  # Prévisualiser le build
npm run lint     # Linter ESLint
```

---

## 🧱 Stack technique

| Outil | Version |
|-------|---------|
| React | 19 |
| Vite | 8 |
| Tailwind CSS | 4 |

APIs : Aucune (stockage navigateur uniquement)
Status : ● Fonctionnel
