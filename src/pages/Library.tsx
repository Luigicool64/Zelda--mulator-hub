import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Library.css';

// Interface pour les métadonnées d'une ROM
interface Rom {
  id: string;
  name: string;
  game: 'oot' | 'mm';
  mode: 'vanilla' | 'rando';
  seed?: string;
  size: number;
  lastPlayed?: Date;
  isFavorite: boolean;
  hasSpoilerLog: boolean;
}

// Interface pour le spoiler log
interface SpoilerLog {
  id: string;
  romId: string;
  seed: string;
  items: Record<string, string>;
  locations: Record<string, string>;
  checks: string[];
  importedAt: string;
}

// Service de stockage IndexedDB
class StorageService {
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'ZeldaRandomizerDB';
  private readonly DB_VERSION = 2;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Store pour les ROMs (fichiers binaires)
        if (!db.objectStoreNames.contains('roms')) {
          const romStore = db.createObjectStore('roms', { keyPath: 'id' });
          romStore.createIndex('game', 'game', { unique: false });
          romStore.createIndex('mode', 'mode', { unique: false });
        }
        
        // Store pour les métadonnées des ROMs
        if (!db.objectStoreNames.contains('romMetadata')) {
          const metaStore = db.createObjectStore('romMetadata', { keyPath: 'id' });
          metaStore.createIndex('name', 'name', { unique: false });
          metaStore.createIndex('game', 'game', { unique: false });
          metaStore.createIndex('mode', 'mode', { unique: false });
          metaStore.createIndex('isFavorite', 'isFavorite', { unique: false });
          metaStore.createIndex('lastPlayed', 'lastPlayed', { unique: false });
        }
        
        // Store pour les spoiler logs
        if (!db.objectStoreNames.contains('spoilerLogs')) {
          const spoilerStore = db.createObjectStore('spoilerLogs', { keyPath: 'romId' });
          spoilerStore.createIndex('seed', 'seed', { unique: false });
          spoilerStore.createIndex('importedAt', 'importedAt', { unique: false });
        }
      };
    });
  }

  async saveRom(rom: { id: string; name: string; game: 'oot' | 'mm'; mode: 'vanilla' | 'rando'; file: File; size: number; lastPlayed?: Date; isFavorite: boolean }): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['roms', 'romMetadata'], 'readwrite');
      
      // Sauvegarder le fichier ROM
      const romStore = transaction.objectStore('roms');
      romStore.put({
        id: rom.id,
        data: rom.file,
        size: rom.size,
        type: rom.file.type,
        name: rom.name
      });
      
      // Sauvegarder les métadonnées
      const metaStore = transaction.objectStore('romMetadata');
      metaStore.put({
        id: rom.id,
        name: rom.name,
        game: rom.game,
        mode: rom.mode,
        size: rom.size,
        lastPlayed: rom.lastPlayed?.toISOString(),
        isFavorite: rom.isFavorite,
        hasSpoilerLog: false
      });
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getRom(id: string): Promise<{ metadata: any; file: File } | null> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['roms', 'romMetadata'], 'readonly');
      
      const romRequest = transaction.objectStore('roms').get(id);
      const metaRequest = transaction.objectStore('romMetadata').get(id);
      
      let romResult: any = null;
      let metaResult: any = null;
      
      romRequest.onsuccess = () => { romResult = romRequest.result; checkComplete(); };
      metaRequest.onsuccess = () => { metaResult = metaRequest.result; checkComplete(); };
      
      const checkComplete = () => {
        if (romResult !== null && metaResult !== null) {
          if (romResult && metaResult) {
            const file = new File([romResult.data], metaResult.name, { type: romResult.type || 'application/octet-stream' });
            resolve({ metadata: metaResult, file });
          } else {
            resolve(null);
          }
        }
      };
      
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getAllRomMetadata(): Promise<any[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('romMetadata', 'readonly');
      const store = transaction.objectStore('romMetadata');
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteRom(id: string): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['roms', 'romMetadata', 'spoilerLogs'], 'readwrite');
      
      transaction.objectStore('roms').delete(id);
      transaction.objectStore('romMetadata').delete(id);
      transaction.objectStore('spoilerLogs').delete(id);
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async saveSpoilerLog(romId: string, spoilerLog: Omit<SpoilerLog, 'romId' | 'importedAt'>): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['spoilerLogs', 'romMetadata'], 'readwrite');
      
      // Sauvegarder le spoiler log
      const spoilerStore = transaction.objectStore('spoilerLogs');
      spoilerStore.put({
        romId: romId,
        ...spoilerLog,
        importedAt: new Date().toISOString()
      });
      
      // Mettre à jour les métadonnées
      const metaStore = transaction.objectStore('romMetadata');
      const getRequest = metaStore.get(romId);
      getRequest.onsuccess = () => {
        const metadata = getRequest.result;
        if (metadata) {
          metadata.hasSpoilerLog = true;
          metaStore.put(metadata);
        }
      };
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getSpoilerLog(romId: string): Promise<SpoilerLog | null> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('spoilerLogs', 'readonly');
      const store = transaction.objectStore('spoilerLogs');
      const request = store.get(romId);
      
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteSpoilerLog(romId: string): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['spoilerLogs', 'romMetadata'], 'readwrite');
      
      transaction.objectStore('spoilerLogs').delete(romId);
      
      const metaStore = transaction.objectStore('romMetadata');
      const getRequest = metaStore.get(romId);
      getRequest.onsuccess = () => {
        const metadata = getRequest.result;
        if (metadata) {
          metadata.hasSpoilerLog = false;
          metaStore.put(metadata);
        }
      };
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async toggleFavorite(id: string, isFavorite: boolean): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('romMetadata', 'readwrite');
      const store = transaction.objectStore('romMetadata');
      const request = store.get(id);
      
      request.onsuccess = () => {
        const metadata = request.result;
        if (metadata) {
          metadata.isFavorite = isFavorite;
          store.put(metadata);
        }
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async updateLastPlayed(id: string): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('romMetadata', 'readwrite');
      const store = transaction.objectStore('romMetadata');
      const request = store.get(id);
      
      request.onsuccess = () => {
        const metadata = request.result;
        if (metadata) {
          metadata.lastPlayed = new Date().toISOString();
          store.put(metadata);
        }
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }
}

