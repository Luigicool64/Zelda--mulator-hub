import { css } from '../../../styled-system/css';
import type { Achievement, AchievementCategory } from '../../types/index';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Génération de 500 succès (exemple des premiers)
const generateAchievements = (): Achievement[] => {
  const achievements: Achievement[] = [];
  
  // Catégorie Exploration (100)
  for (let i = 1; i <= 100; i++) {
    achievements.push({
      id: `explore-${i}`,
      name: i === 1 ? 'Premier pas à Hyrule' : `Explorateur niveau ${i}`,
      description: i === 1 ? 'Entrer dans la map du monde' : `Découvrir ${i} zones différentes`,
      category: 'exploration',
      condition: `explore_${i}_zones`,
      rarity: i === 1 ? 95 : Math.max(1, 100 - i),
      unlocked: false
    });
  }
  
  // Catégorie Combat (100)
  for (let i = 1; i <= 100; i++) {
    achievements.push({
      id: `combat-${i}`,
      name: i === 1 ? 'Premier combat' : `Guerrier niveau ${i}`,
      description: i === 1 ? 'Vaincre son premier ennemi' : `Vaincre ${i * 10} ennemis`,
      category: 'combat',
      condition: `defeat_${i * 10}_enemies`,
      rarity: i === 1 ? 90 : Math.max(1, 100 - i),
      unlocked: false
    });
  }
  
  // Catégorie Collection (100)
  for (let i = 1; i <= 100; i++) {
    achievements.push({
      id: `collection-${i}`,
      name: i === 1 ? 'Collectionneur débutant' : `Maître collectionneur niveau ${i}`,
      description: `Collecter ${i * 5} objets différents`,
      category: 'collection',
      condition: `collect_${i * 5}_items`,
      rarity: Math.max(1, 95 - i),
      unlocked: false
    });
  }
  
  // Catégorie Progression Randomizer (100)
  for (let i = 1; i <= 100; i++) {
    achievements.push({
      id: `randomizer-${i}`,
      name: `Randomizer niveau ${i}`,
      description: `Compléter ${i} seeds randomizer`,
      category: 'randomizer',
      condition: `complete_${i}_seeds`,
      rarity: Math.max(1, 90 - i),
      unlocked: false
    });
  }
  
  // Catégorie Spéciale/Speedrun (100)
  for (let i = 1; i <= 100; i++) {
    achievements.push({
      id: `speedrun-${i}`,
      name: i === 1 ? 'Débutant speedrun' : `Speedrunner niveau ${i}`,
      description: i === 1 ? 'Terminer un jeu en moins de 10h' : `Terminer en moins de ${11 - Math.floor(i/10)}h`,
      category: 'speedrun',
      condition: `speedrun_time_${i}`,
      rarity: Math.max(1, 95 - i),
      unlocked: false
    });
  }
  
  return achievements;
};

export function AchievementsGrid() {
  const [achievements] = useState(generateAchievements);
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  
  const filtered = achievements.filter(a => 
    (selectedCategory === 'all' || a.category === selectedCategory) &&
    (!showUnlockedOnly || a.unlocked)
  );
  
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalProgress = (unlockedCount / achievements.length) * 100;
  
  // Catégories avec icônes
  const categories = [
    { id: 'all', label: 'Tous', icon: '🏆' },
    { id: 'exploration', label: 'Exploration', icon: '🗺️' },
    { id: 'combat', label: 'Combat', icon: '⚔️' },
    { id: 'collection', label: 'Collection', icon: '📦' },
    { id: 'randomizer', label: 'Randomizer', icon: '🎲' },
    { id: 'speedrun', label: 'Speedrun', icon: '⏱️' }
  ];
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🏆 Succès ({unlockedCount}/{achievements.length})</h1>
        
        <div className={styles.stats}>
          <div className={styles.progressCircle}>
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#1a4d2e"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#c9a03d"
                strokeWidth="8"
                strokeDasharray={`${totalProgress * 2.827}, 282.7`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <text x="50" y="55" textAnchor="middle" fill="#c9a03d" fontSize="20" fontWeight="bold">
                {Math.floor(totalProgress)}%
              </text>
            </svg>
          </div>
        </div>
      </div>
      
      <div className={styles.filters}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${styles.filterBtn} ${selectedCategory === cat.id ? styles.activeFilter : ''}`}
            onClick={() => setSelectedCategory(cat.id as any)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
        
        <button
          className={`${styles.filterBtn} ${showUnlockedOnly ? styles.activeFilter : ''}`}
          onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
        >
          🔓 Uniquement débloqués
        </button>
      </div>
      
      <div className={styles.grid}>
        {filtered.map((achievement) => (
          <motion.div
            key={achievement.id}
            className={`${styles.achievementCard} ${achievement.unlocked ? styles.unlocked : styles.locked}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.achievementIcon}>
              {achievement.unlocked ? '🏆' : '❓'}
            </div>
            <div className={styles.achievementInfo}>
              <h3 className={styles.achievementName}>{achievement.name}</h3>
              <p className={styles.achievementDesc}>{achievement.description}</p>
              <div className={styles.achievementMeta}>
                <span className={styles.rarity}>
                  🔥 Rareté: {achievement.rarity}%
                </span>
                {achievement.unlocked && achievement.unlockedAt && (
                  <span className={styles.date}>
                    📅 {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: css({
    padding: '2rem',
    backgroundColor: '#0a1c12',
    minHeight: '100vh'
  }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  }),
  title: css({
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #c9a03d, #ffd700)',
    backgroundClip: 'text',
    color: 'transparent'
  }),
  stats: css({
    display: 'flex',
    gap: '1rem'
  }),
  progressCircle: css({
    width: '100px',
    height: '100px'
  }),
  filters: css({
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  }),
  filterBtn: css({
    padding: '0.5rem 1rem',
    backgroundColor: '#1a4d2e',
    border: '1px solid #c9a03d',
    borderRadius: '0.25rem',
    color: '#c9a03d',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _hover: {
      backgroundColor: '#2a5f3f'
    }
  }),
  activeFilter: css({
    backgroundColor: '#c9a03d',
    color: '#0a1c12'
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem'
  }),
  achievementCard: css({
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#1a4d2e',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }),
  unlocked: css({
    border: '1px solid #c9a03d',
    background: 'linear-gradient(135deg, #1a4d2e, #2a5f3f)'
  }),
  locked: css({
    border: '1px solid #2a5f3f',
    opacity: 0.7
  }),
  achievementIcon: css({
    fontSize: '3rem'
  }),
  achievementInfo: css({
    flex: 1
  }),
  achievementName: css({
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#c9a03d',
    marginBottom: '0.25rem'
  }),
  achievementDesc: css({
    fontSize: '0.875rem',
    color: '#ccc',
    marginBottom: '0.5rem'
  }),
  achievementMeta: css({
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.75rem',
    color: '#aaa'
  }),
  rarity: css({
    color: '#ff9800'
  }),
  date: css({
    color: '#4caf50'
  })
};