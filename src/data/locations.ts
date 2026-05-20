// locations.ts - Version FR N64

export interface Location {
  id: string;
  name: string;
  region: string;
  type: 'main' | 'dungeon' | 'grotto' | 'interior' | 'final' | 'overworld' | 'shop' | 'reward';
  icon: string;
  x: number;
  y: number;
  requirements?: string[];
  checks: Check[];
}

export interface Check {
  name: string;
  description?: string;
  requirements?: string[];
}

// ==================== THE LEGEND OF ZELDA: OCARINA OF TIME ====================
export const ootLocations: Location[] = [
  // ==================== FORÊT KOKIRI ====================
  {
    id: 'kokiri-forest',
    name: 'Forêt Kokiri',
    region: 'Forêt Kokiri',
    type: 'main',
    icon: '🌲',
    x: 30,
    y: 65,
    checks: [
      { name: 'Coffre de l\'Épée Kokiri', requirements: ['Accès petit passage'] },
      { name: 'Coffre haut gauche - Maison de Mido', requirements: ['Épée Kokiri', 'Bouclier Mojo'] },
      { name: 'Coffre haut droite - Maison de Mido', requirements: ['Épée Kokiri', 'Bouclier Mojo'] },
      { name: 'Coffre bas gauche - Maison de Mido', requirements: ['Épée Kokiri', 'Bouclier Mojo'] },
      { name: 'Coffre bas droite - Maison de Mido', requirements: ['Épée Kokiri', 'Bouclier Mojo'] },
      { name: 'Maison des Sache-tout' },
      { name: 'Boutique Kokiri', requirements: ['Rubis'] }
    ]
  },
  {
    id: 'lost-woods',
    name: 'Bois Perdus',
    region: 'Forêt Kokiri',
    type: 'main',
    icon: '🌳',
    x: 28,
    y: 60,
    checks: [
      { name: 'Cible des Bois Perdus', requirements: ['Lance-pierre'] },
      { name: 'Grotte Mojo', requirements: ['Sac de bombes', 'Rubis'] },
      { name: 'Pont des Bois Perdus', requirements: ['Ocarina'] },
      { name: 'Jeu de mémoire Ocarina', requirements: ['Ocarina'] },
      { name: 'Skull Kid', requirements: ['Chant de Saria'] }
    ]
  },
  {
    id: 'sacred-forest-meadow',
    name: 'Clairière Sacrée',
    region: 'Forêt Kokiri',
    type: 'main',
    icon: '🏞️',
    x: 25,
    y: 55,
    checks: [
      { name: 'Grotte Wolfos', requirements: ['Sac de bombes'] },
      { name: 'Chant de Saria', requirements: ['Lettre de Zelda', 'Accès Clairière Sacrée'] }
    ]
  },

  // ==================== PLAINE D'HYRULE ====================
  {
    id: 'hyrule-field',
    name: 'Plaine d\'Hyrule',
    region: 'Plaine d\'Hyrule',
    type: 'main',
    icon: '🏞️',
    x: 50,
    y: 50,
    checks: [
      { name: 'Grotte ouverte', requirements: ['Sac de bombes'] },
      { name: 'Grotte sud-est', requirements: ['Sac de bombes'] },
      { name: 'Grotte Tektite (Pièce de Cœur)', requirements: ['Sac de bombes', 'Boomerang'] }
    ]
  },

  // ==================== BOURG D'HYRULE / CHÂTEAU ====================
  {
    id: 'hyrule-castle',
    name: 'Château d\'Hyrule',
    region: 'Bourg d\'Hyrule',
    type: 'main',
    icon: '🏰',
    x: 55,
    y: 45,
    checks: [
      { name: 'Stand de tir du Marché', requirements: ['Lance-pierre'] },
      { name: 'Œuf de Malon', requirements: ['Parler à Malon'] },
      { name: 'Lettre de Zelda', requirements: ['Œuf bizarre'] },
      { name: 'Grande Fée', requirements: ['Sac de bombes', 'Chant de Zelda'] }
    ]
  },
  {
    id: 'market',
    name: 'Marché',
    region: 'Bourg d\'Hyrule',
    type: 'main',
    icon: '🏘️',
    x: 53,
    y: 48,
    checks: [
      { name: 'Bombchu Bowling - 1er prix' },
      { name: 'Bombchu Bowling - 2ème prix' },
      { name: 'Chien perdu' },
      { name: 'Coffre du jeu du coffre' },
      { name: '10 Grands Poes' }
    ]
  },

  // ==================== VILLAGE COCORICO ====================
  {
    id: 'kakariko-village',
    name: 'Village Cocorico',
    region: 'Village Cocorico',
    type: 'main',
    icon: '🏘️',
    x: 45,
    y: 40,
    checks: [
      { name: 'Grotte ouverte', requirements: ['Sac de bombes'] },
      { name: 'Grotte des Redeads', requirements: ['Sac de bombes', 'Chant du Soleil'] },
      { name: 'Stand de tir Cocorico', requirements: ['Arc'] },
      { name: 'Anju (adulte)', requirements: ['Accès adulte'] },
      { name: '20 Skulltulas d\'Or', requirements: ['20 jetons'] },
      { name: '30 Skulltulas d\'Or', requirements: ['30 jetons'] },
      { name: '40 Skulltulas d\'Or', requirements: ['40 jetons'] },
      { name: '50 Skulltulas d\'Or', requirements: ['50 jetons'] }
    ]
  },
  {
    id: 'graveyard',
    name: 'Cimetière',
    region: 'Village Cocorico',
    type: 'main',
    icon: '🪦',
    x: 43,
    y: 38,
    checks: [
      { name: 'Tour de Fossoyeur (Dampe)', requirements: ['Link adulte', 'Nuit', 'Rubis'] },
      { name: 'Tombeau du Bouclier', requirements: ['Chant de Zelda'] },
      { name: 'Pièce de Cœur (vol libre)', requirements: ['Grappin'] }
    ]
  },

  // ==================== MONT DU PÉRIL ====================
  {
    id: 'death-mountain-trail',
    name: 'Sentier du Péril',
    region: 'Mont du Péril',
    type: 'main',
    icon: '⛰️',
    x: 65,
    y: 35,
    checks: [
      { name: 'Coffre du Mont du Péril', requirements: ['Sac de bombes'] },
      { name: 'Grande Fée', requirements: ['Sac de bombes', 'Chant de Zelda'] },
      { name: 'Pièce de Cœur (extérieur)', requirements: ['Sac de bombes'] }
    ]
  },
  {
    id: 'goron-city',
    name: 'Village Goron',
    region: 'Mont du Péril',
    type: 'main',
    icon: '🗿',
    x: 68,
    y: 30,
    checks: [
      { name: 'Coffre gauche du labyrinthe', requirements: ['Bombes'] },
      { name: 'Coffre droite du labyrinthe', requirements: ['Bombes'] },
      { name: 'Pièce de Cœur du pot', requirements: ['Bombes fleurs'] },
      { name: 'Goron roulant (enfant)', requirements: ['Bombes fleurs', 'Link enfant'] },
      { name: 'Goron roulant (adulte)', requirements: ['Sac de bombes', 'Link adulte'] }
    ]
  },
  {
    id: 'death-mountain-crater',
    name: 'Cratère du Mont du Péril',
    region: 'Mont du Péril',
    type: 'main',
    icon: '🌋',
    x: 70,
    y: 32,
    checks: [
      { name: 'Grande Fée du Cratère' }
    ]
  },

  // ==================== DOMAINE ZORA ====================
  {
    id: 'zora-river',
    name: 'Rivière Zora',
    region: 'Domaine Zora',
    type: 'main',
    icon: '🏞️',
    x: 75,
    y: 50,
    checks: [
      { name: 'Grotte ouverte', requirements: ['Sac de bombes'] },
      { name: 'Jeu des grenouilles', requirements: ['Ocarina'] }
    ]
  },
  {
    id: 'zora-domain',
    name: 'Domaine Zora',
    region: 'Domaine Zora',
    type: 'main',
    icon: '🐟',
    x: 78,
    y: 48,
    checks: [
      { name: 'Mini-jeu de plongée', requirements: ['Progression écailles'] },
      { name: 'Roi Zora dégivré', requirements: ['Feu bleu'] }
    ]
  },
  {
    id: 'zora-fountain',
    name: 'Fontaine Zora',
    region: 'Domaine Zora',
    type: 'main',
    icon: '💧',
    x: 80,
    y: 45,
    checks: [
      { name: 'Grande Fée de la Fontaine' }
    ]
  },

  // ==================== LAC HYLIA ====================
  {
    id: 'lake-hylia',
    name: 'Lac Hylia',
    region: 'Lac Hylia',
    type: 'main',
    icon: '💧',
    x: 60,
    y: 65,
    checks: [
      { name: 'Pêche (enfant)', requirements: ['Link enfant'] },
      { name: 'Pêche (adulte)', requirements: ['Link adulte'] },
      { name: 'Objet sous-marin', requirements: ['Écaille'] },
      { name: 'Cible du soleil', requirements: ['Arc'] }
    ]
  },

  // ==================== RÉGION GERUDO ====================
  {
    id: 'gerudo-valley',
    name: 'Vallée Gerudo',
    region: 'Région Gerudo',
    type: 'main',
    icon: '🏜️',
    x: 35,
    y: 70,
    checks: [
      { name: 'Coffre du toit', requirements: ['Grappin'] }
    ]
  },
  {
    id: 'gerudo-fortress',
    name: 'Forteresse Gerudo',
    region: 'Région Gerudo',
    type: 'main',
    icon: '🏰',
    x: 30,
    y: 72,
    checks: [
      { name: 'Carte des Gerudos', requirements: ['Libérer les charpentiers'] },
      { name: 'Coffre de la Forteresse', requirements: ['Carte Gerudo'] }
    ]
  },
  {
    id: 'haunted-wasteland',
    name: 'Désert Hanté',
    region: 'Région Gerudo',
    type: 'main',
    icon: '🏜️',
    x: 28,
    y: 75,
    checks: [
      { name: 'Coffre du Désert Hanté', requirements: ['Lentille de Vérité'] }
    ]
  },
  {
    id: 'desert-colossus',
    name: 'Colosse du Désert',
    region: 'Région Gerudo',
    type: 'main',
    icon: '🗿',
    x: 25,
    y: 78,
    checks: [
      { name: 'Grande Fée du Colosse' }
    ]
  },

  // ==================== DONJONS - OOT ====================
  {
    id: 'deku-tree',
    name: 'Arbre Mojo',
    region: 'Donjons',
    type: 'dungeon',
    icon: '🌳',
    x: 28,
    y: 62,
    requirements: ['Épée Kokiri', 'Bouclier Mojo'],
    checks: [
      { name: 'Coffre Boussole' },
      { name: 'Lance-pierre' },
      { name: 'Coffre Carte' },
      { name: 'Cœur de Gohma' }
    ]
  },
  {
    id: 'dodongos-cavern',
    name: 'Caverne Dodongo',
    region: 'Donjons',
    type: 'dungeon',
    icon: '🦎',
    x: 66,
    y: 34,
    requirements: ['Sac de bombes'],
    checks: [
      { name: 'Coffre Carte' },
      { name: 'Coffre Boussole' },
      { name: 'Coffre Sac de Bombes' },
      { name: 'Cœur de Dodongo' }
    ]
  },
  {
    id: 'jabu-jabu',
    name: 'Jabu-Jabu',
    region: 'Donjons',
    type: 'dungeon',
    icon: '🐟',
    x: 79,
    y: 47,
    requirements: ['Lettre de Ruto'],
    checks: [
      { name: 'Boomerang' },
      { name: 'Coffre Carte' },
      { name: 'Coffre Boussole' },
      { name: 'Cœur de Barinade' }
    ]
  },
  {
    id: 'forest-temple',
    name: 'Temple de la Forêt',
    region: 'Donjons',
    type: 'dungeon',
    icon: '🌲',
    x: 22,
    y: 52,
    requirements: ['Arc', 'Grappin'],
    checks: [
      { name: 'Coffre du Temple' },
      { name: 'Coffre Carte' },
      { name: 'Arc' },
      { name: 'Cœur de Phantom Ganon' }
    ]
  },
  {
    id: 'fire-temple',
    name: 'Temple du Feu',
    region: 'Donjons',
    type: 'dungeon',
    icon: '🔥',
    x: 69,
    y: 28,
    requirements: ['Tunique Goron', 'Marteau', 'Grappin'],
    checks: [
      { name: 'Coffre Carte' },
      { name: 'Marteau des Titans' },
      { name: 'Coffre Boussole' },
      { name: 'Cœur de Volvagia' }
    ]
  },
  {
    id: 'water-temple',
    name: 'Temple de l\'Eau',
    region: 'Donjons',
    type: 'dungeon',
    icon: '💧',
    x: 58,
    y: 62,
    requirements: ['Tunique Zora', 'Grappin', 'Bottes de fer'],
    checks: [
      { name: 'Coffre Carte' },
      { name: 'Coffre Boussole' },
      { name: 'Long-Grappin' },
      { name: 'Cœur de Morpha' }
    ]
  },
  {
    id: 'shadow-temple',
    name: 'Temple de l\'Ombre',
    region: 'Donjons',
    type: 'dungeon',
    icon: '🌑',
    x: 42,
    y: 36,
    requirements: ['Bottes de Pégase', 'Lentille de Vérité', 'Grappin'],
    checks: [
      { name: 'Coffre Carte' },
      { name: 'Bottes de Pégase' },
      { name: 'Coffre Boussole' },
      { name: 'Cœur de Bongo Bongo' }
    ]
  },
  {
    id: 'spirit-temple',
    name: 'Temple de l\'Esprit',
    region: 'Donjons',
    type: 'dungeon',
    icon: '🏜️',
    x: 24,
    y: 76,
    requirements: ['Bouclier Miroir', 'Grappin', 'Gantelets d\'argent'],
    checks: [
      { name: 'Escalade enfant', requirements: ['Link enfant', 'Bombes'] },
      { name: 'Coffre Carte' },
      { name: 'Gantelets d\'argent' },
      { name: 'Coffre Boussole' },
      { name: 'Bouclier Miroir' },
      { name: 'Cœur de Twinrova' }
    ]
  },
  {
    id: 'ganons-castle',
    name: 'Château de Ganon',
    region: 'Donjons',
    type: 'dungeon',
    icon: '🏰',
    x: 50,
    y: 20,
    requirements: ['Tous les Médaillons', 'Flèches de Lumière'],
    checks: [
      { name: 'Épreuve de la Forêt' },
      { name: 'Gantelets d\'or' },
      { name: 'Coffre Clé Boss' }
    ]
  }
];

