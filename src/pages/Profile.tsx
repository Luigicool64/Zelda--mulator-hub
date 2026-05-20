import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Profile.css';

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: Date;
  lastLogin: Date;
  stats: UserStats;
  settings: UserSettings;
}

interface UserStats {
  totalPlayTime: number;
  totalChecks: number;
  totalHints: number;
  totalItems: number;
  achievementsUnlocked: number;
  romsPlayed: string[];
  seedsPlayed: string[];
}

interface UserSettings {
  theme: 'dark' | 'light';
  language: 'fr' | 'en';
  notifications: boolean;
  autoSave: boolean;
}

interface GameSession {
  id: string;
  game: 'oot' | 'mm';
  mode: 'vanilla' | 'rando';
  seed?: string;
  startTime: Date;
  endTime?: Date;
  checksCompleted: number;
  itemsFound: number;
}

export function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [activeTab, setActiveTab] = useState('stats');

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  // Edit profile
  const [editUsername, setEditUsername] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [editNotifications, setEditNotifications] = useState(true);
  const [editAutoSave, setEditAutoSave] = useState(true);

  const avatars = ['🗡️', '🛡️', '🎭', '🗿', '🐟', '🌿', '⏰', '🌙', '⚔️', '🏹', '💣', '🎵'];

  // Charger les données
  useEffect(() => {
    const savedUser = localStorage.getItem('zelda_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedSessions = localStorage.getItem('zelda_sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  // Connexion
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de connexion
    const newUser: User = {
      id: Date.now().toString(),
      username: loginEmail.split('@')[0],
      email: loginEmail,
      avatar: '🗡️',
      createdAt: new Date(),
      lastLogin: new Date(),
      stats: {
        totalPlayTime: 0,
        totalChecks: 0,
        totalHints: 0,
        totalItems: 0,
        achievementsUnlocked: 0,
        romsPlayed: [],
        seedsPlayed: []
      },
      settings: {
        theme: 'dark',
        language: 'fr',
        notifications: true,
        autoSave: true
      }
    };
    setUser(newUser);
    localStorage.setItem('zelda_user', JSON.stringify(newUser));
    setShowLogin(false);
  };

  // Inscription
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      username: registerUsername,
      email: registerEmail,
      avatar: '🗡️',
      createdAt: new Date(),
      lastLogin: new Date(),
      stats: {
        totalPlayTime: 0,
        totalChecks: 0,
        totalHints: 0,
        totalItems: 0,
        achievementsUnlocked: 0,
        romsPlayed: [],
        seedsPlayed: []
      },
      settings: {
        theme: 'dark',
        language: 'fr',
        notifications: true,
        autoSave: true
      }
    };
    setUser(newUser);
    localStorage.setItem('zelda_user', JSON.stringify(newUser));
    setShowRegister(false);
  };

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem('zelda_user');
    setUser(null);
  };

  // Mettre à jour le profil
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const updatedUser = {
        ...user,
        username: editUsername || user.username,
        avatar: editAvatar || user.avatar,
        settings: {
          ...user.settings,
          notifications: editNotifications,
          autoSave: editAutoSave
        }
      };
      setUser(updatedUser);
      localStorage.setItem('zelda_user', JSON.stringify(updatedUser));
      setShowEditProfile(false);
    }
  };

  // Statistiques calculées
  const totalPlayTime = sessions.reduce((acc, s) => acc + (s.endTime ? 
    (new Date(s.endTime).getTime() - new Date(s.startTime).getTime()) / 3600000 : 0), 0);
  
  const ootSessions = sessions.filter(s => s.game === 'oot').length;
  const mmSessions = sessions.filter(s => s.game === 'mm').length;
  const randoSessions = sessions.filter(s => s.mode === 'rando').length;

  if (!user) {
    return (
      <div className="profile-page">
        <div className="auth-container">
          <div className="auth-header">
            <h1>👤 Zelda N64 Hub</h1>
            <p>Connectez-vous pour sauvegarder votre progression</p>
          </div>
          
          <div className="auth-buttons">
            <button className="auth-btn login" onClick={() => setShowLogin(true)}>
              🔑 Se connecter
            </button>
            <button className="auth-btn register" onClick={() => setShowRegister(true)}>
              📝 Créer un compte
            </button>
          </div>

          <div className="auth-features">
            <div className="feature">
              <span>☁️</span>
              <span>Sauvegarde cloud</span>
            </div>
            <div className="feature">
              <span>🏆</span>
              <span>Succès synchronisés</span>
            </div>
            <div className="feature">
              <span>🔄</span>
              <span>Multi-appareils</span>
            </div>
          </div>
        </div>

        {/* Modal Login */}
        <AnimatePresence>
          {showLogin && (
            <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowLogin(false)}>
              <motion.div className="auth-modal" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setShowLogin(false)}>✕</button>
                <h2>🔑 Connexion</h2>
                <form onSubmit={handleLogin}>
                  <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                  <input type="password" placeholder="Mot de passe" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                  <button type="submit" className="submit-btn">Se connecter</button>
                </form>
                <p className="auth-switch">
                  Pas de compte ? <button onClick={() => { setShowLogin(false); setShowRegister(true); }}>S'inscrire</button>
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Register */}
        <AnimatePresence>
          {showRegister && (
            <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowRegister(false)}>
              <motion.div className="auth-modal" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setShowRegister(false)}>✕</button>
                <h2>📝 Créer un compte</h2>
                <form onSubmit={handleRegister}>
                  <input type="text" placeholder="Nom d'utilisateur" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} required />
                  <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                  <input type="password" placeholder="Mot de passe" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                  <input type="password" placeholder="Confirmer le mot de passe" value={registerConfirmPassword} onChange={(e) => setRegisterConfirmPassword(e.target.value)} required />
                  <button type="submit" className="submit-btn">S'inscrire</button>
                </form>
                <p className="auth-switch">
                  Déjà inscrit ? <button onClick={() => { setShowRegister(false); setShowLogin(true); }}>Se connecter</button>
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="profile-page logged-in">
      {/* En-tête du profil */}
      <div className="profile-header">
        <div className="profile-avatar-section">
          <div className="profile-avatar">{user.avatar}</div>
          <button className="edit-avatar-btn" onClick={() => setShowEditProfile(true)}>✎</button>
        </div>
        <div className="profile-info">
          <h1 className="profile-username">{user.username}</h1>
          <p className="profile-email">{user.email}</p>
          <p className="profile-member">Membre depuis {new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
        </div>
        <div className="profile-actions">
          <button className="settings-btn" onClick={() => setShowEditProfile(true)}>⚙️ Paramètres</button>
          <button className="logout-btn" onClick={handleLogout}>🚪 Déconnexion</button>
        </div>
      </div>

      {/* Statistiques générales */}
      <div className="profile-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{Math.floor(totalPlayTime)}h</div>
          <div className="stat-label">Temps de jeu</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{user.stats.totalChecks}</div>
          <div className="stat-label">Checks</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💡</div>
          <div className="stat-value">{user.stats.totalHints}</div>
          <div className="stat-label">Hints</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-value">{user.stats.achievementsUnlocked}</div>
          <div className="stat-label">Succès</div>
        </div>
      </div>

      {/* Onglets */}
      <div className="profile-tabs">
        <button className={`tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
          📊 Statistiques
        </button>
        <button className={`tab ${activeTab === 'sessions' ? 'active' : ''}`} onClick={() => setActiveTab('sessions')}>
          🎮 Historique
        </button>
        <button className={`tab ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => setActiveTab('achievements')}>
          🏆 Succès
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="profile-content">
        {activeTab === 'stats' && (
          <div className="stats-detailed">
            <div className="stats-group">
              <h3>📈 Progression</h3>
              <div className="progress-item">
                <span>Succès</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(user.stats.achievementsUnlocked / 500) * 100}%` }} />
                </div>
                <span>{user.stats.achievementsUnlocked}/500</span>
              </div>
              <div className="progress-item">
                <span>Items collectés</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(user.stats.totalItems / 150) * 100}%` }} />
                </div>
                <span>{user.stats.totalItems}/150</span>
              </div>
            </div>

            <div className="stats-group">
              <h3>🎮 Jeux</h3>
              <div className="game-stats">
                <div className="game-stat">
                  <span>🗡️ Ocarina of Time</span>
                  <span>{ootSessions} parties</span>
                </div>
                <div className="game-stat">
                  <span>🎭 Majora's Mask</span>
                  <span>{mmSessions} parties</span>
                </div>
                <div className="game-stat">
                  <span>🎲 Mode Randomizer</span>
                  <span>{randoSessions} parties</span>
                </div>
                <div className="game-stat">
                  <span>🗡️ Mode Vanilla</span>
                  <span>{sessions.length - randoSessions} parties</span>
                </div>
              </div>
            </div>

            <div className="stats-group">
              <h3>🏆 Meilleures performances</h3>
              <div className="best-stats">
                <div className="best-item">
                  <span>🏆 Plus de checks</span>
                  <span>{Math.max(...sessions.map(s => s.checksCompleted), 0)} checks</span>
                </div>
                <div className="best-item">
                  <span>⚡ Seed le plus joué</span>
                  <span>{user.stats.seedsPlayed[0] || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="sessions-list">
            {sessions.length === 0 ? (
              <div className="empty-sessions">
                <span>🎮</span>
                <p>Aucune partie enregistrée</p>
                <p>Jouez pour voir votre historique !</p>
              </div>
            ) : (
              sessions.map(session => (
                <div key={session.id} className="session-card">
                  <div className="session-header">
                    <span className="session-game">
                      {session.game === 'oot' ? '🗡️' : '🎭'} {session.game === 'oot' ? 'Ocarina of Time' : 'Majora\'s Mask'}
                    </span>
                    <span className={`session-mode ${session.mode}`}>
                      {session.mode === 'vanilla' ? '🗡️ Vanilla' : '🎲 Randomizer'}
                    </span>
                  </div>
                  <div className="session-details">
                    <span>📅 {new Date(session.startTime).toLocaleDateString('fr-FR')}</span>
                    <span>✅ {session.checksCompleted} checks</span>
                    <span>📦 {session.itemsFound} items</span>
                    {session.seed && <span>🎲 Seed: {session.seed}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-preview">
            <div className="recent-achievements">
              <h3>🏆 Succès récents</h3>
              <div className="empty-achievements">
                <span>🏆</span>
                <p>Jouez pour débloquer des succès !</p>
              </div>
            </div>
            <button className="view-all-btn" onClick={() => window.location.href = '/achievements'}>
              Voir tous les succès →
            </button>
          </div>
        )}
      </div>

      {/* Modal d'édition du profil */}
      <AnimatePresence>
        {showEditProfile && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowEditProfile(false)}>
            <motion.div className="edit-modal" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowEditProfile(false)}>✕</button>
              <h2>⚙️ Paramètres du profil</h2>
              <form onSubmit={handleUpdateProfile}>
                <div className="form-group">
                  <label>Pseudo</label>
                  <input type="text" defaultValue={user.username} onChange={(e) => setEditUsername(e.target.value)} />
                </div>
                
                <div className="form-group">
                  <label>Avatar</label>
                  <div className="avatar-selection">
                    {avatars.map(avatar => (
                      <button
                        key={avatar}
                        type="button"
                        className={`avatar-option ${editAvatar === avatar ? 'selected' : ''}`}
                        onClick={() => setEditAvatar(avatar)}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <input type="checkbox" defaultChecked={user.settings.notifications} onChange={(e) => setEditNotifications(e.target.checked)} />
                    Activer les notifications
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <input type="checkbox" defaultChecked={user.settings.autoSave} onChange={(e) => setEditAutoSave(e.target.checked)} />
                    Sauvegarde automatique
                  </label>
                </div>

                <button type="submit" className="save-btn">💾 Sauvegarder</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}