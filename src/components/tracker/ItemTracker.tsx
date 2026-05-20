import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { items, ootItems, mmItems, getItemImage } from '../../data/item';
import './ItemTracker.css';

export function ItemTracker() {
  const { obtainedItemsOOT, obtainedItemsMM, obtainItem, checksCompleted, hintsAvailable, currentGame } = useGameStore();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [autoMode, setAutoMode] = useState(true);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const obtainedItems = currentGame === 'oot' ? obtainedItemsOOT : obtainedItemsMM;
  const currentGameItems = currentGame === 'oot' ? ootItems : mmItems;

  const categories = [
    { id: 'all', name: 'Tous', icon: '📦', count: currentGameItems.length },
    { id: 'equipment', name: 'Équipements', icon: '⚔️', count: currentGameItems.filter((i: any) => i.category === 'equipment').length },
    { id: 'object', name: 'Objets', icon: '📦', count: currentGameItems.filter((i: any) => i.category === 'object').length },
    { id: 'mask', name: 'Masques', icon: '🎭', count: currentGameItems.filter((i: any) => i.category === 'mask').length },
    { id: 'medallion', name: 'Médaillons', icon: '🏅', count: currentGameItems.filter((i: any) => i.category === 'medallion').length },
    { id: 'song', name: 'Chants', icon: '🎵', count: currentGameItems.filter((i: any) => i.category === 'song').length },
    { id: 'quest', name: 'Quête', icon: '📜', count: currentGameItems.filter((i: any) => i.category === 'quest').length },
    { id: 'remain', name: 'Restes', icon: '💀', count: currentGameItems.filter((i: any) => i.category === 'remain').length },
  ];

  useEffect(() => {
    let gameItems = [...currentGameItems];
    if (selectedCategory !== 'all') {
      gameItems = gameItems.filter((item: any) => item.category === selectedCategory);
    }
    if (searchTerm) {
      gameItems = gameItems.filter((item: any) => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredItems(gameItems);
  }, [currentGame, selectedCategory, searchTerm, currentGameItems]);

  const getObtainedCount = () => currentGameItems.filter((item: any) => obtainedItems.includes(item.id)).length;
  const getTotalCount = () => currentGameItems.length;
  const obtainedCount = getObtainedCount();
  const totalCountGame = getTotalCount();

  const handleItemClick = (itemId: string) => { if (!autoMode) obtainItem(itemId); };
  const isItemObtained = (itemId: string) => obtainedItems.includes(itemId);

  const getCategoryObtainedCount = (categoryId: string) => {
    if (categoryId === 'all') return obtainedCount;
    const categoryItems = currentGameItems.filter((i: any) => i.category === categoryId);
    return categoryItems.filter((item: any) => obtainedItems.includes(item.id)).length;
  };

  const handleImageError = (itemId: string) => setFailedImages(prev => new Set(prev).add(itemId));
  const progressPercentage = totalCountGame > 0 ? (obtainedCount / totalCountGame) * 100 : 0;
  const getGameName = () => currentGame === 'oot' ? 'Ocarina of Time' : "Majora's Mask";

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <div className="tracker-title-section">
          <h2 className="tracker-title">📦 Inventaire - {getGameName()}</h2>
          <div className="tracker-progress-bar"><div className="tracker-progress-fill" style={{ width: `${progressPercentage}%` }} /></div>
        </div>
        <div className="tracker-stats"><div className="stat"><span className="stat-value">{obtainedCount}</span><span className="stat-label">/{totalCountGame}</span><span className="stat-percent">({Math.round(progressPercentage)}%)</span></div></div>
      </div>

      <div className="tracker-mode">
        <span className="mode-label">Mode :</span>
        <button className={`mode-btn ${!autoMode ? 'active' : ''}`} onClick={() => setAutoMode(false)}>✋ Manuel</button>
        <button className={`mode-btn ${autoMode ? 'active' : ''}`} onClick={() => setAutoMode(true)}>🤖 Auto</button>
      </div>

      <div className="tracker-search">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Rechercher un objet..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
        {searchTerm && <button className="search-clear" onClick={() => setSearchTerm('')}>✕</button>}
      </div>

      <div className="tracker-categories">
        {categories.map(cat => {
          const obtainedCatCount = getCategoryObtainedCount(cat.id);
          const catProgress = cat.count > 0 ? (obtainedCatCount / cat.count) * 100 : 0;
          return (
            <button key={cat.id} className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`} onClick={() => setSelectedCategory(cat.id)}>
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
              <span className="category-count">{obtainedCatCount}/{cat.count}</span>
              <div className="category-progress"><div className="category-progress-fill" style={{ width: `${catProgress}%` }} /></div>
            </button>
          );
        })}
      </div>

      <div className="tracker-grid">
        <AnimatePresence>
          {filteredItems.map((item: any) => {
            const obtained = isItemObtained(item.id);
            const imageFailed = failedImages.has(item.id);
            const itemImageUrl = getItemImage(item);
            return (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}
                className={`tracker-item ${obtained ? 'obtained' : ''} ${!autoMode && !obtained ? 'clickable' : ''}`} onClick={() => handleItemClick(item.id)}>
                <div className="item-visual">
                  {itemImageUrl && !imageFailed ? <img src={itemImageUrl} alt={item.name} className="item-image" onError={() => handleImageError(item.id)} loading="lazy" /> : <div className="item-icon">{item.icon}</div>}
                </div>
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-category-badge">{item.category === 'equipment' && '⚔️'}{item.category === 'object' && '📦'}{item.category === 'mask' && '🎭'}{item.category === 'medallion' && '🏅'}{item.category === 'song' && '🎵'}{item.category === 'quest' && '📜'}{item.category === 'remain' && '💀'}</div>
                </div>
                {obtained && <motion.div className="item-check" initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.div>}
                {!autoMode && !obtained && <div className="item-click-hint">✋</div>}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <motion.div className="tracker-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="empty-icon">📦</span>
          <p className="empty-title">Aucun objet trouvé</p>
          {searchTerm && <p className="empty-text">Essayez une autre recherche</p>}
        </motion.div>
      )}

      <div className="tracker-footer">
        <div className="checks-info">
          <div className="checks-item"><span className="checks-icon">✅</span><span className="checks-value">{checksCompleted}</span><span className="checks-label">Vérifications</span></div>
          <div className="checks-item"><span className="checks-icon">💡</span><span className="checks-value">{hintsAvailable}</span><span className="checks-label">Indices</span></div>
          <div className="checks-item"><span className="checks-icon">🎯</span><span className="checks-value">{10 - (checksCompleted % 10)}</span><span className="checks-label">Prochain indice</span></div>
        </div>
        {autoMode && <div className="auto-mode-hint">🤖 Mode automatique - Les objets sont détectés automatiquement</div>}
        {!autoMode && <div className="manual-mode-hint">✋ Mode manuel - Cliquez sur un objet pour le débloquer</div>}
      </div>
    </div>
  );
}