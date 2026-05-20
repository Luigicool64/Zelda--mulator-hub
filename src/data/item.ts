// item.ts
export interface Item {
  obtained: any;
  id: string;
  name: string;
  category: 'equipment' | 'object' | 'mask' | 'medallion' | 'song' | 'quest' | 'remain';
  game: 'oot' | 'mm' | 'both';
  icon: string;
  imageUrl?: string;
  description: string;
}

const IMAGE_BASE_URL = '/image/items';
const OOT_IMAGES = `${IMAGE_BASE_URL}/oot`;
const MM_IMAGES = `${IMAGE_BASE_URL}/mm`;
const COMMON_IMAGES = `${IMAGE_BASE_URL}/common`;

// Tous les items des jeux Zelda N64 - Version FR N64 officielle (corrigée)
export const items: Item[] = [
  // ==================== ÉQUIPEMENTS - OOT ====================
  {
    id: 'kokiri-sword', name: 'Épée Kokiri', category: 'equipment', game: 'both', icon: '🗡️',
    imageUrl: `${COMMON_IMAGES}/kokiri-sword.png`, description: 'Épée de base de la forêt Kokiri', obtained: undefined
  },
  {
    id: 'master-sword', name: 'Master Sword', category: 'equipment', game: 'oot', icon: '⚔️',
    imageUrl: `${OOT_IMAGES}/master-sword.png`, description: 'L\'épée légendaire du Temple du Temps', obtained: undefined
  },
  {
    id: 'biggoron-sword', name: 'Lame de Biggoron', category: 'equipment', game: 'oot', icon: '🗡️',
    imageUrl: `${OOT_IMAGES}/biggoron-sword.png`, description: 'Épée surpuissante du forgeron Biggoron', obtained: undefined
  },
  {
    id: 'giant-knife', name: 'Couteau du Géant', category: 'equipment', game: 'oot', icon: '🔪',
    imageUrl: `${OOT_IMAGES}/giant-knife.png`, description: 'Couteau du géant, fragile mais puissant', obtained: undefined
  },
  {
    id: 'kokiri-shield', name: 'Bouclier Kokiri', category: 'equipment', game: 'oot', icon: '🛡️',
    imageUrl: `${OOT_IMAGES}/kokiri-shield.png`, description: 'Bouclier en bois de la forêt', obtained: undefined
  },
  {
    id: 'hylian-shield', name: 'Bouclier Hylien', category: 'equipment', game: 'oot', icon: '🛡️',
    imageUrl: `${OOT_IMAGES}/hylian-shield.png`, description: 'Bouclier emblématique d\'Hyrule', obtained: undefined
  },
  {
    id: 'oot-mirror-shield', name: 'Bouclier Miroir', category: 'equipment', game: 'oot', icon: '🪞',
    imageUrl: `${OOT_IMAGES}/mirror-shield.png`, description: 'Bouclier réfléchissant', obtained: undefined
  },
  {
    id: 'kokiri-tunic', name: 'Tunique Kokiri', category: 'equipment', game: 'oot', icon: '👕',
    imageUrl: `${OOT_IMAGES}/kokiri-tunic.png`, description: 'Tunique verte de la forêt', obtained: undefined
  },
  {
    id: 'goron-tunic', name: 'Tunique Goron', category: 'equipment', game: 'oot', icon: '🔥',
    imageUrl: `${OOT_IMAGES}/goron-tunic.png`, description: 'Résiste à la chaleur', obtained: undefined
  },
  {
    id: 'zora-tunic', name: 'Tunique Zora', category: 'equipment', game: 'oot', icon: '💧',
    imageUrl: `${OOT_IMAGES}/zora-tunic.png`, description: 'Permet de respirer sous l\'eau', obtained: undefined
  },
  {
    id: 'kokiri-boots', name: 'Bottes Kokiri', category: 'equipment', game: 'oot', icon: '👢',
    imageUrl: `${OOT_IMAGES}/kokiri-boots.png`, description: 'Bottes de base', obtained: undefined
  },
  {
    id: 'iron-boots', name: 'Bottes de plomb', category: 'equipment', game: 'oot', icon: '👢',
    imageUrl: `${OOT_IMAGES}/iron-boots.png`, description: 'Rester au fond de l\'eau', obtained: undefined
  },
  {
    id: 'hover-boots', name: 'Bottes de Pégase', category: 'equipment', game: 'oot', icon: '👢',
    imageUrl: `${OOT_IMAGES}/hover-boots.png`, description: 'Flotter dans les airs', obtained: undefined
  },
  {
    id: 'goron-bracelet', name: 'Bracelet Goron', category: 'equipment', game: 'oot', icon: '💪',
    imageUrl: `${OOT_IMAGES}/goron-bracelet.png`, description: 'Permet de soulever des rochers', obtained: undefined
  },
  {
    id: 'silver-gauntlets', name: 'Gantelets d\'argent', category: 'equipment', game: 'oot', icon: '🧤',
    imageUrl: `${OOT_IMAGES}/silver-gauntlets.png`, description: 'Soulever des blocs plus lourds', obtained: undefined
  },
  {
    id: 'gold-gauntlets', name: 'Gantelets d\'or', category: 'equipment', game: 'oot', icon: '🧤',
    imageUrl: `${OOT_IMAGES}/gold-gauntlets.png`, description: 'Soulever les blocs les plus lourds', obtained: undefined
  },

  // ==================== ÉQUIPEMENTS - MM ====================
  {
    id: 'razor-sword', name: 'Lame Rasoir', category: 'equipment', game: 'mm', icon: '⚔️',
    imageUrl: `${MM_IMAGES}/razor-sword.png`, description: 'Épée affûtée', obtained: undefined
  },
  {
    id: 'gilded-sword', name: 'Épée Dorée', category: 'equipment', game: 'mm', icon: '✨',
    imageUrl: `${MM_IMAGES}/gilded-sword.png`, description: 'Épée dorée du forgeron', obtained: undefined
  },
  {
    id: 'great-fairy-sword', name: 'Épée de la Grande Fée', category: 'equipment', game: 'mm', icon: '🧚',
    imageUrl: `${MM_IMAGES}/great-fairy-sword.png`, description: 'Épée magique de la Grande Fée', obtained: undefined
  },
  {
    id: 'hero-shield', name: 'Bouclier du Héros', category: 'equipment', game: 'mm', icon: '🛡️',
    imageUrl: `${MM_IMAGES}/hero-shield.png`, description: 'Bouclier du héros de Termina', obtained: undefined
  },
  {
    id: 'quiver', name: 'Carquois', category: 'equipment', game: 'both', icon: '🏹',
    imageUrl: `${COMMON_IMAGES}/quiver.png`, description: 'Contient des flèches', obtained: undefined
  },
{
    id: 'large-quiver', name: 'Grand carquois', category: 'equipment', game: 'both', icon: '🏹',
    imageUrl: `${COMMON_IMAGES}/large-quiver.png`, description: 'Contient plus de flèches', obtained: undefined
},
{
    id: 'giant-quiver', name: 'Géant carquois', category: 'equipment', game: 'both', icon: '🏹',
    imageUrl: `${COMMON_IMAGES}/giant-quiver.png`, description: 'Contient un grand nombre de flèches', obtained: undefined
},
 {
    id: 'bomb-bag', name: 'Sac de Bombes', category: 'equipment', game: 'both', icon: '🎒',
    imageUrl: `${COMMON_IMAGES}/bomb-bag.png`, description: 'Contient des bombes', obtained: undefined
  },
{
    id: 'large-bomb-bag', name: 'Grand Sac de Bombes', category: 'equipment', game: 'both', icon: '🎒',
    imageUrl: `${COMMON_IMAGES}/large-bomb-bag.png`, description: 'Contient plus de bombes', obtained: undefined
},
{
    id: 'giant-bomb-bag', name: 'Géant Sac de Bombes', category: 'equipment', game: 'both', icon: '🎒',
    imageUrl: `${COMMON_IMAGES}/giant-bomb-bag.png`, description: 'Contient un grand nombre de bombes', obtained: undefined
},
{
    id: 'wallet-adult', name: 'Portefeuille Adulte', category: 'equipment', game: 'both', icon: '👛',
    imageUrl: `${COMMON_IMAGES}/wallet-adult.png`, description: 'Portefeuille de l\'adulte', obtained: undefined
},
{
    id: 'wallet-giant', name: 'Portefeuille Géant', category: 'equipment', game: 'both', icon: '👛',
    imageUrl: `${COMMON_IMAGES}/wallet-giant.png`, description: 'Portefeuille du géant', obtained: undefined
},



  // ==================== OBJETS - OOT ====================
  {
    id: 'fairy-ocarina', name: 'Ocarina des Fées', category: 'object', game: 'oot', icon: '🎵',
    imageUrl: `${OOT_IMAGES}/fairy-ocarina.png`, description: 'Ocarina offert par Saria', obtained: undefined
  },
  {
    id: 'ocarina-time', name: 'Ocarina du Temps', category: 'object', game: 'both', icon: '🎵',
    imageUrl: `${COMMON_IMAGES}/ocarina-time.png`, description: 'Ocarina sacré du Temple du Temps', obtained: undefined
  },
  {
    id: 'slingshot', name: 'Lance-pierre', category: 'object', game: 'oot', icon: '🪀',
    imageUrl: `${OOT_IMAGES}/slingshot.png`, description: 'Tire des noix Mojo', obtained: undefined
  },
  {
    id: 'fairy-bow', name: 'Arc des Fées', category: 'object', game: 'oot', icon: '🏹',
    imageUrl: `${OOT_IMAGES}/fairy-bow.png`, description: 'Arc magique', obtained: undefined
  },
  {
    id: 'fire-arrows', name: 'Flèches de Feu', category: 'object', game: 'both', icon: '🔥',
    imageUrl: `${COMMON_IMAGES}/fire-arrows.png`, description: 'Flèches enflammées', obtained: undefined
  },
  {
    id: 'ice-arrows', name: 'Flèches de Glace', category: 'object', game: 'both', icon: '❄️',
    imageUrl: `${COMMON_IMAGES}/ice-arrows.png`, description: 'Flèches gelantes', obtained: undefined
  },
  {
    id: 'light-arrows', name: 'Flèches de Lumière', category: 'object', game: 'both', icon: '✨',
    imageUrl: `${COMMON_IMAGES}/light-arrows.png`, description: 'Flèches sacrées', obtained: undefined
  },
  {
    id: 'boomerang', name: 'Boomerang', category: 'object', game: 'oot', icon: '🪃',
    imageUrl: `${OOT_IMAGES}/boomerang.png`, description: 'Attrape des objets', obtained: undefined
  },
  {
    id: 'hookshot', name: 'Grappin', category: 'object', game: 'mm', icon: '🔗',
    imageUrl: `${MM_IMAGES}/hookshot.png`, description: 'S\'accrocher aux cibles', obtained: undefined
  },
  {
    id: 'longshot', name: 'Long-Grappin', category: 'object', game: 'oot', icon: '⛓️',
    imageUrl: `${OOT_IMAGES}/longshot.png`, description: 'Version longue du grappin', obtained: undefined
  },
  {
    id: 'magic-beans', name: 'Haricot magique', category: 'object', game: 'both', icon: '🫘',
    imageUrl: `${COMMON_IMAGES}/magic-beans.png`, description: 'Pousse dans les trous', obtained: undefined
  },
  {
    id: 'lens-truth', name: 'Monocle de Vérité', category: 'object', game: 'both', icon: '👁️',
    imageUrl: `${COMMON_IMAGES}/lens-truth.png`, description: 'Voir l\'invisible', obtained: undefined
  },
  {
    id: 'hammer', name: 'Marteau des Titans', category: 'object', game: 'oot', icon: '🔨',
    imageUrl: `${OOT_IMAGES}/hammer.png`, description: 'Écrase les ennemis', obtained: undefined
  },
  {
    id: 'empty-bottle1', name: 'Bouteille vide', category: 'object', game: 'both', icon: '🍾',
    imageUrl: `${COMMON_IMAGES}/empty-bottle.png`, description: 'Peut contenir divers liquides', obtained: undefined
  },
  {
    id: 'empty-bottle2', name: 'Bouteille vide', category: 'object', game: 'both', icon: '🍾',
    imageUrl: `${COMMON_IMAGES}/empty-bottle.png`, description: 'Peut contenir divers liquides', obtained: undefined
  },
  {
    id: 'empty-bottle3', name: 'Bouteille vide', category: 'object', game: 'both', icon: '🍾',
    imageUrl: `${COMMON_IMAGES}/empty-bottle.png`, description: 'Peut contenir divers liquides', obtained: undefined
  },
  {
    id: 'empty-bottle4', name: 'Bouteille vide', category: 'object', game: 'both', icon: '🍾',
    imageUrl: `${COMMON_IMAGES}/empty-bottle.png`, description: 'Peut contenir divers liquides', obtained: undefined
  },

  // ==================== OBJETS - MM ====================
  {
    id: 'hero-bow', name: 'Arc du Héros', category: 'object', game: 'mm', icon: '🏹',
    imageUrl: `${MM_IMAGES}/hero-bow.png`, description: 'Arc du héros de Termina', obtained: undefined
  },
  {
    id: 'bomb-missile', name: 'Missile teigneux', category: 'object', game: 'both', icon: '🐭',
    imageUrl: `${COMMON_IMAGES}/bomb-missile.png`, description: 'Bombe téléguidée', obtained: undefined
  },
  {
    id: 'powder-keg', name: 'Baril de poudre', category: 'object', game: 'mm', icon: '🧨',
    imageUrl: `${MM_IMAGES}/powder-keg.png`, description: 'Explose les rochers', obtained: undefined
  },
  {
    id: 'pictobox', name: 'Boîte à pictogrammes', category: 'object', game: 'mm', icon: '📷',
    imageUrl: `${MM_IMAGES}/pictobox.png`, description: 'Prendre des photos', obtained: undefined
  },
  {
    id: 'empty-bottle5', name: 'Bouteille vide', category: 'object', game: 'mm', icon: '🍾',
    imageUrl: `${COMMON_IMAGES}/empty-bottle.png`, description: 'Peut contenir divers liquides', obtained: undefined
  },
  {
    id: 'empty-bottle6', name: 'Bouteille vide', category: 'object', game: 'mm', icon: '🍾',
    imageUrl: `${COMMON_IMAGES}/empty-bottle.png`, description: 'Peut contenir divers liquides', obtained: undefined
  },
  {
    id: 'empty-bottle7', name: 'Bouteille vide', category: 'object', game: 'mm', icon: '🍾',
    imageUrl: `${COMMON_IMAGES}/empty-bottle.png`, description: 'Peut contenir divers liquides', obtained: undefined
  },

  // ==================== MASQUES - OOT ====================
  {
    id: 'keaton-mask', name: 'Masque du Renard', category: 'mask', game: 'both', icon: '🦊',
    imageUrl: `${COMMON_IMAGES}/keaton-mask.png`, description: 'Masque du renard Keaton', obtained: undefined
  },
  {
    id: 'skull-mask', name: 'Masque de mort', category: 'mask', game: 'oot', icon: '💀',
    imageUrl: `${OOT_IMAGES}/skull-mask.png`, description: 'Masque d\'enfant perdu', obtained: undefined
  },
  {
    id: 'spooky-mask', name: 'Masque de l\'Effroi', category: 'mask', game: 'oot', icon: '👻',
    imageUrl: `${OOT_IMAGES}/spooky-mask.png`, description: 'Masque effrayant', obtained: undefined
  },
  {
    id: 'bunny-mask', name: 'Masque de Lapin', category: 'mask', game: 'both', icon: '🐰',
    imageUrl: `${COMMON_IMAGES}/bunny-mask.png`, description: 'Courir plus vite', obtained: undefined
  },
  {
    id: 'goron-mask', name: 'Masque Goron', category: 'mask', game: 'both', icon: '🗿',
    imageUrl: `${COMMON_IMAGES}/goron-mask.png`, description: 'Masque du peuple Goron', obtained: undefined
  },
  {
    id: 'zora-mask', name: 'Masque Zora', category: 'mask', game: 'both', icon: '🐟',
    imageUrl: `${COMMON_IMAGES}/zora-mask.png`, description: 'Masque du peuple Zora', obtained: undefined
  },
  {
    id: 'gerudo-mask', name: 'Masque Gerudo', category: 'mask', game: 'oot', icon: '🏜️',
    imageUrl: `${OOT_IMAGES}/gerudo-mask.png`, description: 'Masque des femmes Gerudo', obtained: undefined
  },
  {
    id: 'truth-mask', name: 'Masque de la Vérité', category: 'mask', game: 'both', icon: '👁️',
    imageUrl: `${COMMON_IMAGES}/truth-mask.png`, description: 'Voir la vérité', obtained: undefined
  },

  // ==================== MASQUES - MM ====================
  {
    id: 'deku-mask', name: 'Masque Mojo', category: 'mask', game: 'mm', icon: '🌿',
    imageUrl: `${MM_IMAGES}/deku-mask.png`, description: 'Se transformer en Mojo', obtained: undefined
  },
  {
    id: 'great-fairy-mask', name: 'Masque de la Grande Fée', category: 'mask', game: 'mm', icon: '🧚',
    imageUrl: `${MM_IMAGES}/great-fairy-mask.png`, description: 'Masque de la Grande Fée', obtained: undefined
  },
  {
    id: 'blast-mask', name: 'Masque de l\'Explosion', category: 'mask', game: 'mm', icon: '💥',
    imageUrl: `${MM_IMAGES}/blast-mask.png`, description: 'Explose', obtained: undefined
  },
  {
    id: 'don-gero-mask', name: 'Masque de Don Gero', category: 'mask', game: 'mm', icon: '🐸',
    imageUrl: `${MM_IMAGES}/don-gero-mask.png`, description: 'Masque du chef des grenouilles', obtained: undefined
  },
  {
    id: 'kamaro-mask', name: 'Masque de Kamaro', category: 'mask', game: 'mm', icon: '💃',
    imageUrl: `${MM_IMAGES}/kamaro-mask.png`, description: 'Danser comme Kamaro', obtained: undefined
  },
  {
    id: 'captain-mask', name: 'Masque du Capitaine', category: 'mask', game: 'mm', icon: '⚓',
    imageUrl: `${MM_IMAGES}/captain-mask.png`, description: 'Commander les soldats', obtained: undefined
  },
  {
    id: 'giant-mask', name: 'Masque du Géant', category: 'mask', game: 'mm', icon: '👹',
    imageUrl: `${MM_IMAGES}/giant-mask.png`, description: 'Devenir géant', obtained: undefined
  },
  {
    id: 'breman-mask', name: 'Masque de Brême', category: 'mask', game: 'mm', icon: '🐭',
    imageUrl: `${MM_IMAGES}/breman-mask.png`, description: 'Attirer les rats', obtained: undefined
  },
  {
    id: 'postman-hat', name: 'Casquette du Facteur', category: 'mask', game: 'mm', icon: '📮',
    imageUrl: `${MM_IMAGES}/postman-hat.png`, description: 'Courir vite', obtained: undefined
  },
  {
    id: 'couples-mask', name: 'Masque des Amoureux', category: 'mask', game: 'mm', icon: '💑',
    imageUrl: `${MM_IMAGES}/couples-mask.png`, description: 'Masque du couple', obtained: undefined
  },
  {
    id: 'feeling-mask', name: 'Masque des Parfums', category: 'mask', game: 'mm', icon: '😊',
    imageUrl: `${MM_IMAGES}/feeling-mask.png`, description: 'Montrer ses émotions', obtained: undefined
  },
  {
    id: 'stone-mask', name: 'Masque de Pierre', category: 'mask', game: 'mm', icon: '🪨',
    imageUrl: `${MM_IMAGES}/stone-mask.png`, description: 'Devenir invisible', obtained: undefined
  },
  {
    id: 'circus-mask', name: 'Masque du Directeur de Cirque', category: 'mask', game: 'mm', icon: '🎪',
    imageUrl: `${MM_IMAGES}/circus-mask.png`, description: 'Masque de cirque', obtained: undefined
  },
  {
    id: 'kafei-mask', name: 'Masque de Kafei', category: 'mask', game: 'mm', icon: '😔',
    imageUrl: `${MM_IMAGES}/kafei-mask.png`, description: 'Masque du garçon disparu', obtained: undefined
  },
  {
    id: 'all-night-mask', name: 'Masque de la Nuit Blanche', category: 'mask', game: 'mm', icon: '😴',
    imageUrl: `${MM_IMAGES}/all-night-mask.png`, description: 'Rester éveillé', obtained: undefined
  },
  {
    id: 'fierce-deity-mask', name: 'Masque de la Puissance des Fées', category: 'mask', game: 'mm', icon: '😈',
    imageUrl: `${MM_IMAGES}/fierce-deity-mask.png`, description: 'Masque légendaire surpuissant', obtained: undefined
  },

  // ==================== MÉDAILLONS - OOT ====================
  // Note: Dans le jeu final, les médaillons ne servent qu'à ouvrir le chemin de Ganon.
  // Leur fonction de téléportation a été remplacée par les chants d'ocarina.
  {
    id: 'forest-medallion', name: 'Médaillon de la Forêt', category: 'medallion', game: 'oot', icon: '🌳',
    imageUrl: `${OOT_IMAGES}/forest-medallion.png`, description: 'Récompense du Temple de la Forêt', obtained: undefined
  },
  {
    id: 'fire-medallion', name: 'Médaillon du Feu', category: 'medallion', game: 'oot', icon: '🔥',
    imageUrl: `${OOT_IMAGES}/fire-medallion.png`, description: 'Récompense du Temple du Feu', obtained: undefined
  },
  {
    id: 'water-medallion', name: 'Médaillon de l\'Eau', category: 'medallion', game: 'oot', icon: '💧',
    imageUrl: `${OOT_IMAGES}/water-medallion.png`, description: 'Récompense du Temple de l\'Eau', obtained: undefined
  },
  {
    id: 'spirit-medallion', name: 'Médaillon de l\'Esprit', category: 'medallion', game: 'oot', icon: '✨',
    imageUrl: `${OOT_IMAGES}/spirit-medallion.png`, description: 'Récompense du Temple de l\'Esprit', obtained: undefined
  },
  {
    id: 'shadow-medallion', name: 'Médaillon de l\'Ombre', category: 'medallion', game: 'oot', icon: '🌑',
    imageUrl: `${OOT_IMAGES}/shadow-medallion.png`, description: 'Récompense du Temple de l\'Ombre', obtained: undefined
  },
  {
    id: 'light-medallion', name: 'Médaillon de la Lumière', category: 'medallion', game: 'oot', icon: '☀️',
    imageUrl: `${OOT_IMAGES}/light-medallion.png`, description: 'Récompense du Temple de la Lumière', obtained: undefined
  },

  // ==================== CHANTS - OOT ====================
  {
    id: 'zelda-lullaby', name: 'Berceuse de Zelda', category: 'song', game: 'oot', icon: '🎵',
    imageUrl: `${OOT_IMAGES}/zelda-lullaby.png`, description: 'Ouvrir certains passages', obtained: undefined
  },
  {
    id: 'epona-song', name: 'Chant d\'Epona', category: 'song', game: 'both', icon: '🎵',
    imageUrl: `${COMMON_IMAGES}/epona-song.png`, description: 'Appeler Epona', obtained: undefined
  },
  {
    id: 'saria-song', name: 'Chant de Saria', category: 'song', game: 'oot', icon: '🎵',
    imageUrl: `${OOT_IMAGES}/saria-song.png`, description: 'Parler avec Saria', obtained: undefined
  },
  {
    id: 'sun-song', name: 'Chant du Soleil', category: 'song', game: 'oot', icon: '🎵',
    imageUrl: `${OOT_IMAGES}/sun-song.png`, description: 'Faire apparaître le soleil', obtained: undefined
  },
  {
    id: 'time-song', name: 'Chant du Temps', category: 'song', game: 'both', icon: '🎵',
    imageUrl: `${COMMON_IMAGES}/time-song.png`, description: 'Ouvrir la porte du Temps', obtained: undefined
  },
  {
    id: 'storm-song', name: 'Chant des Tempêtes', category: 'song', game: 'oot', icon: '🎵',
    imageUrl: `${OOT_IMAGES}/storm-song.png`, description: 'Invoquer la pluie', obtained: undefined
  },
  {
    id: 'scarecrow-song', name: 'Chant de l\'Épouvantail', category: 'song', game: 'oot', icon: '🎵',
    imageUrl: `${OOT_IMAGES}/scarecrow-song.png`, description: 'Composé par le joueur, fait apparaître Pierre l\'épouvantail', obtained: undefined
  },
  {
    id: 'sages-overture', name: 'Ouverture des Sages', category: 'song', game: 'oot', icon: '🎵',
    imageUrl: `${OOT_IMAGES}/sages-overture.png`, description: 'Chant secret pour découvrir la cachette de la Triforce', obtained: undefined
  },
  {
    id: 'minuet-forest', name: 'Menuet des Bois', category: 'song', game: 'oot', icon: '🎵',
    imageUrl: `${OOT_IMAGES}/minuet-forest.png`, description: 'Se téléporter au Temple de la Forêt', obtained: undefined
  },
  {
    id: 'bolero-fire', name: 'Boléro du Feu', category: 'song', game: 'oot', icon: '🎵',
    imageUrl: `${OOT_IMAGES}/bolero-fire.png`, description: 'Se téléporter au Temple du Feu', obtained: undefined
  },
  {
    id: 'serenade-water', name: 'Sérénade de l\'Eau', category: 'song', game: 'oot', icon: '🎵',
    imageUrl: `${OOT_IMAGES}/serenade-water.png`, description: 'Se téléporter au Temple de l\'Eau', obtained: undefined
  },
  {
    id: 'requiem-spirit', name: 'Requiem de l\'Esprit', category: 'song', game: 'oot', icon: '🎵',
    imageUrl: `${OOT_IMAGES}/requiem-spirit.png`, description: 'Se téléporter au Temple de l\'Esprit', obtained: undefined
  },
  {
    id: 'nocturne-shadow', name: 'Nocturne de l\'Ombre', category: 'song', game: 'oot', icon: '🎵',
    imageUrl: `${OOT_IMAGES}/nocturne-shadow.png`, description: 'Se téléporter au Temple de l\'Ombre', obtained: undefined
  },
  {
    id: 'prelude-light', name: 'Prélude de la Lumière', category: 'song', game: 'oot', icon: '🎵',
    imageUrl: `${OOT_IMAGES}/prelude-light.png`, description: 'Se téléporter au Temple du Temps', obtained: undefined
  },

  // ==================== CHANTS - MM ====================
  {
    id: 'healing-song', name: 'Chant de l\'Apaisement', category: 'song', game: 'mm', icon: '🎵',
    imageUrl: `${MM_IMAGES}/healing-song.png`, description: 'Guérir les malades et transformer les esprits en masques', obtained: undefined
  },
  {
    id: 'inverted-time', name: 'Chant inversé du Temps', category: 'song', game: 'mm', icon: '🎵',
    imageUrl: `${MM_IMAGES}/inverted-time.png`, description: 'Ralentir le cours du temps', obtained: undefined
  },
  {
    id: 'double-time', name: 'Chant accéléré du Temps', category: 'song', game: 'mm', icon: '🎵',
    imageUrl: `${MM_IMAGES}/double-time.png`, description: 'Accélérer le temps d\'une demi-journée', obtained: undefined
  },
  {
    id: 'soaring-song', name: 'Chant de l\'Envol', category: 'song', game: 'mm', icon: '🎵',
    imageUrl: `${MM_IMAGES}/soaring-song.png`, description: 'Se téléporter aux statues de Hibou', obtained: undefined
  },
  {
    id: 'goron-lullaby', name: 'Berceuse des Gorons', category: 'song', game: 'mm', icon: '🎵',
    imageUrl: `${MM_IMAGES}/goron-lullaby.png`, description: 'Endormir les Gorons', obtained: undefined
  },
  {
    id: 'awakening-sonata', name: 'Sonate de l\'Éveil', category: 'song', game: 'mm', icon: '🎵',
    imageUrl: `${MM_IMAGES}/awakening-sonata.png`, description: 'Réveiller', obtained: undefined
  },
  {
    id: 'elegy-emptiness', name: 'Élégie du Vide', category: 'song', game: 'mm', icon: '🎵',
    imageUrl: `${MM_IMAGES}/elegy-emptiness.png`, description: 'Créer une copie de Link', obtained: undefined
  },
  {
    id: 'frog-bossa', name: 'Bossa Nova des Grenouilles', category: 'song', game: 'mm', icon: '🎵',
    imageUrl: `${MM_IMAGES}/frog-bossa.png`, description: 'Jouer pour les grenouilles', obtained: undefined
  },
  {
    id: 'calling-ode', name: 'Ode de l\'Appel', category: 'song', game: 'mm', icon: '🎵',
    imageUrl: `${MM_IMAGES}/calling-ode.png`, description: 'Réveiller les Quatre Géants pour retenir la Lune', obtained: undefined
  },
  {
    id: 'mm-scarecrow-song', name: 'Chanson de l\'Épouvantail', category: 'song', game: 'mm', icon: '🎵',
    imageUrl: `${MM_IMAGES}/mm-scarecrow-song.png`, description: 'Composée par le joueur, fait apparaître un épouvantail', obtained: undefined
  },

  // ==================== OBJETS DE QUÊTE - OOT ====================
  {
    id: 'zelda-letter', name: 'Lettre de Zelda', category: 'quest', game: 'oot', icon: '✉️',
    imageUrl: `${OOT_IMAGES}/zelda-letter.png`, description: 'Lettre de la princesse', obtained: undefined
  },
  {
    id: 'poachers-saw', name: 'Scie du braconnier', category: 'quest', game: 'oot', icon: '🪚',
    imageUrl: `${OOT_IMAGES}/poachers-saw.png`, description: 'Scie pour la quête', obtained: undefined
  },
  {
    id: 'broken-sword', name: 'Épée brisée', category: 'quest', game: 'oot', icon: '🗡️',
    imageUrl: `${OOT_IMAGES}/broken-sword.png`, description: 'Épée cassée à réparer', obtained: undefined
  },
  {
    id: 'prescription', name: 'Ordonnance', category: 'quest', game: 'oot', icon: '📋',
    imageUrl: `${OOT_IMAGES}/prescription.png`, description: 'Ordonnance du médecin', obtained: undefined
  },
  {
    id: 'eye-drops', name: 'Gouttes oculaires', category: 'quest', game: 'oot', icon: '👁️',
    imageUrl: `${OOT_IMAGES}/eye-drops.png`, description: 'Gouttes pour les yeux', obtained: undefined
  },
  {
    id: 'certificate', name: 'Certificat', category: 'quest', game: 'oot', icon: '📜',
    imageUrl: `${OOT_IMAGES}/certificate.png`, description: 'Certificat', obtained: undefined
  },
  {
    id: 'stone-agony', name: 'Pierre de l\'Agonie', category: 'quest', game: 'oot', icon: '💎',
    imageUrl: `${OOT_IMAGES}/stone-agony.png`, description: 'Détecter les secrets', obtained: undefined
  },
  {
    id: 'gerudo-card', name: 'Carte Gerudo', category: 'quest', game: 'oot', icon: '🃏',
    imageUrl: `${OOT_IMAGES}/gerudo-card.png`, description: 'Accès à la forteresse', obtained: undefined
  },
  {
    id: 'silver-scale', name: 'Écaille d\'argent', category: 'quest', game: 'oot', icon: '🐟',
    imageUrl: `${OOT_IMAGES}/silver-scale.png`, description: 'Plonger plus longtemps', obtained: undefined
  },
  {
    id: 'gold-scale', name: 'Écaille d\'or', category: 'quest', game: 'oot', icon: '🐟',
    imageUrl: `${OOT_IMAGES}/gold-scale.png`, description: 'Plonger très longtemps', obtained: undefined
  },

  // ==================== OBJETS DE QUÊTE - MM ====================
  {
    id: 'bombers-notebook', name: 'Carnet des Bombers', category: 'quest', game: 'mm', icon: '📓',
    imageUrl: `${MM_IMAGES}/bombers-notebook.png`, description: 'Noter les événements', obtained: undefined
  },
  {
    id: 'moon-tear', name: 'Larme de Lune', category: 'quest', game: 'mm', icon: '🌙',
    imageUrl: `${MM_IMAGES}/moon-tear.png`, description: 'Larme tombée de la lune', obtained: undefined
  },
  {
    id: 'land-title', name: 'Titre de propriété de Terre', category: 'quest', game: 'mm', icon: '📜',
    imageUrl: `${MM_IMAGES}/land-title.png`, description: 'Propriété du Sud', obtained: undefined
  },
  {
    id: 'swamp-title', name: 'Titre de propriété du Marais', category: 'quest', game: 'mm', icon: '📜',
    imageUrl: `${MM_IMAGES}/swamp-title.png`, description: 'Propriété du Marais', obtained: undefined
  },
  {
    id: 'mountain-title', name: 'Titre de propriété de la Montagne', category: 'quest', game: 'mm', icon: '📜',
    imageUrl: `${MM_IMAGES}/mountain-title.png`, description: 'Propriété de la Montagne', obtained: undefined
  },
  {
    id: 'ocean-title', name: 'Titre de propriété de l\'Océan', category: 'quest', game: 'mm', icon: '📜',
    imageUrl: `${MM_IMAGES}/ocean-title.png`, description: 'Propriété de l\'Océan', obtained: undefined
  },
  {
    id: 'kafei-letter', name: 'Lettre à Kafei', category: 'quest', game: 'mm', icon: '✉️',
    imageUrl: `${MM_IMAGES}/kafei-letter.png`, description: 'Lettre pour Kafei', obtained: undefined
  },
  {
    id: 'mama-letter', name: 'Lettre à Mama', category: 'quest', game: 'mm', icon: '✉️',
    imageUrl: `${MM_IMAGES}/mama-letter.png`, description: 'Lettre pour Mama', obtained: undefined
  },
  {
    id: 'pendant-memories', name: 'Pendentif des Souvenirs', category: 'quest', game: 'mm', icon: '💎',
    imageUrl: `${MM_IMAGES}/pendant-memories.png`, description: 'Pendentif de Kafei', obtained: undefined
  },
  {
    id: 'room-key', name: 'Clé de la chambre', category: 'quest', game: 'mm', icon: '🔑',
    imageUrl: `${MM_IMAGES}/room-key.png`, description: 'Clé de Kafei', obtained: undefined
  },

  // ==================== RESTES - MM ====================
  {
    id: 'odolwa-remain', name: 'Restes d\'Odolwa', category: 'remain', game: 'mm', icon: '🗿',
    imageUrl: `${MM_IMAGES}/odolwa-remain.png`, description: 'Dépouille du boss du Bois', obtained: undefined
  },
  {
    id: 'goht-remain', name: 'Restes de Goht', category: 'remain', game: 'mm', icon: '🐐',
    imageUrl: `${MM_IMAGES}/goht-remain.png`, description: 'Dépouille du boss de la Neige', obtained: undefined
  },
  {
    id: 'gyorg-remain', name: 'Restes de Gyorg', category: 'remain', game: 'mm', icon: '🐟',
    imageUrl: `${MM_IMAGES}/gyorg-remain.png`, description: 'Dépouille du boss de l\'Eau', obtained: undefined
  },
  {
    id: 'twinmold-remain', name: 'Restes de Twinmold', category: 'remain', game: 'mm', icon: '🐉',
    imageUrl: `${MM_IMAGES}/twinmold-remain.png`, description: 'Dépouille du boss du Sable', obtained: undefined
  },
];

// Grouper les items par catégorie
export const itemsByCategory = {
  equipment: items.filter(i => i.category === 'equipment'),
  object: items.filter(i => i.category === 'object'),
  mask: items.filter(i => i.category === 'mask'),
  medallion: items.filter(i => i.category === 'medallion'),
  song: items.filter(i => i.category === 'song'),
  quest: items.filter(i => i.category === 'quest'),
  remain: items.filter(i => i.category === 'remain'),
};

// Grouper par jeu
export const ootItems = items.filter(i => i.game === 'oot' || i.game === 'both');
export const mmItems = items.filter(i => i.game === 'mm' || i.game === 'both');

export const getItemImage = (item: Item): string => {
  if (item.imageUrl) return item.imageUrl;
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="12" fill="#1a4d2e" stroke="#c9a03d" stroke-width="2"/>
      <text x="50" y="50" text-anchor="middle" dominant-baseline="central" font-size="48">${item.icon}</text>
    </svg>
  `)}`;
};

export const totalItems = items.length;