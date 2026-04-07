# Calendar Redesign — Design Spec

**Date:** 2026-04-08
**Status:** Approved

## Objectif

Unifier les 3 vues du calendrier (`CalendarDays`, `CalendarMonths`, `CalendarYears`) sous un thème cohérent : clair, épuré, carte flottante avec ombre. Actuellement, `CalendarDays` utilise des styles inline avec un thème sombre, tandis que `CalendarMonths` et `CalendarYears` utilisent Tailwind avec un thème clair — incohérence majeure.

## Direction de design

- **Thème :** Clair & Épuré (fond blanc, textes gris foncé)
- **Contenant :** Carte flottante — fond blanc, `border-radius: 16px`, ombre `0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)`
- **Accent :** Ambre `#f59e0b` (sélection, état actif)
- **Polices :** Système (sans-serif) — suppression des polices `DM Mono` et `Playfair Display`
- **Implémentation :** Tailwind CSS uniformément sur les 3 vues

## Approche

Redesign complet des 3 vues (Approche 2) — migration de `CalendarDays` vers Tailwind + thème clair, mise à jour de `CalendarMonths` et `CalendarYears` pour correspondre au nouveau style de carte et de navigation. Pas de refactoring architectural (pas de `CalendarShell` partagé).

## Spécifications par composant

### CalendarDays

**Carte conteneur**
- `bg-white rounded-2xl p-4 my-2.5` + style inline `boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)'`
- (Tailwind `shadow-lg` ne correspond pas à l'ombre cible — valeur inline explicite)

**Hint (texte d'instruction)**
- Classes communes : `text-[10px] text-center mb-2.5 tracking-wide min-h-[14px]`
- État vide (aucune plage) : `text-gray-300` — "Cliquez sur le premier jour"
- État en attente (1er point posé) : `text-gray-400` — "Cliquez sur le dernier jour de la plage"
- État avec plage : `text-gray-400` — "Nouvelle plage · cliquer pour retirer"

**Navigation (boutons ‹ ›)**
- `w-7 h-7 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors text-lg`

**Titre (Mois / Année)**
- Mois : `text-[15px] font-semibold text-gray-900 hover:text-amber-500 transition-colors cursor-pointer`
- Année : `text-xs text-gray-400 italic hover:text-amber-500 transition-colors cursor-pointer`
- Conteneur : `flex items-baseline gap-1.5`

**En-têtes de jours (L M M J V S D)**
- `text-[9px] text-gray-300 font-semibold text-center tracking-[0.06em] py-0.5`

**Cellules de jours**
- Base : `text-[11px] text-center py-1.5 rounded-lg border-none cursor-pointer transition-all`
- Défaut : `text-gray-700 hover:bg-gray-100`
- Endpoint (début/fin de plage) : `bg-amber-400 text-white font-bold rounded-lg`
- In-range : `bg-amber-50 text-amber-600 rounded-sm`
- Preview (survol pendant sélection) : `bg-amber-50/60 text-amber-500`
- Hover simple : `bg-gray-100 text-gray-800`
- Aujourd'hui : point ambre `w-1 h-1 rounded-full bg-amber-400` en `position: absolute bottom-0.5 left-1/2 -translate-x-1/2`

**Séparateur avant les actions**
- `border-t border-gray-100 mt-3 pt-3`

**Bouton "Effacer"**
- Désactivé : `flex-1 py-2 text-xs text-gray-300 border border-gray-100 rounded-xl font-mono cursor-not-allowed`
- Actif : `flex-1 py-2 text-xs text-red-400 border border-red-100 rounded-xl font-mono hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer`

**Bouton "Valider"**
- Désactivé : `flex-[2] py-2 text-xs font-semibold bg-gray-100 text-gray-300 rounded-xl font-mono cursor-not-allowed`
- Actif : `flex-[2] py-2 text-xs font-semibold bg-amber-400 text-white rounded-xl font-mono hover:bg-amber-500 transition-colors cursor-pointer`

### CalendarMonths

**Carte conteneur**
- Même style que CalendarDays : `bg-white rounded-2xl p-4 my-2.5` + même `boxShadow` inline

**Navigation**
- Même style que CalendarDays (boutons bordés `bg-gray-50 border-gray-200`)
- Titre : année en ambre `text-amber-500 font-semibold text-[15px] hover:text-amber-600 cursor-pointer`

**Grille de mois (4 colonnes)**
- Base : `py-2 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded-xl hover:bg-amber-50 hover:text-amber-600 hover:border-amber-100 transition-colors cursor-pointer`
- Actif (mois courant) : `py-2 text-xs font-semibold text-white bg-amber-400 rounded-xl cursor-pointer`
- `gap-1.5`

**Retour**
- `border-t border-gray-100 pt-2.5 mt-1`
- Bouton : `w-full py-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors`

### CalendarYears

**Carte conteneur**
- Même style : `bg-white rounded-2xl p-4 my-2.5` + même `boxShadow` inline

**Navigation**
- Même boutons bordés
- Plage d'années : `text-xs font-semibold text-gray-500 tracking-wide` (ex: `2016 – 2031`)

**Grille d'années (4 colonnes)**
- Identique à la grille de mois
- Année courante en ambre plein

**Retour**
- Même style que CalendarMonths

## États interactifs — résumé

| État | Background | Texte | Border-radius |
|---|---|---|---|
| Défaut | transparent | `text-gray-700` | `rounded-lg` |
| Hover | `bg-gray-100` | `text-gray-800` | `rounded-lg` |
| Endpoint | `bg-amber-400` | `text-white font-bold` | `rounded-lg` |
| In-range | `bg-amber-50` | `text-amber-600` | `rounded-sm` |
| Preview | `bg-amber-50/60` | `text-amber-500` | `rounded-sm` |
| Aujourd'hui | transparent + point | `text-gray-700` | `rounded-lg` |

## Ce qui ne change pas

- Logique de sélection de plages (inchangée)
- Props et interfaces des composants (inchangées)
- Structure JSX globale (inchangée)
- Fichier `Calendar.jsx` (orchestrateur — non modifié)
- `countDays`, `DAYS_FR`, `MONTHS_FR`, `toISO` (utilitaires — non modifiés)