// ==================== THE LEGEND OF ZELDA: MAJORA'S MASK ====================
export const mmLocations: Location[] = [
  // ==================== BOURG-CLOCHER ====================
  {
    id: 'south-clock-town',
    name: 'Bourg-Clocher Sud',
    region: 'Bourg-Clocher',
    type: 'main',
    icon: '🏘️',
    x: 48,
    y: 48,
    checks: [
      { name: 'Coffre Épée de départ' },
      { name: 'Commerce Mojo' }
    ]
  },
  {
    id: 'north-clock-town',
    name: 'Bourg-Clocher Nord',
    region: 'Bourg-Clocher',
    type: 'main',
    icon: '🏘️',
    x: 50,
    y: 42,
    checks: [
      { name: 'Tir à l\'arc #1' },
      { name: 'Vieille femme', requirements: ['Nuit 1'] },
      { name: 'Arbre nord' },
      { name: 'Cache-cache Bombers' },
      { name: 'Quiz Keaton', requirements: ['Masque du Lapin'] }
    ]
  },
  {
    id: 'east-clock-town',
    name: 'Bourg-Clocher Est',
    region: 'Bourg-Clocher',
    type: 'main',
    icon: '🏘️',
    x: 55,
    y: 45,
    checks: [
      { name: 'Coffre Est' },
      { name: 'Madame Aroma (bureau)' },
      { name: 'Réunion du maire', requirements: ['Masque du Couple'] },
      { name: 'Forge (Jour 2)' }
    ]
  },
  {
    id: 'west-clock-town',
    name: 'Bourg-Clocher Ouest',
    region: 'Bourg-Clocher',
    type: 'main',
    icon: '🏘️',
    x: 45,
    y: 45,
    checks: [
      { name: 'Récompense Banque #1' },
      { name: 'Récompense Banque #2' },
      { name: 'Récompense Banque #3' },
      { name: 'Sœurs Rosa' }
    ]
  },
  {
    id: 'stock-pot-inn',
    name: 'Auberge Marmite',
    region: 'Bourg-Clocher',
    type: 'interior',
    icon: '🏨',
    x: 52,
    y: 47,
    checks: [
      { name: 'Chambre staff', requirements: ['Quête Kafei'] },
      { name: 'Grand-mère (long)' },
      { name: 'Grand-mère (court)' },
      { name: 'Anju et Kafei' },
      { name: 'Toilette' }
    ]
  },

  // ==================== PLAINE DE TERMINA ====================
  {
    id: 'termina-field',
    name: 'Plaine de Termina',
    region: 'Plaine de Termina',
    type: 'main',
    icon: '🏞️',
    x: 40,
    y: 50,
    checks: [
      { name: 'Astronomie' },
      { name: 'Kamaro' },
      { name: 'Pierre à bavardages' }
    ]
  },

  // ==================== MARAIS DU SUD ====================
  {
    id: 'southern-swamp',
    name: 'Marais du Sud',
    region: 'Marais du Sud',
    type: 'main',
    icon: '🌿',
    x: 20,
    y: 60,
    checks: [
      { name: 'Tir à l\'arc #2', requirements: ['Arc'] },
      { name: 'Tour bateau touristique' },
      { name: 'Concours pictogramme', requirements: ['Boîte pictographique'] }
    ]
  },
  {
    id: 'deku-palace',
    name: 'Palais Mojo',
    region: 'Marais du Sud',
    type: 'main',
    icon: '👑',
    x: 15,
    y: 65,
    checks: [
      { name: 'Aire de jeu Mojo', requirements: ['Masque Mojo'] },
      { name: 'Course du majordome', requirements: ['Masque Mojo'] }
    ]
  },
  {
    id: 'woodfall-temple',
    name: 'Bois Cascade',
    region: 'Marais du Sud',
    type: 'dungeon',
    icon: '🏛️',
    x: 18,
    y: 56,
    requirements: ['Masque Mojo'],
    checks: [
      { name: 'Fée entrée temple', requirements: ['Arc', 'Chant d\'Éveil'] },
      { name: 'Arc du Héros' },
      { name: 'Cœur d\'Odolwa', requirements: ['Temple terminé'] }
    ]
  },

  // ==================== PIC DES NEIGES ====================
  {
    id: 'goron-village',
    name: 'Village Goron',
    region: 'Pic des Neiges',
    type: 'main',
    icon: '🗿',
    x: 62,
    y: 28,
    checks: [
      { name: 'Course Goron', requirements: ['Masque Goron', 'Baril poudre'] }
    ]
  },
  {
    id: 'snowhead-temple',
    name: 'Temple des Neiges',
    region: 'Pic des Neiges',
    type: 'dungeon',
    icon: '❄️',
    x: 66,
    y: 26,
    requirements: ['Masque Goron'],
    checks: [
      { name: 'Grotte Lentille', requirements: ['Lentille de Vérité'] },
      { name: 'Flèche de Feu' },
      { name: 'Cœur de Goht' }
    ]
  },

  // ==================== GRANDE BAIE ====================
  {
    id: 'romani-ranch',
    name: 'Ranch Romani',
    region: 'Grande Baie',
    type: 'main',
    icon: '🐮',
    x: 30,
    y: 35,
    checks: [
      { name: 'Escorte Romani', requirements: ['Epona', 'Arc'] },
      { name: 'Défense contre les aliens', requirements: ['Arc'] }
    ]
  },
  {
    id: 'great-bay-temple',
    name: 'Temple de la Baie',
    region: 'Grande Baie',
    type: 'dungeon',
    icon: '💧',
    x: 81,
    y: 57,
    requirements: ['Masque Zora'],
    checks: [
      { name: 'Course castors', requirements: ['Masque Zora'] },
      { name: 'Forteresse pirates', requirements: ['Grappin', 'Masque Zora'] },
      { name: 'Flèche de Glace' },
      { name: 'Cœur de Gyorg' }
    ]
  },

  // ==================== VALLÉE D'IKANA ====================
  {
    id: 'ikana-graveyard',
    name: 'Cimetière d\'Ikana',
    region: 'Vallée d\'Ikana',
    type: 'main',
    icon: '🪦',
    x: 73,
    y: 72,
    checks: [
      { name: 'Père de Pamela', requirements: ['Masque Gibdo', 'Chant de soin'] }
    ]
  },
  {
    id: 'stone-tower-temple',
    name: 'Tour de Pierre',
    region: 'Vallée d\'Ikana',
    type: 'dungeon',
    icon: '🗿',
    x: 71,
    y: 77,
    requirements: ['Flèches de Lumière', 'Masque du Géant'],
    checks: [
      { name: 'Maison boîte à musique', requirements: ['Route Gibdo'] },
      { name: 'Sanctuaire secret', requirements: ['Flèches de Lumière'] },
      { name: 'Énigme Elegy', requirements: ['Élégie du Vide'] },
      { name: 'Accès inversé', requirements: ['Flèches de Lumière'] },
      { name: 'Masque du Géant' },
      { name: 'Flèche de Lumière' },
      { name: 'Cœur de Twinmold', requirements: ['Masque du Géant'] }
    ]
  },

  // ==================== LUNE ====================
  {
    id: 'the-moon',
    name: 'La Lune',
    region: 'Termina',
    type: 'final',
    icon: '🌙',
    x: 50,
    y: 10,
    requirements: ['Tous les Restes'],
    checks: [
      { name: 'Enfant Majora' },
      { name: 'Masque de la Puissance des Fées', requirements: ['Tous les Masques'] }
    ]
  }
];