const storageService = new StorageService();

export function Library() {
  const navigate = useNavigate();
  const [roms, setRoms] = useState<Rom[]>([]);
  const [selectedGame, setSelectedGame] = useState<'oot' | 'mm' | null>(null);
  const [selectedMode, setSelectedMode] = useState<'vanilla' | 'rando' | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGame, setFilterGame] = useState<'all' | 'oot' | 'mm'>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'vanilla' | 'rando'>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [selectedSpoilerRom, setSelectedSpoilerRom] = useState<Rom | null>(null);
  const [showSpoilerModal, setShowSpoilerModal] = useState(false);
  const [spoilerLogContent, setSpoilerLogContent] = useState<SpoilerLog | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const spoilerInputRef = useRef<HTMLInputElement>(null);

  // Initialiser le stockage et charger les ROMs
  useEffect(() => {
    const init = async () => {
      await storageService.init();
      await loadRoms();
    };
    init();
  }, []);

  const loadRoms = async () => {
    const metadata = await storageService.getAllRomMetadata();
    const romsWithDates = metadata.map((rom: any) => ({
      ...rom,
      lastPlayed: rom.lastPlayed ? new Date(rom.lastPlayed) : undefined
    }));
    setRoms(romsWithDates);
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Importer une ROM
  const importRom = async (file: File) => {
    if (!selectedGame || !selectedMode) {
      showNotification('Veuillez sélectionner le jeu et le mode', 'error');
      return;
    }

    setIsImporting(true);
    setImportProgress(0);

    try {
      // Simuler progression
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setImportProgress(i);
      }

      const rom = {
        id: Date.now().toString(),
        name: file.name,
        game: selectedGame,
        mode: selectedMode,
        file: file,
        size: file.size,
        lastPlayed: new Date(),
        isFavorite: false
      };

      await storageService.saveRom(rom);
      await loadRoms();
      showNotification(`ROM "${file.name}" importée avec succès !`, 'success');
      setShowImport(false);
      setSelectedGame(null);
      setSelectedMode(null);
    } catch (error) {
      console.error(error);
      showNotification('Erreur lors de l\'importation', 'error');
    } finally {
      setIsImporting(false);
    }
  };

  // Importer un spoiler log
  const importSpoilerLog = async (rom: Rom, file: File) => {
    try {
      const content = await file.text();
      let spoilerData: any = {
        id: Date.now().toString(),
        seed: file.name.replace(/\.(json|txt)$/, ''),
        items: {},
        locations: {},
        checks: []
      };
      
      if (file.name.endsWith('.json')) {
        const parsed = JSON.parse(content);
        spoilerData.items = parsed.items || parsed.locations || parsed;
        spoilerData.locations = parsed.locations || parsed.items || {};
        spoilerData.checks = parsed.checks || Object.keys(spoilerData.items);
        spoilerData.seed = parsed.seed || spoilerData.seed;
      } else {
        const lines = content.split('\n');
        lines.forEach(line => {
          line = line.trim();
          if (!line) return;
          
          if (line.includes('->')) {
            const [item, location] = line.split('->').map(s => s.trim());
            if (item && location) {
              spoilerData.items[item] = location;
              spoilerData.locations[location] = item;
              spoilerData.checks.push(location);
            }
          } else if (line.includes(':')) {
            const [item, location] = line.split(':').map(s => s.trim());
            if (item && location) {
              spoilerData.items[item] = location;
              spoilerData.locations[location] = item;
              spoilerData.checks.push(location);
            }
          }
        });
      }

      await storageService.saveSpoilerLog(rom.id, spoilerData);
      await loadRoms();
      showNotification(`${Object.keys(spoilerData.items).length} entrées importées`, 'success');
    } catch (error) {
      console.error(error);
      showNotification('Erreur lors de l\'import du spoiler log', 'error');
    }
  };

  // Voir le spoiler log
  const viewSpoilerLog = async (rom: Rom) => {
    const spoilerLog = await storageService.getSpoilerLog(rom.id);
    if (spoilerLog) {
      setSpoilerLogContent(spoilerLog);
      setSelectedSpoilerRom(rom);
      setShowSpoilerModal(true);
    }
  };

  // Supprimer un spoiler log
  const deleteSpoilerLog = async (romId: string) => {
    if (confirm('Supprimer le spoiler log ?')) {
      await storageService.deleteSpoilerLog(romId);
      await loadRoms();
      showNotification('Spoiler log supprimé', 'success');
    }
  };

  // Supprimer une ROM
  const deleteRom = async (id: string) => {
    if (confirm('Supprimer cette ROM ? Action irréversible.')) {
      await storageService.deleteRom(id);
      await loadRoms();
      showNotification('ROM supprimée', 'success');
    }
  };

  const toggleFavorite = async (id: string, isFavorite: boolean) => {
    await storageService.toggleFavorite(id, !isFavorite);
    await loadRoms();
  };

  // Jouer une ROM
  const playRom = async (rom: Rom) => {
    const romData = await storageService.getRom(rom.id);
    if (romData) {
      // Mettre à jour la date de dernière lecture
      await storageService.updateLastPlayed(rom.id);
      
      // Créer une URL temporaire pour la ROM
      const romUrl = URL.createObjectURL(romData.file);
      
      // Stocker dans sessionStorage
      sessionStorage.setItem('current_rom', JSON.stringify({
        id: rom.id,
        name: rom.name,
        url: romUrl,
        game: rom.game,
        mode: rom.mode
      }));
      
      navigate(`/play?game=${rom.game}&mode=${rom.mode}&romId=${rom.id}`);
    }
  };

  const filteredRoms = roms.filter(rom => {
    const matchesSearch = rom.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = filterGame === 'all' || rom.game === filterGame;
    const matchesMode = filterMode === 'all' || rom.mode === filterMode;
    const matchesFavorite = !showFavoritesOnly || rom.isFavorite;
    return matchesSearch && matchesGame && matchesMode && matchesFavorite;
  });

  const games = [
    { id: 'oot', name: 'Ocarina of Time', icon: '🗡️', color: '#4caf50' },
    { id: 'mm', name: 'Majora\'s Mask', icon: '🎭', color: '#9c27b0' }
  ];

  const modes = [
    { id: 'vanilla', name: 'Vanilla', icon: '🗡️', color: '#2196f3' },
    { id: 'rando', name: 'Randomizer', icon: '🎲', color: '#ff9800' }
  ];

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Jamais';
    return new Date(date).toLocaleDateString('fr-FR');
  };

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return 'Jamais';
    return new Date(dateStr).toLocaleString('fr-FR');
  };

  return (
    <div className="library-page">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`notification ${notification.type}`}
          >
            {notification.type === 'success' ? '✅' : '❌'} {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="library-header">
        <h1 className="library-title">📚 Bibliothèque</h1>
        <p className="library-subtitle">Gérez vos ROMs et spoiler logs</p>
      </div>

      <div className="library-actions">
        <button className="import-main-btn" onClick={() => setShowImport(true)}>
          📀 + Importer une ROM
        </button>
      </div>

      <div className="library-filters">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher une ROM..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select value={filterGame} onChange={(e) => setFilterGame(e.target.value as any)}>
            <option value="all">Tous les jeux</option>
            <option value="oot">🗡️ Ocarina of Time</option>
            <option value="mm">🎭 Majora's Mask</option>
          </select>
          
          <select value={filterMode} onChange={(e) => setFilterMode(e.target.value as any)}>
            <option value="all">Tous les modes</option>
            <option value="vanilla">Vanilla</option>
            <option value="rando">Randomizer</option>
          </select>
          
          <button
            className={`favorite-filter ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            ⭐ Favoris
          </button>
        </div>
      </div>

      <div className="library-stats">
        <div className="stat-card">
          <span className="stat-value">{roms.length}</span>
          <span className="stat-label">ROMs</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{roms.filter(r => r.isFavorite).length}</span>
          <span className="stat-label">Favoris</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{roms.filter(r => r.hasSpoilerLog).length}</span>
          <span className="stat-label">Spoiler logs</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{roms.filter(r => r.game === 'oot').length}</span>
          <span className="stat-label">OOT</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{roms.filter(r => r.game === 'mm').length}</span>
          <span className="stat-label">MM</span>
        </div>
      </div>

      {filteredRoms.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📀</div>
          <h3>Aucune ROM trouvée</h3>
          <p>Importez votre première ROM pour commencer</p>
          <button className="empty-import-btn" onClick={() => setShowImport(true)}>
            📀 Importer une ROM
          </button>
        </div>
      ) : (
        <div className="roms-grid">
          <AnimatePresence>
            {filteredRoms.map(rom => (
              <motion.div
                key={rom.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="rom-card"
              >
                <div className="rom-card-header">
                  <div 
                    className="rom-game-icon" 
                    style={{ background: games.find(g => g.id === rom.game)?.color }}
                  >
                    {rom.game === 'oot' ? '🗡️' : '🎭'}
                  </div>
                  <button
                    className={`rom-favorite ${rom.isFavorite ? 'active' : ''}`}
                    onClick={() => toggleFavorite(rom.id, rom.isFavorite)}
                  >
                    {rom.isFavorite ? '⭐' : '☆'}
                  </button>
                </div>
                
                <div className="rom-card-body">
                  <h3 className="rom-name">{rom.name}</h3>
                  <div className="rom-badges">
                    <span className="rom-badge game">{games.find(g => g.id === rom.game)?.name}</span>
                    <span className={`rom-badge mode ${rom.mode}`}>
                      {modes.find(m => m.id === rom.mode)?.icon} {modes.find(m => m.id === rom.mode)?.name}
                    </span>
                  </div>
                  <div className="rom-details">
                    <span>📦 {formatFileSize(rom.size)}</span>
                    <span>📅 {formatDate(rom.lastPlayed)}</span>
                  </div>
                  {rom.hasSpoilerLog && (
                    <div 
                      className="spoiler-log-badge" 
                      onClick={() => viewSpoilerLog(rom)}
                    >
                      📋 Spoiler log présent
                    </div>
                  )}
                </div>
                
                <div className="rom-card-footer">
                  <button className="rom-btn play" onClick={() => playRom(rom)}>
                    🎮 Jouer
                  </button>
                  <button 
                    className="rom-btn spoiler" 
                    onClick={() => {
                      setSelectedSpoilerRom(rom);
                      spoilerInputRef.current?.click();
                    }}
                  >
                    {rom.hasSpoilerLog ? '📋 + Ajouter' : '📋 Importer spoiler'}
                  </button>
                  {rom.hasSpoilerLog && (
                    <>
                      <button className="rom-btn spoiler" onClick={() => viewSpoilerLog(rom)}>
                        📖 Voir
                      </button>
                      <button className="rom-btn spoiler-delete" onClick={() => deleteSpoilerLog(rom.id)}>
                        🗑️ Spoiler
                      </button>
                    </>
                  )}
                  <button className="rom-btn delete" onClick={() => deleteRom(rom.id)}>
                    🗑️ ROM
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Input caché pour l'import spoiler log */}
      <input
        ref={spoilerInputRef}
        type="file"
        accept=".json,.txt"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && selectedSpoilerRom) {
            importSpoilerLog(selectedSpoilerRom, file);
          }
          if (spoilerInputRef.current) {
            spoilerInputRef.current.value = '';
          }
        }}
      />

      {/* Modal spoiler log */}
      <AnimatePresence>
        {showSpoilerModal && spoilerLogContent && selectedSpoilerRom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowSpoilerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="spoiler-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>📋 Spoiler Log - {selectedSpoilerRom.name}</h2>
                <button className="modal-close" onClick={() => setShowSpoilerModal(false)}>✕</button>
              </div>
              <div className="modal-body">
                <div className="spoiler-info">
                  <p><strong>Seed:</strong> {spoilerLogContent.seed}</p>
                  <p><strong>Importé le:</strong> {formatDateTime(spoilerLogContent.importedAt)}</p>
                  <p><strong>Total entrées:</strong> {Object.keys(spoilerLogContent.items).length}</p>
                </div>
                <div className="spoiler-items">
                  <h3>Liste des items → locations</h3>
                  <div className="spoiler-list">
                    {Object.entries(spoilerLogContent.items).map(([item, location]) => (
                      <div key={item} className="spoiler-item">
                        <span className="spoiler-item-name">{item}</span>
                        <span className="spoiler-arrow">→</span>
                        <span className="spoiler-location">{location as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="close-btn" onClick={() => setShowSpoilerModal(false)}>
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal import ROM */}
      <AnimatePresence>
        {showImport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => !isImporting && setShowImport(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="import-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>📀 Importer une ROM</h2>
                <button className="modal-close" onClick={() => setShowImport(false)}>✕</button>
              </div>
              
              <div className="modal-body">
                {!isImporting ? (
                  <>
                    <div className="selection-step">
                      <h3>1. Choisissez votre jeu</h3>
                      <div className="game-selection">
                        {games.map(game => (
                          <button
                            key={game.id}
                            className={`game-select ${selectedGame === game.id ? 'selected' : ''}`}
                            style={{ '--game-color': game.color } as React.CSSProperties}
                            onClick={() => setSelectedGame(game.id as 'oot' | 'mm')}
                          >
                            {game.icon} {game.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="selection-step">
                      <h3>2. Choisissez votre mode</h3>
                      <div className="mode-selection">
                        {modes.map(mode => (
                          <button
                            key={mode.id}
                            className={`mode-select ${selectedMode === mode.id ? 'selected' : ''}`}
                            style={{ '--mode-color': mode.color } as React.CSSProperties}
                            onClick={() => setSelectedMode(mode.id as 'vanilla' | 'rando')}
                            disabled={!selectedGame}
                          >
                            {mode.icon} {mode.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="selection-step">
                      <h3>3. Importez votre ROM</h3>
                      <div
                        className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOver(false);
                          const file = e.dataTransfer.files[0];
                          if (file && selectedGame && selectedMode) {
                            importRom(file);
                          }
                        }}
                      >
                        <div className="drop-icon">📀</div>
                        <p>Glissez-déposez votre ROM ici</p>
                        <p className="drop-or">ou</p>
                        <button
                          className="browse-btn"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={!selectedGame || !selectedMode}
                        >
                          Parcourir
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".z64,.n64,.v64"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && selectedGame && selectedMode) {
                              importRom(file);
                            }
                          }}
                        />
                        <p className="drop-hint">Formats acceptés: .z64, .n64, .v64</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="import-progress">
                    <div className="progress-spinner"></div>
                    <p>Importation en cours...</p>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${importProgress}%` }} />
                    </div>
                    <p className="progress-text">{importProgress}%</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}