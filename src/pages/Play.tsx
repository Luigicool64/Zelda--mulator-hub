// src/pages/Play.tsx
import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ItemTracker } from '../components/tracker/ItemTracker';
import { GameMap } from '../components/map/GameMap';
import { HintsSystem } from '../components/hints/HintsSystem';
import './Play.css';

type TabType = 'map' | 'tracker' | 'hints';

// Déclaration des types pour EmulatorJS (via CDN)
declare global {
  interface Window {
    EJS_player: string;
    EJS_core: string;
    EJS_gameUrl: string;
    EJS_pathtodata: string;
    EJS_startOnLoad: boolean;
    EJS_onGameStart: () => void;
    EJS_onGameLoaded: () => void;
    EJS_startEmulator: () => void;
    EJS_pause: () => void;
    EJS_resume: () => void;
    EJS_reset: () => void;
    EJS_saveState: (slot: number) => void;
    EJS_loadState: (slot: number) => void;
  }
}

interface StoredRom {
  id: string;
  name: string;
  url: string;
  game: 'oot' | 'mm';
  mode: 'vanilla' | 'rando';
}

export function Play() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('tracker');
  const [checks, setChecks] = useState(0);
  const [hints, setHints] = useState(0);
  const [currentRom, setCurrentRom] = useState<StoredRom | null>(null);
  const [isEmulatorReady, setIsEmulatorReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Récupérer la ROM depuis sessionStorage
  useEffect(() => {
    const storedRom = sessionStorage.getItem('current_rom');
    if (storedRom) {
      const rom = JSON.parse(storedRom);
      setCurrentRom(rom);
      sessionStorage.removeItem('current_rom');
    }
  }, []);

  // Charger EmulatorJS via CDN et lancer la ROM
  useEffect(() => {
    if (!currentRom?.url) return;

    const loadEmulator = async () => {
      if (!containerRef.current) return;

      // Vérifier si le script est déjà chargé
      if (!document.querySelector('script[src*="emulatorjs"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
        script.onload = () => initEmulator();
        script.onerror = () => setError('Erreur chargement émulateur');
        document.head.appendChild(script);
      } else {
        initEmulator();
      }
    };

    const initEmulator = () => {
      if (!containerRef.current) return;

      // Nettoyer le conteneur
      containerRef.current.innerHTML = '';
      
      // Créer le div pour l'émulateur
      const playerDiv = document.createElement('div');
      playerDiv.id = 'emulatorjs-player';
      playerDiv.style.width = '100%';
      playerDiv.style.height = '100%';
      containerRef.current.appendChild(playerDiv);

      // Configuration EmulatorJS (version STABLE du CDN)[citation:1][citation:2]
      window.EJS_player = 'emulatorjs-player';
      window.EJS_core = 'n64';  // Nintendo 64[citation:9]
      window.EJS_gameUrl = currentRom.url;
      window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
      window.EJS_startOnLoad = true;
      window.EJS_onGameStart = () => console.log('Démarrage du jeu...');
      window.EJS_onGameLoaded = () => {
        setIsEmulatorReady(true);
        setIsPlaying(true);
      };

      // Lancer l'émulateur
      if (window.EJS_startEmulator) {
        window.EJS_startEmulator();
      }
    };

    loadEmulator();

    // Nettoyage
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [currentRom]);

  const handleCheckComplete = () => {
    const newChecks = checks + 1;
    setChecks(newChecks);
    if (newChecks % 10 === 0) {
      setHints(hints + 1);
    }
  };

  const togglePause = () => {
    if (isPlaying) {
      window.EJS_pause?.();
    } else {
      window.EJS_resume?.();
    }
    setIsPlaying(!isPlaying);
  };

  const resetGame = () => {
    window.EJS_reset?.();
  };

  const tabs = [
    { id: 'map' as TabType, name: 'Carte', icon: '🗺️' },
    { id: 'tracker' as TabType, name: 'Inventaire', icon: '📦' },
    { id: 'hints' as TabType, name: 'Hints', icon: '💡' }
  ];

  return (
    <div className="play-page">
      {/* Header */}
      <div className="play-header">
        <div className="play-title">
          <span className="title-icon">🎮</span>
          <h1>
            Session de jeu
            {currentRom && (
              <span style={{ fontSize: '0.8rem', marginLeft: '0.5rem', color: '#aaa' }}>
                - {currentRom.name}
              </span>
            )}
          </h1>
        </div>
        
        <div className="play-stats">
          <div className="stat-badge">
            <span className="stat-icon">✅</span>
            <span className="stat-value">{checks}</span>
            <span className="stat-label">Checks</span>
          </div>
          <div className="stat-badge">
            <span className="stat-icon">💡</span>
            <span className="stat-value">{hints}</span>
            <span className="stat-label">Hints</span>
          </div>
        </div>

        <div className="header-buttons">
          <button className="mapping-btn" onClick={togglePause}>
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <button className="mapping-btn" onClick={resetGame}>
            🔄 Reset
          </button>
          <Link to="/library" className="library-link">
            📚 Bibliothèque
          </Link>
        </div>
      </div>

      {/* Layout 50/50 */}
      <div className="play-layout">
        {/* Émulateur - côté gauche */}
        <div className="emulator-section">
          <div 
            ref={containerRef} 
            className="emulator-container"
            style={{ 
              width: '100%', 
              height: '100%', 
              background: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {!isEmulatorReady && (
              <div style={{ color: '#c9a03d', textAlign: 'center' }}>
                <div className="loading-spinner"></div>
                <p>Chargement de l'émulateur...</p>
              </div>
            )}
          </div>
        </div>

        {/* Panneaux - côté droit (VOTRE tracker et carte) */}
        <div className="panels-section">
          <div className="tabs-navigation">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-name">{tab.name}</span>
              </button>
            ))}
          </div>

          <div className="panels-content">
            <AnimatePresence mode="wait">
              {activeTab === 'map' && (
                <motion.div
                  key="map"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="panel-container"
                >
                  <GameMap 
                    locations={[]}
                    onCheckToggle={(locationId, checkName) => {
                      console.log('Check:', locationId, checkName);
                      handleCheckComplete();
                    }}
                  />
                </motion.div>
              )}

              {activeTab === 'tracker' && (
                <motion.div
                  key="tracker"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="panel-container"
                >
                  <ItemTracker onItemObtained={handleCheckComplete} />
                </motion.div>
              )}

              {activeTab === 'hints' && (
                <motion.div
                  key="hints"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="panel-container"
                >
                  <HintsSystem 
                    availableHints={hints} 
                    onHintUsed={() => setHints(hints - 1)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Barre de progression */}
          <div className="hint-progress">
            <div className="hint-progress-label">
              <span>Progression vers prochain hint</span>
              <span>{checks % 10}/10 checks</span>
            </div>
            <div className="hint-progress-bar">
              <div 
                className="hint-progress-fill" 
                style={{ width: `${(checks % 10) * 10}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="notification error">
          ❌ {error}
        </div>
      )}
    </div>
  );
}