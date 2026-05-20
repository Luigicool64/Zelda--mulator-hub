import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { items, totalItems, itemsByCategory } from '../data/item';
import './Achievements.css';

interface Achievement {
  id: number;
  name: string;
  description: string;
  category: 'hyrule' | 'termina' | 'sword' | 'mask' | 'song' | 'collection' | 'boss' | 'randomizer';
  icon: string;
  condition: string;
  required: string[];
  rarity: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

// Générer tous les succès (500+)
const generateAchievements = (): Achievement[] => {
  const achievements: Achievement[] = [];
  let id = 1;

  // ===== 1. SUCCÈS D'ENTRÉE À HYRULE (20) =====
  const hyruleLocations = [
    'Forêt Kokiri', 'Plaine d\'Hyrule', 'Château d\'Hyrule', 'Village Cocorico',
    'Cimetière', 'Montagne de la Mort', 'Lac Hylia', 'Désert Gerudo',
    'Vallée Gerudo', 'Temple du Temps', 'Forêt Perdue', 'Ranch Lon Lon',
    'Caverne Goron', 'Domaine Zora', 'Marais Maudit', 'Colosseum',
    'Île du Lac', 'Temple de la Forêt', 'Temple du Feu', 'Temple de l\'Eau'
  ];
  
  hyruleLocations.forEach((location, i) => {
    achievements.push({
      id: id++,
      name: `Explorateur d'Hyrule - ${location}`,
      description: `Découvrir ${location}`,
      category: 'hyrule',
      icon: '🗺️',
      condition: `explore_hyrule_${i}`,
      required: [],
      rarity: 100 - i,
      unlocked: false
    });
  });

  // ===== 2. SUCCÈS D'ENTRÉE À TERMINA (20) =====
  const terminaLocations = [
    'Clock Town', 'Marais du Sud', 'Woodfall', 'Montagne de Neige', 'Goron Village',
    'Mer de Zora', 'Péninsule Zora', 'Vallée Ikana', 'Stone Tower', 'Termina Field',
    'Romani Ranch', 'Great Bay Coast', 'Pirates Fortress', 'Snowhead', 'Spring',
    'Deku Palace', 'Swamp Fishing', 'Ocean Fishing', 'Ikana Graveyard', 'Temple Bois'
  ];
  
  terminaLocations.forEach((location, i) => {
    achievements.push({
      id: id++,
      name: `Explorateur de Termina - ${location}`,
      description: `Découvrir ${location}`,
      category: 'termina',
      icon: '🌑',
      condition: `explore_termina_${i}`,
      required: [],
      rarity: 100 - i,
      unlocked: false
    });
  });

  // ===== 3. SUCCÈS D'ÉPÉES (10) =====
  const swordItems = items.filter(i => i.category === 'equipment' && (i.name.includes('Épée') || i.name.includes('Lame') || i.name.includes('Couteau')));
  swordItems.forEach((sword, i) => {
    achievements.push({
      id: id++,
      name: `Maître des épées - ${sword.name}`,
      description: `Obtenir ${sword.name}`,
      category: 'sword',
      icon: sword.icon,
      condition: `obtain_${sword.id}`,
      required: [sword.id],
      rarity: 100 - (i * 8),
      unlocked: false
    });
  });

  // ===== 4. SUCCÈS DE MASQUES (25) =====
  const maskItems = items.filter(i => i.category === 'mask');
  maskItems.forEach((mask, i) => {
    achievements.push({
      id: id++,
      name: `Collectionneur de masques - ${mask.name}`,
      description: `Obtenir ${mask.name}`,
      category: 'mask',
      icon: mask.icon,
      condition: `obtain_${mask.id}`,
      required: [mask.id],
      rarity: 100 - (i * 2),
      unlocked: false
    });
  });

  // ===== 5. SUCCÈS DE CHANTS (21) =====
  const songItems = items.filter(i => i.category === 'song');
  songItems.forEach((song, i) => {
    achievements.push({
      id: id++,
      name: `Mélomane - ${song.name}`,
      description: `Apprendre ${song.name}`,
      category: 'song',
      icon: '🎵',
      condition: `learn_${song.id}`,
      required: [song.id],
      rarity: 90 - i,
      unlocked: false
    });
  });

  // ===== 6. SUCCÈS DE COLLECTION (300) =====
  const collectionItems = items.filter(i => i.category === 'object' || i.category === 'quest');
  collectionItems.forEach((item, i) => {
    achievements.push({
      id: id++,
      name: `Collectionneur - ${item.name}`,
      description: `Obtenir ${item.name}`,
      category: 'collection',
      icon: item.icon,
      condition: `collect_${item.id}`,
      required: [item.id],
      rarity: 95 - Math.floor(i / 5),
      unlocked: false
    });
  });

  // ===== 7. SUCCÈS DE BOSS (10) =====
  const bosses = [
    'Gohma', 'King Dodongo', 'Barinade', 'Phantom Ganon', 'Morpha',
    'Bongo Bongo', 'Twinrova', 'Ganon', 'Odolwa', 'Goht', 'Gyorg', 'Twinmold', 'Majora'
  ];
  bosses.forEach((boss, i) => {
    achievements.push({
      id: id++,
      name: `Tueur de boss - ${boss}`,
      description: `Vaincre ${boss}`,
      category: 'boss',
      icon: '👹',
      condition: `defeat_${boss.toLowerCase()}`,
      required: [],
      rarity: 85 - i * 3,
      unlocked: false
    });
  });

  // ===== 8. SUCCÈS DE FIN DE JEU (4) =====
  const endings = [
    { name: 'Héros d\'Hyrule', desc: 'Terminer Ocarina of Time', icon: '👑' },
    { name: 'Sauveur de Termina', desc: 'Terminer Majora\'s Mask', icon: '🌑' },
    { name: 'Légende Vivante', desc: 'Terminer les deux jeux', icon: '🏆' },
    { name: 'Maître du Temps', desc: '100% complet sur les deux jeux', icon: '⏰' }
  ];
  endings.forEach((ending, i) => {
    achievements.push({
      id: id++,
      name: ending.name,
      description: ending.desc,
      category: 'randomizer',
      icon: ending.icon,
      condition: `complete_${ending.name.toLowerCase()}`,
      required: [],
      rarity: 50 - i * 10,
      unlocked: false
    });
  });

  return achievements;
};

export function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    const allAchievements = generateAchievements();
    setAchievements(allAchievements);
  }, []);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progress = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;

  const categories = [
    { id: 'all', name: 'Tous', icon: '🏆', color: '#c9a03d' },
    { id: 'hyrule', name: 'Hyrule', icon: '🗺️', color: '#4caf50' },
    { id: 'termina', name: 'Termina', icon: '🌑', color: '#9c27b0' },
    { id: 'sword', name: 'Épées', icon: '⚔️', color: '#2196f3' },
    { id: 'mask', name: 'Masques', icon: '🎭', color: '#ff9800' },
    { id: 'song', name: 'Chants', icon: '🎵', color: '#00bcd4' },
    { id: 'collection', name: 'Collection', icon: '📦', color: '#ffc107' },
    { id: 'boss', name: 'Boss', icon: '👹', color: '#f44336' },
    { id: 'randomizer', name: 'Suprême', icon: '🏆', color: '#ffd700' }
  ];

  const filteredAchievements = achievements.filter(a => {
    const matchesFilter = filter === 'all' || a.category === filter;
    const matchesUnlocked = !showUnlockedOnly || a.unlocked;
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesUnlocked && matchesSearch;
  });

  return (
    <div className="achievements-page">
      {/* Header */}
      <div className="achievements-header">
        <h1 className="achievements-title">🏆 Succès</h1>
        <p className="achievements-subtitle">Débloquez tous les succès en explorant Hyrule et Termina</p>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-circle">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" className="progress-bg" />
            <circle 
              cx="50" cy="50" r="45" 
              className="progress-fill" 
              strokeDasharray={`${progress * 2.83}, 283`}
            />
          </svg>
          <div className="progress-text">
            <span className="progress-number">{unlockedCount}</span>
            <span className="progress-total">/{totalCount}</span>
          </div>
        </div>
        <div className="progress-stats">
          <div className="stat">
            <span className="stat-value">{Math.floor(progress)}%</span>
            <span className="stat-label">Complété</span>
          </div>
          <div className="stat">
            <span className="stat-value">{totalCount - unlockedCount}</span>
            <span className="stat-label">Restants</span>
          </div>
          <div className="stat">
            <span className="stat-value">{achievements.filter(a => a.category === 'hyrule').length}</span>
            <span className="stat-label">Zones Hyrule</span>
          </div>
          <div className="stat">
            <span className="stat-value">{achievements.filter(a => a.category === 'termina').length}</span>
            <span className="stat-label">Zones Termina</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${filter === cat.id ? 'active' : ''}`}
              style={{ '--btn-color': cat.color } as React.CSSProperties}
              onClick={() => setFilter(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span className="count">{achievements.filter(a => a.category === cat.id).length}</span>
            </button>
          ))}
        </div>
        
        <div className="action-filters">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Rechercher un succès..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button
            className={`unlocked-filter ${showUnlockedOnly ? 'active' : ''}`}
            onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
          >
            {showUnlockedOnly ? '🔓 Débloqués' : '🔒 Tous'}
          </button>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="achievements-grid">
        <AnimatePresence>
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.01 }}
              className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              onClick={() => setSelectedAchievement(achievement)}
            >
              <div className="achievement-icon">
                {achievement.unlocked ? achievement.icon : '❓'}
              </div>
              <div className="achievement-info">
                <h3 className="achievement-name">{achievement.name}</h3>
                <p className="achievement-desc">{achievement.description}</p>
                <div className="achievement-meta">
                  <span className="achievement-rarity">
                    🔥 {achievement.rarity}% des joueurs
                  </span>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <span className="achievement-date">
                      📅 {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              {achievement.unlocked && (
                <div className="achievement-check">✓</div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredAchievements.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">🎮</span>
          <h3>Aucun succès trouvé</h3>
          <p>Essayez de modifier vos filtres</p>
        </div>
      )}

      {/* Modal Détails */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedAchievement(null)}>✕</button>
              <div className={`modal-icon ${selectedAchievement.unlocked ? 'unlocked' : 'locked'}`}>
                {selectedAchievement.unlocked ? selectedAchievement.icon : '❓'}
              </div>
              <h2 className="modal-title">{selectedAchievement.name}</h2>
              <p className="modal-desc">{selectedAchievement.description}</p>
              <div className="modal-details">
                <div className="modal-detail">
                  <span className="detail-label">Condition:</span>
                  <span className="detail-value">{selectedAchievement.condition}</span>
                </div>
                <div className="modal-detail">
                  <span className="detail-label">Rareté:</span>
                  <span className="detail-value">{selectedAchievement.rarity}% des joueurs</span>
                </div>
                {selectedAchievement.unlocked && selectedAchievement.unlockedAt && (
                  <div className="modal-detail">
                    <span className="detail-label">Débloqué le:</span>
                    <span className="detail-value">{new Date(selectedAchievement.unlockedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              {!selectedAchievement.unlocked && (
                <div className="modal-hint">
                  💡 Astuce: Explorez toutes les zones et collectez tous les items pour débloquer ce succès.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}