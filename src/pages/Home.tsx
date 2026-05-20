import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Home.css';

export function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 50));
    return () => window.removeEventListener('scroll', () => setScrolled(window.scrollY > 50));
  }, []);

  // Fonctionnalités principales
  const mainFeatures = [
    { icon: '🎮', title: 'Émulateur N64 Haute Performance', desc: 'Jouez à Ocarina of Time et Majora\'s Mask directement dans votre navigateur avec une qualité d\'émulation optimale. Support des manettes, sauvegardes et états de jeu.', color: '#4caf50' },
    { icon: '🎲', title: 'Mode Randomizer Avancé', desc: 'Générez des seeds uniques avec mélange des objets, des donjons, des boss et des entrées. Chaque partie est une nouvelle aventure !', color: '#ff9800' },
    { icon: '🗡️', title: 'Mode Vanilla Authentique', desc: 'Revivez l\'expérience originale exactement comme à l\'époque. Histoire intacte, objets à leurs emplacements d\'origine.', color: '#2196f3' },
    { icon: '📦', title: 'Tracker Intelligent', desc: 'Suivez automatiquement votre progression. L\'application détecte les items obtenus et met à jour votre inventaire en temps réel.', color: '#9c27b0' },
    { icon: '🗺️', title: 'Carte Interactive', desc: 'Explorez Hyrule et Termina avec une carte dynamique qui révèle les zones accessibles selon vos items. Plus de 50 zones à découvrir !', color: '#00bcd4' },
    { icon: '💡', title: 'Système de Hints', desc: 'Blocage ? Utilisez vos hints gagnés (10 checks = 1 hint) pour localiser n\'importe quel item. Ne cherchez plus au hasard !', color: '#ffc107' },
    { icon: '🏆', title: '500 Succès', desc: 'Débloquez des trophées dans 6 catégories : exploration, combat, collection, progression, randomizer et secrets. Comparez-vous avec la communauté.', color: '#ffd700' },
    { icon: '📊', title: 'Statistiques Détaillées', desc: 'Consultez vos temps de jeu, nombre de checks complétés, hints utilisés, items trouvés et progression globale.', color: '#3f51b5' },
    { icon: '💾', title: 'Sauvegardes Cloud', desc: 'Synchronisez vos parties sur tous vos appareils. Ne perdez jamais votre progression.', color: '#607d8b' },
    { icon: '🎯', title: 'Système de Checks', desc: 'Chaque action majeure (coffre, quête, puzzle) valide un check. Progressez et débloquez des hints.', color: '#8bc34a' },
    { icon: '🔍', title: 'Spoiler Log Intégré', desc: 'Importez votre spoiler log randomizer pour connaître l\'emplacement exact de chaque objet.', color: '#ff5722' },
    { icon: '🎨', title: 'Interface Thème Zelda', desc: 'Design immersif aux couleurs d\'Hyrule et Termina. Animations fluides, effets lumineux et ambiance mystique.', color: '#673ab7' }
  ];

  // Statistiques
  const stats = [
    { value: '2', label: 'Jeux N64', icon: '🎮', detail: 'Ocarina of Time · Majora\'s Mask' },
    { value: '500+', label: 'Succès', icon: '🏆', detail: 'À débloquer' },
    { value: '100+', label: 'Items', icon: '📦', detail: 'À collecter' },
    { value: '50+', label: 'Zones', icon: '🗺️', detail: 'À explorer' },
    { value: '10^6', label: 'Seeds Rando', icon: '🎲', detail: 'Combinaisons possibles' },
    { value: '24/7', label: 'Disponible', icon: '🌐', detail: 'Jouez quand vous voulez' }
  ];

  // Témoignages
  const testimonials = [
    { name: 'LinkMaster88', role: 'Joueur depuis 6 mois', text: 'Le meilleur site pour jouer aux Zelda N64 ! Le tracker est incroyablement précis et les hints m\'ont sauvé plusieurs fois.', rating: 5, avatar: '🗡️' },
    { name: 'ZeldaFan', role: 'Speedrunner', text: 'Le mode randomizer est parfait. La détection automatique des items fonctionne à merveille. Je recommande !', rating: 5, avatar: '🎭' },
    { name: 'HyruleHero', role: 'Collectionneur', text: 'Plus de 500 succès, c\'est énorme ! J\'adore le système de progression, ça motive à tout explorer.', rating: 5, avatar: '🛡️' },
    { name: 'GoronGang', role: 'Joueur casual', text: 'Super site, facile à utiliser. L\'émulateur tourne parfaitement et l\'interface est magnifique.', rating: 5, avatar: '🗿' }
  ];

  // Actualités / Updates
  const updates = [
    { date: '15 Jan 2024', title: 'Ajout du mode Randomizer', desc: 'Support complet du randomizer pour Ocarina of Time et Majora\'s Mask' },
    { date: '10 Jan 2024', title: '+100 nouveaux succès', desc: 'Nouveaux défis à relever dans les catégories exploration et combat' },
    { date: '5 Jan 2024', title: 'Amélioration du tracker', desc: 'Détection automatique améliorée pour tous les items' },
    { date: '1 Jan 2024', title: 'Lancement officiel', desc: 'La plateforme est désormais disponible pour tous' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-particles"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span>✨ The Legend of Zelda ✨</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-icon-left">🗡️</span>
            Zelda N64 Emulator Hub
            <span className="hero-icon-right">🛡️</span>
          </h1>
          <p className="hero-subtitle">
            La plateforme ultime pour les fans de Zelda sur Nintendo 64
          </p>
          <div className="hero-description">
            <p>Émulateur haute performance · Randomizer · Tracker d'items · Carte interactive · 500+ succès</p>
          </div>
          <div className="hero-buttons">
            <Link to="/library" className="btn-primary btn-large">
              🎮 Commencer l'aventure
            </Link>
            <Link to="/guide" className="btn-secondary btn-large">
              📖 Découvrir le guide
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">2</span>
              <span className="hero-stat-label">Jeux</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">500+</span>
              <span className="hero-stat-label">Succès</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">100+</span>
              <span className="hero-stat-label">Items</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">∞</span>
              <span className="hero-stat-label">Seeds</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Découvrir</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Games Preview Section */}
      <section className="games-preview">
        <div className="container">
          <h2 className="section-title">🎮 Les deux chefs-d'œuvre</h2>
          <div className="games-container">
            <div className="game-card-oot">
              <div className="game-card-inner">
                <div className="game-card-front">
                  <div className="game-icon">🗡️</div>
                  <h3>Ocarina of Time</h3>
                  <p>1998 · Console N64</p>
                  <div className="game-stats">
                    <span>🏆 9 Donjons</span>
                    <span>📦 45 Items</span>
                    <span>🎵 12 Chants</span>
                  </div>
                </div>
                <div className="game-card-back">
                  <p>Link voyage entre le passé et le présent pour sauver Hyrule de Ganondorf. Considéré comme le meilleur jeu de tous les temps.</p>
                  <Link to="/library" className="game-link">Jouer →</Link>
                </div>
              </div>
            </div>
            <div className="game-card-mm">
              <div className="game-card-inner">
                <div className="game-card-front">
                  <div className="game-icon">🎭</div>
                  <h3>Majora's Mask</h3>
                  <p>2000 · Console N64</p>
                  <div className="game-stats">
                    <span>🎭 24 Masques</span>
                    <span>📦 35 Items</span>
                    <span>⏱️ 3 Jours</span>
                  </div>
                </div>
                <div className="game-card-back">
                  <p>Link doit sauver Termina en 3 jours avant la chute de la lune. Un système de masques unique et une ambiance sombre.</p>
                  <Link to="/library" className="game-link">Jouer →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">📊 Chiffres clés</h2>
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-detail">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">✨ Toutes les fonctionnalités</h2>
          <p className="section-subtitle">Découvrez ce que notre plateforme vous offre</p>
          <div className="features-grid">
            {mainFeatures.map((feature, i) => (
              <div key={i} className="feature-card" style={{ borderTopColor: feature.color }}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Explanation Section */}
      <section className="system-section">
        <div className="container">
          <h2 className="section-title">⚙️ Comment ça fonctionne ?</h2>
          <div className="system-grid">
            <div className="system-card">
              <div className="system-number">1</div>
              <div className="system-icon">📚</div>
              <h3>Importez votre ROM</h3>
              <p>Dans la bibliothèque, sélectionnez votre jeu et votre mode, puis importez votre fichier ROM.</p>
            </div>
            <div className="system-card">
              <div className="system-number">2</div>
              <div className="system-icon">🎮</div>
              <h3>Jouez</h3>
              <p>Lancez la partie et profitez de l'émulateur intégré avec tous ses contrôles.</p>
            </div>
            <div className="system-card">
              <div className="system-number">3</div>
              <div className="system-icon">✅</div>
              <h3>Accumulez des checks</h3>
              <p>Chaque coffre, quête ou puzzle complété = 1 check = 1 point de progression.</p>
            </div>
            <div className="system-card">
              <div className="system-number">4</div>
              <div className="system-icon">💡</div>
              <h3>Utilisez des hints</h3>
              <p>10 checks = 1 hint pour localiser n'importe quel item.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progression System */}
      <section className="progression-section">
        <div className="container">
          <h2 className="section-title">📈 Système de progression</h2>
          <div className="progression-grid">
            <div className="progression-card">
              <div className="progression-icon">🎯</div>
              <div className="progression-rule">1 action = 1 check</div>
              <p>Coffre important · Quête · Puzzle · Item clé · Événement</p>
            </div>
            <div className="progression-arrow">→</div>
            <div className="progression-card">
              <div className="progression-icon">📊</div>
              <div className="progression-rule">10 checks = 1 hint</div>
              <p>Accumulez des points pour débloquer des indices</p>
            </div>
            <div className="progression-arrow">→</div>
            <div className="progression-card">
              <div className="progression-icon">💡</div>
              <div className="progression-rule">1 hint = localisation</div>
              <p>Découvrez où se trouve l'item recherché</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Preview */}
      <section className="achievements-preview">
        <div className="container">
          <h2 className="section-title">🏆 Succès à débloquer</h2>
          <p className="section-subtitle">Plus de 500 défis vous attendent</p>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-icon">🗡️</div>
              <div className="achievement-info">
                <div className="achievement-name">Premier pas à Hyrule</div>
                <div className="achievement-desc">Entrer dans la map du monde</div>
                <div className="achievement-category">Exploration</div>
              </div>
              <div className="achievement-rarity">95%</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">⚔️</div>
              <div className="achievement-info">
                <div className="achievement-name">Maître du Hookshot</div>
                <div className="achievement-desc">Obtenir le Hookshot</div>
                <div className="achievement-category">Combat</div>
              </div>
              <div className="achievement-rarity">45%</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">🎭</div>
              <div className="achievement-info">
                <div className="achievement-name">Collectionneur de masques</div>
                <div className="achievement-desc">Obtenir tous les masques de Majora's Mask</div>
                <div className="achievement-category">Collection</div>
              </div>
              <div className="achievement-rarity">15%</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">🎲</div>
              <div className="achievement-info">
                <div className="achievement-name">Maître du Rando</div>
                <div className="achievement-desc">Compléter 10 seeds randomizer</div>
                <div className="achievement-category">Randomizer</div>
              </div>
              <div className="achievement-rarity">8%</div>
            </div>
          </div>
          <div className="text-center">
            <Link to="/achievements" className="btn-outline">Voir tous les succès →</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">💬 Ce que dit la communauté</h2>
          <div className="testimonials-slider">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div className="testimonial-content">
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-rating">
                    {'⭐'.repeat(t.rating)}
                  </div>
                  <div className="testimonial-author">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">❓ Questions fréquentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Comment importer une ROM ?</h3>
              <p>Rendez-vous dans la bibliothèque, sélectionnez votre jeu et votre mode, puis glissez-déposez votre fichier ROM.</p>
            </div>
            <div className="faq-item">
              <h3>Quelle est la différence entre Vanilla et Rando ?</h3>
              <p>Vanilla = jeu original sans modification. Rando = tous les objets sont mélangés aléatoirement.</p>
            </div>
            <div className="faq-item">
              <h3>Comment obtenir des hints ?</h3>
              <p>Chaque 10 checks complétés vous donne 1 hint utilisable pour localiser un item.</p>
            </div>
            <div className="faq-item">
              <h3>Puis-je jouer avec une manette ?</h3>
              <p>Oui, l'émulateur supporte les manettes modernes (Xbox, PlayStation, etc.)</p>
            </div>
            <div className="faq-item">
              <h3>Mes sauvegardes sont-elles sauvegardées ?</h3>
              <p>Oui, vos sauvegardes sont stockées dans le cloud et synchronisées sur tous vos appareils.</p>
            </div>
            <div className="faq-item">
              <h3>Comment importer un spoiler log ?</h3>
              <p>Dans la bibliothèque, après avoir sélectionné votre ROM, vous pouvez importer votre fichier de spoiler log.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Updates Section */}
      <section className="updates-section">
        <div className="container">
          <h2 className="section-title">📰 Dernières mises à jour</h2>
          <div className="updates-timeline">
            {updates.map((update, i) => (
              <div key={i} className="update-item">
                <div className="update-date">{update.date}</div>
                <div className="update-content">
                  <h3>{update.title}</h3>
                  <p>{update.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Prêt à commencer l'aventure ?</h2>
          <p>Rejoignez des milliers de joueurs et découvrez une nouvelle façon de jouer à Zelda</p>
          <div className="cta-buttons">
            <Link to="/library" className="btn-primary btn-large">🎮 Commencer maintenant</Link>
            <Link to="/guide" className="btn-secondary btn-large">📖 Lire le guide</Link>
          </div>
          <div className="cta-features">
            <span>✓ Gratuit</span>
            <span>✓ Sans inscription</span>
            <span>✓ Compatible tous navigateurs</span>
          </div>
        </div>
      </section>
    </div>
  );
}