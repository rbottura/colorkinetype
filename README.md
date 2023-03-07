# colorkinetype  

 Ensemble de projets pour faire bouger des lettres texturés. Il y a plus de détail pour chaque application dans leur dossier respectif.

### Description des 4 dossiers dans l'ordre de leur utilité.

- ### dotFont_gen :
<img src="./thumbnails/dotfont_gen.png" width="70%">

Dotted Font Generator est un programme écrit avec la librairie **P5.js** qui permets de sauvegarder des fichiers images de glyphes noires grillagés par des lignes blanches.

- ### opencvjs  

<img src="./thumbnails/opencv.png" width="80%">

**OpenCV.js** est une librairie javascript dérivé de la librairie python **OpenCV**. Ce dossier renferme une petite app web qui permets de selectionner dans notre ordinateur un ou plusieurs fichiers images (de préférence obtenus par dotFont_gen) et de sortir une array à 3 dimensions \[**glyphe**][**points**][**coordonnée x ou y**].
  

- ### render_matter

<img src="./thumbnails/render_matter.png" width="80%">  

Ce dossier utilise à la fois **P5.js** et **Matter.js** pour le rendu graphique. Une fois les lettres décomposés en un lot de points dans un espace 2D, nous pouvons créer des particules avec textures et des comportements physiques grâce à matter.js et enregistrer des séquences grâce au plugin P5 : **P5.capture**.

- ### openType  

<img src="./thumbnails/opentype.png">
Le projet de ce dossier correspond à 2 jours de travail avec Vincent Maillard, pour faire fonctionner la librairie **opentype.js** et les ressources dont nous disposons, c'est à dire les tableaux de coordonnées de points.

# Compiler 

! ATTENTION !
Pas compiler au sens informatique du terme mais compiler dans le sens que les dossiers dotFont_gen, opencvjs et render_matter peuvent exister en une seule application.