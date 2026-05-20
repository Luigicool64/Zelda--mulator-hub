import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HintsSystem.css';

interface Hint {
  id: string;
  itemName: string;
  location: string;
  used: boolean;
}

export function HintsSystem({ availableHints = 0, onHintUsed }: { availableHints?: number; onHintUsed?: () => void }) {
  const [hints, setHints] = useState<Hint[]>([
    { id: '1', itemName: 'Master Sword', location: 'Temple du Temps - Piédestal', used: false },
    { id: '2', itemName: 'Hookshot', location: 'Temple de la Forêt - Coffre du boss', used: false },
    { id: '3', itemName: 'Arc des Fées', location: 'Forêt Perdue - Coffre caché', used: false },
  ]);
  const [selectedItem, setSelectedItem] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [resultLocation, setResultLocation] = useState('');

  const itemsList = [
    'Master Sword', 'Hookshot', 'Arc des Fées', 'Bombes', 'Boomerang',
    'Bouclier Hylien', 'Tunique Goron', 'Tunique Zora', 'Flèches de Feu',
    'Flèches de Glace', 'Masque Mojo', 'Masque Goron', 'Masque Zora'
  ];

  const itemLocations: Record<string, string> = {
    'Master Sword': 'Temple du Temps - Piédestal (après 3 médaillons)',
    'Hookshot': 'Temple de la Forêt - Coffre du boss',
    'Arc des Fées': 'Forêt Perdue - Coffre derrière le mur',
    'Bombes': 'Caverne Goron - Acheter ou coffre',
    'Boomerang': 'Temple de l\'Eau - Coffre',
    'Bouclier Hylien': 'Magasin du Château - 80 rubis',
    'Tunique Goron': 'Death Mountain - Donné par Darunia',
    'Tunique Zora': 'Domaine Zora - Après la lettre',
    'Flèches de Feu': 'Temple du Feu - Torche',
    'Flèches de Glace': 'Temple de l\'Eau - Glace',
    'Masque Mojo': 'Woodfall - Donné par le Mojo',
    'Masque Goron': 'Montagne de Neige - Donné par le Goron',
    'Masque Zora': 'Mer Zora - Donné par la Zora'
  };

  const useHint = () => {
    if (availableHints <= 0) {
      alert('Vous n\'avez pas assez de hints ! Complétez plus de checks (10 checks = 1 hint)');
      return;
    }
    
    if (!selectedItem) {
      alert('Sélectionnez un item à localiser');
      return;
    }
    
    const location = itemLocations[selectedItem];
    if (location) {
      setResultLocation(location);
      setShowResult(true);
      if (onHintUsed) onHintUsed();
      setTimeout(() => setShowResult(false), 5000);
    }
  };

  return (
    <div className="hints-container">
      <div className="hints-header">
        <h2 className="hints-title">💡 Système de Hints</h2>
        <div className="hints-counter">
          <span className="counter-value">{availableHints}</span>
          <span className="counter-label">hints disponibles</span>
        </div>
      </div>

      <div className="hints-info">
        <div className="info-rule">
          <span className="rule-icon">✅</span>
          <span>1 check = 1 progression</span>
        </div>
        <div className="info-rule">
          <span className="rule-icon">📊</span>
          <span>10 checks = 1 hint</span>
        </div>
        <div className="info-rule">
          <span className="rule-icon">💡</span>
          <span>1 hint = localisation d'item</span>
        </div>
      </div>

      <div className="hints-input">
        <label className="input-label">Item recherché :</label>
        <select 
          className="item-select"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <option value="">-- Sélectionnez un item --</option>
          {itemsList.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        
        <button 
          className="hint-btn"
          onClick={useHint}
          disabled={availableHints === 0}
        >
          🔍 Demander un hint ({availableHints} disponible{availableHints !== 1 ? 's' : ''})
        </button>
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div 
            className="hint-result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="result-icon">📍</div>
            <div className="result-content">
              <div className="result-item">{selectedItem}</div>
              <div className="result-location">{resultLocation}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hints-history">
        <h3 className="history-title">📜 Historique des hints utilisés</h3>
        {hints.filter(h => h.used).length === 0 ? (
          <p className="history-empty">Aucun hint utilisé pour le moment</p>
        ) : (
          <ul className="history-list">
            {hints.filter(h => h.used).map(hint => (
              <li key={hint.id}>
                <span className="history-item">{hint.itemName}</span>
                <span className="history-location">{hint.location}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="hints-tip">
        <span className="tip-icon">💡</span>
        <span className="tip-text">
          Astuce: Utilisez vos hints intelligemment ! Priorisez les items clés comme le Hookshot ou l'Arc qui débloquent de nouvelles zones.
        </span>
      </div>
    </div>
  );
}