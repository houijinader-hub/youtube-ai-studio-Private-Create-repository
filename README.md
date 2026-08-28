# YouTube AI Studio

Prototype web d’un studio de préparation de vidéos YouTube assisté par IA.

## Fonctionnalités actuelles

- Saisie d’un sujet, format, durée, langue, ton et type de voix
- Génération locale d’un script structuré
- Storyboard automatique scène par scène
- Sous-titres SRT
- Export du projet au format JSON
- Sauvegarde locale dans le navigateur
- Interface responsive mobile/desktop

## Déploiement

Le projet est volontairement sans build : `index.html` peut être servi directement par Vercel.

## Prochaine étape

Brancher des API serveur sécurisées pour :

1. génération de script par LLM ;
2. génération d’images/vidéos par scène ;
3. synthèse vocale ;
4. assemblage et rendu MP4 ;
5. génération de miniature et métadonnées YouTube.

Ne jamais placer de clé API directement dans `index.html` : utiliser des variables d’environnement et des fonctions serveur.
